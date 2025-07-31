"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Info,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
  Settings,
} from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  type: "sale" | "alert" | "info" | "success"
  title: string
  message: string
  time: string
  read: boolean
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "sale",
      title: "Nouvelle vente !",
      message: "Robe d'été fleurie vendue pour 89€",
      time: "Il y a 2 minutes",
      read: false,
    },
    {
      id: "2",
      type: "success",
      title: "Produit synchronisé",
      message: "Sac à main cuir ajouté à votre boutique Shopify",
      time: "Il y a 1 heure",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "Nouveau post détecté",
      message: "3 nouveaux produits trouvés dans vos posts Instagram",
      time: "Il y a 3 heures",
      read: true,
    },
    {
      id: "4",
      type: "alert",
      title: "Attention requise",
      message: "Votre connexion Instagram expire dans 7 jours",
      time: "Il y a 1 jour",
      read: false,
    },
    {
      id: "5",
      type: "sale",
      title: "Vente réalisée",
      message: "Bijoux dorés vendus pour 45€",
      time: "Il y a 2 jours",
      read: true,
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ShoppingCart className="w-5 h-5 text-green-600" />
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "sale":
        return "bg-green-500"
      case "alert":
        return "bg-red-500"
      case "success":
        return "bg-green-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    toast.success("Notification marquée comme lue")
  }

  const markAsUnread = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: false } : notif)))
    toast.success("Notification marquée comme non lue")
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
    toast.success("Notification supprimée")
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
    toast.success("Toutes les notifications marquées comme lues")
  }

  const clearAll = () => {
    setNotifications([])
    toast.success("Toutes les notifications supprimées")
  }

  const goToSettings = () => {
    router.push("/settings")
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notif.read
    return notif.type === activeTab
  })

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <AppLayout title="Notifications" breadcrumbItems={[{ label: "Notifications" }]}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="text-lg font-medium">
              {unreadCount > 0 && <Badge className="ml-2 bg-red-500 text-white">{unreadCount} non lues</Badge>}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Tout marquer comme lu
            </Button>
            <Button variant="outline" onClick={clearAll} disabled={notifications.length === 0}>
              <Trash2 className="w-4 h-4 mr-2" />
              Tout supprimer
            </Button>
            <Button variant="outline" onClick={goToSettings}>
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Toutes ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Non lues ({unreadCount})</TabsTrigger>
            <TabsTrigger value="sale">Ventes ({notifications.filter((n) => n.type === "sale").length})</TabsTrigger>
            <TabsTrigger value="alert">Alertes ({notifications.filter((n) => n.type === "alert").length})</TabsTrigger>
            <TabsTrigger value="info">Infos ({notifications.filter((n) => n.type === "info").length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
                  <p className="text-gray-500">
                    {activeTab === "unread"
                      ? "Toutes vos notifications ont été lues"
                      : "Vous n'avez pas encore de notifications"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${
                    !notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getBadgeColor(notification.type)} text-white`}
                            >
                              {notification.type}
                            </Badge>
                            {!notification.read && (
                              <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
                                Nouveau
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-sm text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        {notification.read ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsUnread(notification.id)}
                            title="Marquer comme non lu"
                          >
                            <MarkAsUnread className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            title="Marquer comme lu"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        {notifications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Résumé des notifications</CardTitle>
              <CardDescription>Aperçu de votre activité récente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">
                    {notifications.filter((n) => n.type === "sale").length}
                  </div>
                  <div className="text-sm text-gray-600">Ventes</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-red-600">
                    {notifications.filter((n) => n.type === "alert").length}
                  </div>
                  <div className="text-sm text-gray-600">Alertes</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Info className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600">
                    {notifications.filter((n) => n.type === "info").length}
                  </div>
                  <div className="text-sm text-gray-600">Infos</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">
                    {notifications.filter((n) => n.type === "success").length}
                  </div>
                  <div className="text-sm text-gray-600">Succès</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
