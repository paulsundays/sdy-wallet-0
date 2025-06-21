"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, ArrowDownLeft, Send, Wallet, TrendingUp } from "lucide-react"
import Image from "next/image"

// Agregar los imports necesarios para los modales
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"

// Datos simulados
const mockTransactions = [
  {
    id: 1,
    type: "received",
    amount: 150.5,
    from: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    timestamp: "2024-06-21 14:30",
    status: "completed",
  },
  {
    id: 2,
    type: "sent",
    amount: 75.25,
    to: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
    timestamp: "2024-06-21 12:15",
    status: "completed",
  },
  {
    id: 3,
    type: "received",
    amount: 200.0,
    from: "0x925a3b8D4C0532925a3b8D4C0532925a3b8D4C05",
    timestamp: "2024-06-20 18:45",
    status: "completed",
  },
  {
    id: 4,
    type: "sent",
    amount: 50.75,
    to: "0xD4C0532925a3b8D4C0532925a3b8D4C0532925a3",
    timestamp: "2024-06-20 16:20",
    status: "pending",
  },
]

export default function SundaysCoinsWallet() {
  const [balance] = useState(1247.83)
  const [usdRate] = useState(0.85)
  const [transferAddress, setTransferAddress] = useState("")
  const [transferAmount, setTransferAmount] = useState("")

  // Agregar estados para los modales después de los estados existentes
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [transferStatus, setTransferStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  const usdEquivalent = (balance * usdRate).toFixed(2)

  // Reemplazar la función handleTransfer con esta nueva versión
  const handleTransfer = () => {
    if (transferAddress && transferAmount) {
      setShowConfirmModal(true)
    }
  }

  // Agregar nueva función para confirmar la transferencia
  const confirmTransfer = async () => {
    setShowConfirmModal(false)
    setShowStatusModal(true)
    setTransferStatus("loading")

    // Simular proceso de transferencia
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simular éxito/error aleatoriamente para demo
      const success = Math.random() > 0.3

      if (success) {
        setTransferStatus("success")
        // Limpiar formulario después del éxito
        setTimeout(() => {
          setTransferAddress("")
          setTransferAmount("")
        }, 1000)
      } else {
        setTransferStatus("error")
        setErrorMessage(
          "Error de red: No se pudo completar la transferencia. Verifica tu conexión e intenta nuevamente.",
        )
      }
    } catch (error) {
      setTransferStatus("error")
      setErrorMessage("Error inesperado: Por favor intenta nuevamente.")
    }
  }

  // Agregar función para cerrar modal de estado
  const closeStatusModal = () => {
    setShowStatusModal(false)
    setTransferStatus("loading")
    setErrorMessage("")
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/sundays-logo.png"
                alt="Paul Sundays Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-slate-800">SundaysCoins</h1>
                <p className="text-sm text-slate-600">Tu wallet digital</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-pink-500" />
              <span className="text-sm text-slate-600">Conectado</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-pink-500 to-pink-600 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-pink-100 mb-2">Balance Total</p>
              <h2 className="text-4xl font-bold mb-2">{balance.toLocaleString()} SDY</h2>
              <div className="flex items-center justify-center gap-2 text-pink-100">
                <TrendingUp className="w-4 h-4" />
                <span>≈ ${usdEquivalent} USD</span>
              </div>
              <p className="text-xs text-pink-200 mt-2">1 SDY = ${usdRate} USD</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-pink-200">
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              Transacciones
            </TabsTrigger>
            <TabsTrigger value="transfer" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Transferir
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="mt-6">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
              <CardHeader>
                <CardTitle className="text-slate-800">Transacciones Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white border border-pink-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${tx.type === "received" ? "bg-green-100" : "bg-orange-100"}`}
                        >
                          {tx.type === "received" ? (
                            <ArrowDownLeft className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {tx.type === "received" ? "Recibido" : "Enviado"}
                          </p>
                          <p className="text-sm text-slate-500">
                            {tx.type === "received" ? "De: " : "A: "}
                            {truncateAddress(tx.from || tx.to || "")}
                          </p>
                          <p className="text-xs text-slate-400">{tx.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.type === "received" ? "text-green-600" : "text-orange-600"}`}>
                          {tx.type === "received" ? "+" : "-"}
                          {tx.amount} SDY
                        </p>
                        <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {tx.status === "completed" ? "Completado" : "Pendiente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transfer Tab */}
          <TabsContent value="transfer" className="mt-6">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Send className="w-5 h-5 text-pink-500" />
                  Transferir SundaysCoins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700">
                    Dirección del destinatario
                  </Label>
                  <Input
                    id="address"
                    placeholder="0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4"
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                    className="border-pink-200 focus:border-pink-500"
                  />
                  <p className="text-xs text-slate-500">Ingresa la dirección pública del destinatario</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-slate-700">
                    Cantidad (SDY)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="border-pink-200 focus:border-pink-500"
                  />
                  <p className="text-xs text-slate-500">Balance disponible: {balance.toLocaleString()} SDY</p>
                </div>

                <Separator className="bg-pink-200" />

                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <h4 className="font-medium text-slate-800 mb-2">Resumen de la transferencia</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cantidad:</span>
                      <span className="font-medium">{transferAmount || "0"} SDY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Equivalente USD:</span>
                      <span className="font-medium">
                        ${transferAmount ? (Number.parseFloat(transferAmount) * usdRate).toFixed(2) : "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Comisión:</span>
                      <span className="font-medium">0.01 SDY</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleTransfer}
                  disabled={!transferAddress || !transferAmount}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Transferencia
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Confirmación */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md bg-white border-pink-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-800">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Confirmar Transferencia
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800 mb-3">¿Estás seguro de que deseas enviar esta transferencia?</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Destinatario:</span>
                  <span className="font-mono text-xs">{truncateAddress(transferAddress)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cantidad:</span>
                  <span className="font-bold text-pink-600">{transferAmount} SDY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Comisión:</span>
                  <span>0.01 SDY</span>
                </div>
                <div className="flex justify-between border-t border-amber-200 pt-2">
                  <span className="font-medium text-slate-800">Total:</span>
                  <span className="font-bold">{(Number.parseFloat(transferAmount) + 0.01).toFixed(2)} SDY</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border-slate-300 hover:bg-slate-50"
              >
                Cancelar
              </Button>
              <Button onClick={confirmTransfer} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
                Confirmar Envío
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Estado (Loading/Success/Error) */}
      <Dialog open={showStatusModal} onOpenChange={closeStatusModal}>
        <DialogContent className="sm:max-w-md bg-white border-pink-200">
          <div className="text-center py-6">
            {transferStatus === "loading" && (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Procesando Transferencia</h3>
                  <p className="text-slate-600 text-sm">Tu transferencia está siendo procesada en la blockchain...</p>
                </div>
              </div>
            )}

            {transferStatus === "success" && (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">¡Transferencia Exitosa!</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Tu transferencia de {transferAmount} SDY ha sido enviada correctamente.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700">Hash de transacción: 0x742d35...a3b8D4</p>
                  </div>
                </div>
                <Button onClick={closeStatusModal} className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Continuar
                </Button>
              </div>
            )}

            {transferStatus === "error" && (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Error en la Transferencia</h3>
                  <p className="text-slate-600 text-sm mb-4">{errorMessage}</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={closeStatusModal}
                    className="flex-1 border-slate-300 hover:bg-slate-50"
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => {
                      closeStatusModal()
                      setTimeout(() => setShowConfirmModal(true), 100)
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  >
                    Reintentar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
