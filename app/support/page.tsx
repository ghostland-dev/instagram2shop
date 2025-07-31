"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, MessageCircle, Mail, Phone, Clock, CheckCircle, Send, Search, ExternalLink } from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"
import { toast } from "sonner"

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("faq")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    message: "",
  })

  const faqs = [
    {
      question: "Comment connecter mon compte Instagram ?",
      answer:
        "Allez dans Paramètres > Intégrations, puis cliquez sur 'Connecter' à côté d'Instagram. Vous serez redirigé vers Instagram pour autoriser l'accès.",
      category: "Intégration",
    },
    {
      question: "Pourquoi mes produits ne sont-ils pas détectés ?",
      answer:
        "Assurez-vous que vos posts contiennent des images de produits claires et des descriptions. Notre IA analyse automatiquement vos posts toutes les heures.",
      category: "Produits",
    },
    {
      question: "Comment modifier les prix de mes produits ?",
      answer:
        "Vous pouvez modifier les prix directement dans votre dashboard, section 'Mes Produits'. Les changements sont synchronisés avec Shopify automatiquement.",
      category: "Produits",
    },
    {
      question: "Quand suis-je facturé ?",
      answer:
        "La facturation se fait le 1er de chaque mois pour l'abonnement, ou à chaque vente pour le modèle commission.",
      category: "Facturation",
    },
    {
      question: "Comment supprimer mon compte ?",
      answer: "Allez dans Paramètres > Confidentialité > Zone de danger. Attention, cette action est irréversible.",
      category: "Compte",
    },
  ]

  const tickets = [
    {
      id: "#12345",
      subject: "Problème de synchronisation Shopify",
      status: "En cours",
      priority: "Haute",
      created: "Il y a 2 heures",
      updated: "Il y a 30 minutes",
    },
    {
      id: "#12344",
      subject: "Question sur la facturation",
      status: "Résolu",
      priority: "Normale",
      created: "Il y a 1 jour",
      updated: "Il y a 4 heures",
    },
    {
      id: "#12343",
      subject: "Demande de fonctionnalité",
      status: "En attente",
      priority: "Basse",
      created: "Il y a 3 jours",
      updated: "Il y a 1 jour",
    },
  ]

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketForm.subject || !ticketForm.category || !ticketForm.message) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Ticket créé avec succès ! Nous vous répondrons sous 24h.")
      setTicketForm({ subject: "", category: "", priority: "", message: "" })
    } catch (error) {
      toast.error("Erreur lors de la création du ticket")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast.info(`Recherche : "${searchQuery}"`)
    }
  }

  const openChat = () => {
    toast.info("Chat en direct bientôt disponible !")
  }

  const callSupport = () => {
    toast.info("Numéro de support : +33 1 23 45 67 89")
  }

  const emailSupport = () => {
    window.location.href = "mailto:support@instagram2shop.com"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "En cours":
        return <Badge className="bg-blue-500">En cours</Badge>
      case "Résolu":
        return <Badge className="bg-green-500">Résolu</Badge>
      case "En attente":
        return <Badge className="bg-yellow-500">En attente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Haute":
        return <Badge variant="destructive">Haute</Badge>
      case "Normale":
        return <Badge variant="secondary">Normale</Badge>
      case "Basse":
        return <Badge variant="outline">Basse</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AppLayout title="Support" breadcrumbItems={[{ label: "Support" }]}>
      <div className="space-y-6">
        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={openChat}>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Chat en direct</h3>
              <p className="text-gray-600 mb-4">Réponse immédiate</p>
              <Badge className="bg-green-500">En ligne</Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={emailSupport}>
            <CardContent className="p-6 text-center">
              <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Réponse sous 24h</p>
              <Badge variant="secondary">support@instagram2shop.com</Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={callSupport}>
            <CardContent className="p-6 text-center">
              <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
              <p className="text-gray-600 mb-4">Lun-Ven 9h-18h</p>
              <Badge variant="outline">+33 1 23 45 67 89</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Support Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="ticket">Nouveau ticket</TabsTrigger>
            <TabsTrigger value="tickets">Mes tickets</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
                <CardDescription>Trouvez rapidement des réponses à vos questions</CardDescription>
                <form onSubmit={handleSearch} className="flex gap-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher dans la FAQ..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="outline">
                    Rechercher
                  </Button>
                </form>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-lg">{faq.question}</h4>
                        <Badge variant="outline">{faq.category}</Badge>
                      </div>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                  {filteredFaqs.length === 0 && searchQuery && (
                    <div className="text-center py-8 text-gray-500">
                      <HelpCircle className="w-12 h-12 mx-auto mb-4" />
                      <p>Aucun résultat trouvé pour "{searchQuery}"</p>
                      <p className="text-sm mt-2">Essayez avec d'autres mots-clés ou créez un ticket</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Ticket Tab */}
          <TabsContent value="ticket">
            <Card>
              <CardHeader>
                <CardTitle>Créer un ticket de support</CardTitle>
                <CardDescription>Décrivez votre problème et nous vous aiderons rapidement</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        placeholder="Décrivez brièvement votre problème"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select
                        value={ticketForm.category}
                        onValueChange={(value) => setTicketForm({ ...ticketForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="integration">Intégration</SelectItem>
                          <SelectItem value="products">Produits</SelectItem>
                          <SelectItem value="billing">Facturation</SelectItem>
                          <SelectItem value="technical">Technique</SelectItem>
                          <SelectItem value="account">Compte</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorité</Label>
                    <Select
                      value={ticketForm.priority}
                      onValueChange={(value) => setTicketForm({ ...ticketForm, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une priorité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="normal">Normale</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Description détaillée *</Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez votre problème en détail. Plus vous donnez d'informations, plus nous pourrons vous aider rapidement."
                      rows={6}
                      value={ticketForm.message}
                      onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le ticket
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Tickets Tab */}
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Mes tickets de support</CardTitle>
                <CardDescription>Suivez l'état de vos demandes de support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{ticket.subject}</h4>
                            <Badge variant="outline">{ticket.id}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Créé {ticket.created}</span>
                            <span>•</span>
                            <span>Mis à jour {ticket.updated}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Voir les détails
                        </Button>
                      </div>
                    </div>
                  ))}
                  {tickets.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                      <p>Aucun ticket de support</p>
                      <p className="text-sm mt-2">Créez votre premier ticket si vous avez besoin d'aide</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Guides et tutoriels détaillés</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Guide de démarrage rapide
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connecter Instagram
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Configuration Shopify
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Optimiser ses ventes
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vidéos tutoriels</CardTitle>
                  <CardDescription>Apprenez en regardant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Première configuration (5 min)
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Gérer ses produits (8 min)
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Analytics et rapports (6 min)
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Conseils marketing (12 min)
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statut du service</CardTitle>
                  <CardDescription>Vérifiez l'état de nos services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>API Instagram</span>
                    <Badge className="bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Opérationnel
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Synchronisation Shopify</span>
                    <Badge className="bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Opérationnel
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Système de paiement</span>
                    <Badge className="bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Opérationnel
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    <Badge className="bg-yellow-500">
                      <Clock className="w-3 h-3 mr-1" />
                      Maintenance
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communauté</CardTitle>
                  <CardDescription>Échangez avec d'autres utilisateurs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Forum communautaire
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Discord Instagram2Shop
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Groupe Facebook
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Témoignages clients
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
