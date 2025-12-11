'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Smartphone, 
  Download, 
  CheckCircle2, 
  Apple, 
  PlayCircle,
  Zap,
  Shield,
  Bell,
  MessageSquare,
  Calendar,
  CreditCard,
  Star,
  Users,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MobilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'unknown'>('unknown');

  useEffect(() => {
    setMounted(true);
    
    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/i.test(userAgent)) {
      setPlatform('android');
    }
  }, []);

  const handleDownload = (type: 'ios' | 'android') => {
    // Simular download - em produção, redirecionar para App Store/Play Store
    alert(`Redirecionando para ${type === 'ios' ? 'App Store' : 'Google Play'}...`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="border-b border-amber-200 bg-gradient-to-r from-amber-900 to-orange-800 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e595761a-bf3a-4ce6-a456-52fd54a93474.png" 
              alt="Minha Obra" 
              className="h-12 w-12 object-contain bg-white rounded-lg p-1"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">Minha Obra</h1>
              <p className="text-xs text-amber-100">App Mobile</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            Voltar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 px-4 py-1">
            <Smartphone className="w-4 h-4 mr-2" />
            Disponível para iOS e Android
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-900 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-6">
            Minha Obra na palma da sua mão
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Gerencie suas obras de qualquer lugar com nosso app mobile otimizado
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              onClick={() => handleDownload('ios')}
              className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-8 py-6 text-lg shadow-xl"
            >
              <Apple className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-xs opacity-80">Baixar na</div>
                <div className="font-bold">App Store</div>
              </div>
            </Button>

            <Button 
              size="lg"
              onClick={() => handleDownload('android')}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-lg shadow-xl"
            >
              <PlayCircle className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-xs opacity-80">Disponível no</div>
                <div className="font-bold">Google Play</div>
              </div>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span><strong>4.8</strong> de avaliação</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              <span><strong>50k+</strong> downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <span><strong>10k+</strong> usuários ativos</span>
            </div>
          </div>
        </div>

        {/* App Preview */}
        <div className="max-w-sm mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 blur-3xl opacity-30 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
              <div className="bg-white rounded-[2.5rem] overflow-hidden">
                <div className="bg-gradient-to-r from-amber-900 to-orange-800 h-12 flex items-center justify-center">
                  <div className="w-20 h-1 bg-white/30 rounded-full"></div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl"></div>
                    <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-gray-900">Acesso Instantâneo</CardTitle>
              <CardDescription>
                Abra o app e acesse suas obras em segundos, sem precisar fazer login toda vez
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-gray-900">Notificações Push</CardTitle>
              <CardDescription>
                Receba alertas instantâneos sobre mensagens, atualizações de obras e pagamentos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-gray-900">Chat em Tempo Real</CardTitle>
              <CardDescription>
                Converse com clientes e colaboradores instantaneamente, com histórico completo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-gray-900">Agenda Inteligente</CardTitle>
              <CardDescription>
                Gerencie compromissos, prazos e lembretes de forma visual e intuitiva
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-gray-900">Pagamentos Rápidos</CardTitle>
              <CardDescription>
                Escolha entre pagamento semanal, quinzenal ou mensal direto pelo app
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg text-gray-900">Segurança Total</CardTitle>
              <CardDescription>
                Seus dados protegidos com criptografia de ponta a ponta e autenticação biométrica
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Exclusive Features */}
        <Card className="max-w-4xl mx-auto border-2 border-amber-300 bg-gradient-to-br from-white to-amber-50 shadow-2xl mb-16">
          <CardHeader className="text-center pb-6">
            <Badge className="mb-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0 px-4 py-1 mx-auto w-fit">
              Exclusivo do App
            </Badge>
            <CardTitle className="text-3xl text-gray-900 mb-2">
              Recursos Exclusivos Mobile
            </CardTitle>
            <CardDescription className="text-base">
              Funcionalidades disponíveis apenas no aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Modo Offline</h4>
                  <p className="text-sm text-gray-600">
                    Continue trabalhando mesmo sem internet. Sincroniza automaticamente quando conectar
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Câmera Integrada</h4>
                  <p className="text-sm text-gray-600">
                    Tire fotos do progresso da obra e envie diretamente para o cliente
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Localização GPS</h4>
                  <p className="text-sm text-gray-600">
                    Encontre materiais e fornecedores mais próximos com navegação integrada
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Assinatura Digital</h4>
                  <p className="text-sm text-gray-600">
                    Assine contratos e documentos diretamente na tela do celular
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Reconhecimento de Voz</h4>
                  <p className="text-sm text-gray-600">
                    Dite mensagens e anotações enquanto trabalha com as mãos ocupadas
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Widget na Tela Inicial</h4>
                  <p className="text-sm text-gray-600">
                    Veja suas próximas tarefas sem precisar abrir o app
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            O que nossos usuários dizem
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "O app mobile facilitou muito minha vida! Agora consigo gerenciar todas as minhas obras direto do celular, recebo notificações instantâneas e posso responder clientes rapidamente."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Carlos Silva</p>
                    <p className="text-sm text-gray-600">Pedreiro - São Paulo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Incrível poder acompanhar o progresso da reforma em tempo real pelo celular. As fotos que o pedreiro envia me deixam tranquila mesmo estando longe. Super recomendo!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Ana Paula</p>
                    <p className="text-sm text-gray-600">Cliente - Rio de Janeiro</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <Card className="max-w-3xl mx-auto border-2 border-amber-300 bg-gradient-to-br from-amber-900 to-orange-800 text-white shadow-2xl">
          <CardContent className="pt-8 pb-8 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Comece agora mesmo!
            </h3>
            <p className="text-lg text-amber-100 mb-8">
              Baixe o app e tenha acesso a todas as funcionalidades premium por 30 dias grátis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => handleDownload('ios')}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg shadow-xl"
              >
                <Apple className="w-6 h-6 mr-2" />
                App Store
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button 
                size="lg"
                onClick={() => handleDownload('android')}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg shadow-xl"
              >
                <PlayCircle className="w-6 h-6 mr-2" />
                Google Play
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-gradient-to-r from-amber-900 to-orange-800 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-amber-100">
          <p className="text-sm">© 2024 Minha Obra - Todos os direitos reservados</p>
          <p className="text-xs mt-2 opacity-80">Disponível para iOS 14+ e Android 8+</p>
        </div>
      </footer>
    </div>
  );
}
