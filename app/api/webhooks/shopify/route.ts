import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Types pour les événements Shopify
interface ShopifyOrder {
  id: number
  name: string
  email: string
  total_price: string
  currency: string
  created_at: string
  cancel_reason?: string
  line_items: Array<{
    product_id: number
    variant_id: number
    title: string
    quantity: number
    price: string
  }>
}

interface ShopifyProduct {
  id: number
  title: string
  handle: string
  status: string
  created_at: string
  updated_at: string
}

// Vérification de la signature Shopify
function verifyShopifyWebhook(body: string, signature: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!secret) {
    console.error("SHOPIFY_WEBHOOK_SECRET non configuré")
    return false
  }

  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(body, "utf8")
  const calculatedSignature = hmac.digest("base64")

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(calculatedSignature))
}

// Gestionnaire principal des webhooks
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-shopify-hmac-sha256")
    const topic = request.headers.get("x-shopify-topic")
    const shop = request.headers.get("x-shopify-shop-domain")

    console.log(`📦 Webhook reçu: ${topic} de ${shop}`)

    // Vérifier la signature
    if (!signature || !verifyShopifyWebhook(body, signature)) {
      console.error("❌ Signature webhook invalide")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Récupérer l'utilisateur depuis le shop domain
    const userId = await getUserIdFromShop(shop || "")
    if (!userId) {
      console.error(`❌ Utilisateur non trouvé pour le shop: ${shop}`)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const payload = JSON.parse(body)

    // Router selon le type d'événement
    switch (topic) {
      case "orders/create":
        await handleOrderCreated(payload as ShopifyOrder, userId)
        break

      case "orders/paid":
        await handleOrderPaid(payload as ShopifyOrder, userId)
        break

      case "orders/cancelled":
        await handleOrderCancelled(payload as ShopifyOrder, userId)
        break

      case "products/create":
        await handleProductCreated(payload as ShopifyProduct, userId)
        break

      case "products/update":
        await handleProductUpdated(payload as ShopifyProduct, userId)
        break

      default:
        console.log(`⚠️ Événement non géré: ${topic}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Erreur webhook:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Gestion des nouvelles commandes
async function handleOrderCreated(order: ShopifyOrder, userId: string) {
  console.log(`🛒 Nouvelle commande: ${order.name} (${order.total_price}€)`)

  const orderData = {
    shopifyOrderId: order.id,
    orderNumber: order.name,
    customerEmail: order.email,
    totalPrice: Number.parseFloat(order.total_price),
    currency: order.currency,
    status: "created",
    userId: userId,
    createdAt: new Date(order.created_at),
    lineItems: order.line_items.map((item) => ({
      productId: item.product_id,
      variantId: item.variant_id,
      title: item.title,
      quantity: item.quantity,
      price: Number.parseFloat(item.price),
    })),
  }

  // Enregistrer en base de données (simulation)
  console.log("💾 Commande enregistrée:", orderData)

  // Envoyer notification
  await sendNotification(userId, {
    type: "sale",
    title: "Nouvelle commande !",
    message: `Commande ${order.name} pour ${order.total_price}€`,
    data: orderData,
  })
}

// Gestion des commandes payées
async function handleOrderPaid(order: ShopifyOrder, userId: string) {
  console.log(`💰 Commande payée: ${order.name} (${order.total_price}€)`)

  const totalAmount = Number.parseFloat(order.total_price)
  const commissionRate = 0.05 // 5%
  const commission = totalAmount * commissionRate

  const paymentData = {
    shopifyOrderId: order.id,
    orderNumber: order.name,
    totalAmount: totalAmount,
    commission: commission,
    netAmount: totalAmount - commission,
    userId: userId,
    paidAt: new Date(),
  }

  console.log(`💸 Commission: ${commission.toFixed(2)}€ (5% de ${totalAmount}€)`)

  // Enregistrer le paiement
  console.log("💾 Paiement enregistré:", paymentData)

  // Mettre à jour les stats utilisateur
  await updateUserStats(userId, {
    totalRevenue: totalAmount,
    totalCommission: commission,
    orderCount: 1,
  })

  // Notification de vente confirmée
  await sendNotification(userId, {
    type: "sale",
    title: "Vente confirmée !",
    message: `Paiement reçu pour ${order.name} - ${totalAmount}€`,
    data: paymentData,
  })
}

// Gestion des commandes annulées
async function handleOrderCancelled(order: ShopifyOrder, userId: string) {
  console.log(`❌ Commande annulée: ${order.name}`)

  const cancellationData = {
    shopifyOrderId: order.id,
    orderNumber: order.name,
    reason: order.cancel_reason,
    cancelledAt: new Date(),
    userId: userId,
  }

  console.log("💾 Annulation enregistrée:", cancellationData)

  await sendNotification(userId, {
    type: "alert",
    title: "Commande annulée",
    message: `La commande ${order.name} a été annulée`,
    data: cancellationData,
  })
}

// Gestion des nouveaux produits
async function handleProductCreated(product: ShopifyProduct, userId: string) {
  console.log(`📦 Nouveau produit: ${product.title}`)

  const productData = {
    shopifyProductId: product.id,
    title: product.title,
    handle: product.handle,
    status: product.status,
    userId: userId,
    createdAt: new Date(product.created_at),
  }

  console.log("💾 Produit enregistré:", productData)
}

// Gestion des mises à jour de produits
async function handleProductUpdated(product: ShopifyProduct, userId: string) {
  console.log(`📝 Produit mis à jour: ${product.title}`)

  const updateData = {
    shopifyProductId: product.id,
    title: product.title,
    status: product.status,
    updatedAt: new Date(product.updated_at),
    userId: userId,
  }

  console.log("💾 Mise à jour produit:", updateData)
}

// Fonctions utilitaires
async function getUserIdFromShop(shopDomain: string): Promise<string | null> {
  // Simulation - en réalité, requête base de données
  const shopToUserMap: Record<string, string> = {
    "marie-fashion.myshopify.com": "user_123",
    "sophie-style.myshopify.com": "user_456",
    "lucas-streetwear.myshopify.com": "user_789",
  }

  return shopToUserMap[shopDomain] || null
}

async function sendNotification(userId: string, notification: any) {
  console.log(`🔔 Notification envoyée à ${userId}:`, notification.title)
  // Ici on enverrait la notification via WebSocket, email, etc.
}

async function updateUserStats(userId: string, stats: any) {
  console.log(`📊 Stats mises à jour pour ${userId}:`, stats)
  // Ici on mettrait à jour les statistiques en base de données
}
