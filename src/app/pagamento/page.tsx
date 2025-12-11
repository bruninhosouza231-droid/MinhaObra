'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Smartphone, Barcode, Check, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

type PaymentMethod = 'credit' | 'debit' | 'pix' | 'boleto';

export default function PagamentoPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    setSuccess(true);
    
    setTimeout(() => {
      router.push('/cliente/dashboard');
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-green-500">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-900">Pagamento Aprovado!</CardTitle>
            <CardDescription className="text-lg">
              Seu plano foi ativado com sucesso
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="border-b border-amber-200 bg-gradient-to-r from-amber-900 to-orange-800 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e595761a-bf3a-4ce6-a456-52fd54a93474.png" 
              alt="Minha Obra" 
              className="h-10 w-10 object-contain bg-white rounded-lg p-1"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Pagamento Seguro</h1>
              <p className="text-xs text-amber-100">Finalize sua assinatura</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Form */}
          <div>
            <Card className="border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Forma de Pagamento</CardTitle>
                <CardDescription>Escolha como deseja pagar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <div className="flex items-center space-x-3 p-4 border-2 border-amber-200 rounded-lg hover:bg-amber-50 cursor-pointer">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Cartão de Crédito</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border-2 border-amber-200 rounded-lg hover:bg-amber-50 cursor-pointer">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Cartão de Débito</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border-2 border-amber-200 rounded-lg hover:bg-amber-50 cursor-pointer">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">PIX</span>
                      <Badge className="ml-auto bg-green-500">Instantâneo</Badge>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border-2 border-amber-200 rounded-lg hover:bg-amber-50 cursor-pointer">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Barcode className="w-5 h-5 text-orange-600" />
                      <span className="font-medium">Boleto Bancário</span>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card Form */}
                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <div className="space-y-4 pt-4 border-t border-amber-200">
                    <div>
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="border-amber-300" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Validade</Label>
                        <Input id="expiry" placeholder="MM/AA" className="border-amber-300" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" type="password" maxLength={3} className="border-amber-300" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="name">Nome no Cartão</Label>
                      <Input id="name" placeholder="NOME COMPLETO" className="border-amber-300" />
                    </div>
                  </div>
                )}

                {/* PIX */}
                {paymentMethod === 'pix' && (
                  <div className="space-y-4 pt-4 border-t border-amber-200">
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg mb-4">
                        <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-400 rounded flex items-center justify-center">
                          <span className="text-xs text-purple-900">QR Code PIX</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">Escaneie o QR Code com seu app de banco</p>
                      <p className="text-xs text-gray-500">Ou copie o código PIX abaixo</p>
                      <Input 
                        value="00020126580014br.gov.bcb.pix..." 
                        readOnly 
                        className="mt-3 text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Boleto */}
                {paymentMethod === 'boleto' && (
                  <div className="space-y-4 pt-4 border-t border-amber-200">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-700 mb-2">
                        O boleto será gerado após a confirmação e enviado para seu email.
                      </p>
                      <p className="text-xs text-gray-500">
                        Prazo de compensação: até 3 dias úteis
                      </p>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-lg py-6"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? 'Processando...' : 'Confirmar Pagamento'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Plano Premium</span>
                    <span className="font-bold">R$ 49,90</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Período</span>
                    <span>Mensal</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">R$ 49,90/mês</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Você terá acesso a:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Obras ilimitadas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Comissão de 10%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Suporte 24/7</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Álbuns e portfólios</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Cursos profissionalizantes</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>Dados criptografados</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
