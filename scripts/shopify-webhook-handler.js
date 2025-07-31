// Gestionnaire de webhooks Shopify pour Instagram2Shop
import crypto from "crypto"

// Configuration des webhooks Shopify
const WEBHOOK_EVENTS = {
  ORDER_CREATED: "orders/create",
  ORDER_PAID: "orders/paid",
  ORDER_CANCELLED: "orders/cancelled",
  PRODUCT_CREATED: "products/create",
  PRODUCT_UPDATED: "products/update",
}

// Vérification de la signature Shopify
function verifyShopifyWebhook(data, signature, secret) {
  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(data, "utf8")
  const calculatedSignature = hmac.digest("base64")

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(calculatedSignature))
}

// Gestionnaire principal des webhooks
export async function handleShopifyWebhook(event, payload, userId) {
  console.log(`📦 Webhook Shopify reçu: ${event} pour utilisateur ${userId}`)

  try {
    switch (event) {
      case WEBHOOK_EVENTS.ORDER_CREATED:
        await handleOrderCreated(payload, userId)
        break

      case WEBHOOK_EVENTS.ORDER_PAID:
        await handleOrderPaid(payload, userId)
        break

      case WEBHOOK_EVENTS.ORDER_CANCELLED:
        await handleOrderCancelled(payload, userId)
        break

      case WEBHOOK_EVENTS.PRODUCT_CREATED:
        await handleProductCreated(payload, userId)
        break

      case WEBHOOK_EVENTS.PRODUCT_UPDATED:
        await handleProductUpdated(payload, userId)
        break

      default:
        console.log(`⚠️ Événement non géré: ${event}`)
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement du webhook ${event}:`, error)
    throw error
  }
}

// Gestion des nouvelles commandes
async function handleOrderCreated(order, userId) {
  console.log(`🛒 Nouvelle commande créée: ${order.name} (${order.total_price}€)`)

  // Enregistrer la commande dans la base de données
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

  // Simulation d'enregistrement en base
  console.log("💾 Commande enregistrée:", orderData)

  // Envoyer une notification à l'utilisateur
  await sendNotification(userId, {
    type: "sale",
    title: "Nouvelle commande !",
    message: `Commande ${order.name} pour ${order.total_price}€`,
    data: orderData,
  })

  return orderData
}

// Gestion des commandes payées
async function handleOrderPaid(order, userId) {
  console.log(`💰 Commande payée: ${order.name} (${order.total_price}€)`)

  // Calculer la commission Instagram2Shop
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

  console.log(`💸 Commission calculée: ${commission.toFixed(2)}€ (5% de ${totalAmount}€)`)

  // Enregistrer le paiement et la commission
  console.log("💾 Paiement enregistré:", paymentData)

  // Mettre à jour les statistiques utilisateur
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

  return paymentData
}

// Gestion des commandes annulées
async function handleOrderCancelled(order, userId) {
  console.log(`❌ Commande annulée: ${order.name}`)

  // Mettre à jour le statut de la commande
  const cancellationData = {
    shopifyOrderId: order.id,
    orderNumber: order.name,
    reason: order.cancel_reason,
    cancelledAt: new Date(),
    userId: userId,
  }

  console.log("💾 Annulation enregistrée:", cancellationData)

  // Notification d'annulation
  await sendNotification(userId, {
    type: "alert",
    title: "Commande annulée",
    message: `La commande ${order.name} a été annulée`,
    data: cancellationData,
  })

  return cancellationData
}

// Gestion des nouveaux produits
async function handleProductCreated(product, userId) {
  console.log(`📦 Nouveau produit créé: ${product.title}`)

  const productData = {
    shopifyProductId: product.id,
    title: product.title,
    handle: product.handle,
    status: product.status,
    userId: userId,
    createdAt: new Date(product.created_at),
  }

  console.log("💾 Produit enregistré:", productData)

  return productData
}

// Gestion des mises à jour de produits
async function handleProductUpdated(product, userId) {
  console.log(`📝 Produit mis à jour: ${product.title}`)

  const updateData = {
    shopifyProductId: product.id,
    title: product.title,
    status: product.status,
    updatedAt: new Date(product.updated_at),
    userId: userId,
  }

  console.log("💾 Mise à jour produit enregistrée:", updateData)

  return updateData
}

// Fonction pour envoyer des notifications
async function sendNotification(userId, notification) {
  console.log(`🔔 Envoi notification à l'utilisateur ${userId}:`, notification)

  // Simulation d'envoi de notification
  // En réalité, on utiliserait une base de données et des WebSockets
  const notificationData = {
    id: Date.now(),
    userId: userId,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    data: notification.data,
    read: false,
    createdAt: new Date(),
  }

  // Envoyer par email si activé
  if (notification.type === "sale") {
    await sendEmailNotification(userId, notification)
  }

  return notificationData
}

// Fonction pour envoyer des emails
async function sendEmailNotification(userId, notification) {
  console.log(`📧 Envoi email à l'utilisateur ${userId}:`, notification.title)

  // Simulation d'envoi d'email
  const emailData = {
    to: "marie@example.com", // En réalité, récupéré depuis la base
    subject: `Instagram2Shop - ${notification.title}`,
    html: `
      <h2>${notification.title}</h2>
      <p>${notification.message}</p>
      <p>Connectez-vous à votre dashboard pour plus de détails.</p>
    `,
  }

  console.log("📧 Email envoyé:", emailData)
  return emailData
}

// Fonction pour mettre à jour les statistiques utilisateur
async function updateUserStats(userId, stats) {
  console.log(`📊 Mise à jour stats utilisateur ${userId}:`, stats)

  // Simulation de mise à jour des stats
  const updatedStats = {
    userId: userId,
    totalRevenue: stats.totalRevenue,
    totalCommission: stats.totalCommission,
    orderCount: stats.orderCount,
    updatedAt: new Date(),
  }

  console.log("💾 Stats mises à jour:", updatedStats)
  return updatedStats
}

// Exemple d'utilisation avec Express.js
export function setupWebhookEndpoint(app) {
  app.post("/webhooks/shopify", async (req, res) => {
    try {
      const signature = req.get("X-Shopify-Hmac-Sha256")
      const topic = req.get("X-Shopify-Topic")
      const shop = req.get("X-Shopify-Shop-Domain")

      // Vérifier la signature
      const isValid = verifyShopifyWebhook(req.body, signature, process.env.SHOPIFY_WEBHOOK_SECRET)

      if (!isValid) {
        console.error("❌ Signature webhook invalide")
        return res.status(401).send("Unauthorized")
      }

      // Récupérer l'ID utilisateur depuis le shop domain
      const userId = await getUserIdFromShop(shop)

      if (!userId) {
        console.error(`❌ Utilisateur non trouvé pour le shop: ${shop}`)
        return res.status(404).send("User not found")
      }

      // Traiter le webhook
      await handleShopifyWebhook(topic, JSON.parse(req.body), userId)

      res.status(200).send("OK")
    } catch (error) {
      console.error("❌ Erreur webhook:", error)
      res.status(500).send("Internal Server Error")
    }
  })
}

// Fonction utilitaire pour récupérer l'ID utilisateur
async function getUserIdFromShop(shopDomain) {
  // Simulation - en réalité, requête base de données
  const shopToUserMap = {
    "marie-fashion.myshopify.com": "user_123",
    "style-boutique.myshopify.com": "user_456",
  }

  return shopToUserMap[shopDomain] || null
}

console.log("🚀 Gestionnaire de webhooks Shopify initialisé")
