'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Crown, Users, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PLANS, PlanType } from '@/lib/types';

export default function PlanosPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    // Aqui você pode adicionar lógica para processar o upgrade/downgrade
    alert(`Plano ${PLANS[plan].name} selecionado! Funcionalidade de pagamento em desenvolvimento.`);
  };

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
              <h1 className="text-xl font-bold text-white">Escolha seu Plano</h1>
              <p className="text-xs text-amber-100">Encontre o plano ideal para você</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-4">
            Planos que se adaptam às suas necessidades
          </h2>
          <p className="text-lg text-gray-700">
            Escolha o plano ideal e comece a gerenciar suas obras com mais eficiência
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plano Grátis */}
          <Card className="relative border-2 border-amber-300 hover:shadow-2xl transition-all duration-300 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Zap className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Grátis</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">R$ 0</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <CardDescription className="text-base text-gray-600 mt-2">
                Ideal para começar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Até 3 obras por mês</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Comissão de apenas 5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Mensagens básicas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Suporte por email</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Sem álbuns/portfólios</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Sem acesso a cursos</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gray-600 hover:bg-gray-700"
                onClick={() => handleSelectPlan('gratis')}
              >
                Começar Grátis
              </Button>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="relative border-2 border-blue-500 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-white scale-105">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
              MAIS POPULAR
            </Badge>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Premium</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-600">R$ 49,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <CardDescription className="text-base text-gray-600 mt-2">
                Para profissionais sérios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Obras ilimitadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Comissão de 10%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Suporte 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Criar álbuns e portfólios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Acesso a cursos profissionalizantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Negociação de orçamentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Sem anúncios</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                onClick={() => handleSelectPlan('premium')}
              >
                Assinar Premium
              </Button>
            </CardContent>
          </Card>

          {/* Plano Equipe */}
          <Card className="relative border-2 border-purple-500 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-white">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1">
              MELHOR VALOR
            </Badge>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Equipe</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-purple-600">R$ 99,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <CardDescription className="text-base text-gray-600 mt-2">
                Para equipes completas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Tudo do Premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Comissão de 15%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Gestão de equipe completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Álbuns e portfólios ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Todos os cursos inclusos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Relatórios avançados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">API de integração</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">Gerente de conta dedicado</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg"
                onClick={() => handleSelectPlan('equipe')}
              >
                Assinar Equipe
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Compare os recursos
          </h3>
          <Card className="border-2 border-amber-200">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-amber-200">
                      <th className="text-left py-3 px-4 text-gray-900">Recurso</th>
                      <th className="text-center py-3 px-4 text-gray-900">Grátis</th>
                      <th className="text-center py-3 px-4 text-blue-600">Premium</th>
                      <th className="text-center py-3 px-4 text-purple-600">Equipe</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-amber-100">
                      <td className="py-3 px-4 text-gray-700">Obras por mês</td>
                      <td className="text-center py-3 px-4">3</td>
                      <td className="text-center py-3 px-4 font-medium">Ilimitado</td>
                      <td className="text-center py-3 px-4 font-medium">Ilimitado</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-3 px-4 text-gray-700">Comissão</td>
                      <td className="text-center py-3 px-4">5%</td>
                      <td className="text-center py-3 px-4 font-medium">10%</td>
                      <td className="text-center py-3 px-4 font-medium">15%</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-3 px-4 text-gray-700">Álbuns e Portfólios</td>
                      <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-blue-600 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-purple-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-3 px-4 text-gray-700">Cursos Profissionalizantes</td>
                      <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-blue-600 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-purple-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-3 px-4 text-gray-700">Negociação de Orçamentos</td>
                      <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-blue-600 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-purple-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-3 px-4 text-gray-700">Suporte</td>
                      <td className="text-center py-3 px-4 text-sm">Email</td>
                      <td className="text-center py-3 px-4 font-medium">24/7</td>
                      <td className="text-center py-3 px-4 font-medium">24/7 + Gerente</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
