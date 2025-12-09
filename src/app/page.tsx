'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Hammer, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser, initializeDemoData } from '@/lib/storage';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initializeDemoData();
    
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      if (currentUser.type === 'cliente') {
        router.push('/cliente/dashboard');
      } else {
        router.push('/colaborador/dashboard');
      }
    }
  }, [router]);

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
              <p className="text-xs text-amber-100">Conectando obras e profissionais</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/auth/login')}
            className="hidden sm:flex bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
          >
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-900 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-4">
            Gerencie suas obras com praticidade
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Conecte clientes e colaboradores de forma segura, sem compartilhar números de telefone
          </p>
        </div>

        {/* Profile Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Cliente Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-blue-500 cursor-pointer group bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-600 transition-all shadow-lg">
                <Building2 className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Sou Cliente</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Encontre profissionais qualificados para sua obra
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5 font-bold">✓</span>
                  <span>Cadastre suas obras e necessidades</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5 font-bold">✓</span>
                  <span>Receba propostas de colaboradores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5 font-bold">✓</span>
                  <span>Acompanhe o andamento em tempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5 font-bold">✓</span>
                  <span>Mensagens seguras e privadas</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                onClick={() => router.push('/auth/login?type=cliente')}
              >
                Começar como Cliente
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Colaborador Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-orange-600 cursor-pointer group bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center group-hover:from-orange-600 group-hover:to-amber-700 transition-all shadow-lg">
                <Hammer className="w-10 h-10 text-orange-700 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Sou Colaborador</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Encontre oportunidades de trabalho
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5 font-bold">✓</span>
                  <span>Receba solicitações de serviços</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5 font-bold">✓</span>
                  <span>Gerencie sua agenda e ordens de serviço</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5 font-bold">✓</span>
                  <span>Escolha forma de pagamento (semanal, quinzenal, mensal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5 font-bold">✓</span>
                  <span>Ganhe bonificações por desempenho</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white shadow-lg"
                onClick={() => router.push('/auth/login?type=colaborador')}
              >
                Começar como Colaborador
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="text-center border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900">Planos Flexíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Grátis (5%), Premium (10%) ou Equipe (15%) - escolha o melhor para você
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900">Serviços de Limpeza</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Limpeza comercial, padrão, pesada, pré-mudança e pós-obra
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-amber-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900">Busca de Materiais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Encontre os melhores preços e fornecedores próximos a você
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-gradient-to-r from-amber-900 to-orange-800 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-amber-100">
          <p className="text-sm">© 2024 Minha Obra - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
