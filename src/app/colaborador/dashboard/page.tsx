'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MessageSquare, Bell, LogOut, Settings, Calendar, Award, DollarSign, BookOpen, Crown, Image as ImageIcon, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getCurrentUser, getWorksByColaboradorId, getNotificationsByUserId } from '@/lib/storage';
import { Colaborador, WORK_TYPES_LABELS, PLANS } from '@/lib/types';

export default function ColaboradorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Colaborador | null>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.type !== 'colaborador') {
      router.push('/auth/login?type=colaborador');
      return;
    }
    setUser(currentUser as Colaborador);
    
    const userWorks = getWorksByColaboradorId(currentUser.id);
    setWorks(userWorks);

    const userNotifications = getNotificationsByUserId(currentUser.id);
    setNotifications(userNotifications.filter(n => !n.read).slice(0, 5));
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  const planInfo = PLANS[user.plan];
  const unreadNotifications = notifications.length;
  const paymentFrequencyLabel = {
    semanal: 'Semanal (sexta-feira)',
    quinzenal: 'Quinzenal (15 em 15 dias)',
    mensal: 'Mensal'
  }[user.paymentFrequency];

  const hasPortfolioAccess = user.plan === 'premium' || user.plan === 'equipe';
  const hasCoursesAccess = user.plan === 'premium' || user.plan === 'equipe';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="border-b border-amber-200 bg-gradient-to-r from-amber-900 to-orange-800 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e595761a-bf3a-4ce6-a456-52fd54a93474.png" 
                alt="Minha Obra" 
                className="h-10 w-10 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h1 className="text-xl font-bold text-white">Minha Obra</h1>
                <p className="text-xs text-amber-100">Área do Colaborador</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white hover:bg-white/10">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-2">
            Olá, {user.name}! 👷
          </h2>
          <p className="text-gray-700">
            Bem-vindo ao seu painel de trabalho
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardDescription className="text-gray-700">Avaliação</CardDescription>
              <CardTitle className="text-3xl text-amber-900">
                {user.rating.toFixed(1)} ⭐
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardDescription className="text-gray-700">Obras Concluídas</CardDescription>
              <CardTitle className="text-3xl text-amber-900">{user.completedWorks}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardDescription className="text-gray-700">Plano Atual</CardDescription>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg text-amber-900">{planInfo.name}</CardTitle>
                {user.plan !== 'gratis' && (
                  <Crown className="w-4 h-4 text-amber-700" />
                )}
              </div>
              <p className="text-sm text-gray-700">Comissão: {planInfo.commission}%</p>
            </CardHeader>
          </Card>

          <Card className={`border-2 shadow-lg hover:shadow-xl transition-all ${user.bonusEligible ? 'border-green-300 bg-gradient-to-br from-green-50 to-green-100' : 'border-amber-200'}`}>
            <CardHeader className="pb-3">
              <CardDescription className="text-gray-700">Bonificação</CardDescription>
              <CardTitle className="text-lg">
                {user.bonusEligible ? (
                  <span className="text-green-700 flex items-center gap-2 font-bold">
                    <Award className="w-5 h-5" />
                    Elegível
                  </span>
                ) : (
                  <span className="text-gray-600">Não elegível</span>
                )}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Payment Info */}
        <Card className="mb-8 border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-100 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-orange-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pagamento
                </CardTitle>
                <CardDescription className="text-orange-800 font-medium">
                  {paymentFrequencyLabel}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-orange-700 text-white shadow-md">
                Ativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-900 font-medium">
              Próximo pagamento: Em breve
            </p>
            {user.bonusEligible && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg border-2 border-green-300 shadow-md">
                <p className="text-sm text-green-900 font-bold">
                  🎉 Você está elegível para bonificação este mês!
                </p>
                <p className="text-xs text-green-800 mt-1">
                  Continue sem falhas para receber o bônus
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan Upgrade CTA for Free Users */}
        {user.plan === 'gratis' && (
          <Card className="mb-8 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Desbloqueie Recursos Premium
              </CardTitle>
              <CardDescription className="text-gray-700">
                Faça upgrade e tenha acesso a álbuns, portfólios e cursos profissionalizantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>Criar álbuns e portfólios profissionais</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Acesso a cursos profissionalizantes</span>
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span>Negociação de orçamentos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Comissão de 10% (Premium) ou 15% (Equipe)</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={() => router.push('/planos')}
              >
                Ver Planos Premium
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Specialties */}
        <Card className="mb-8 border-2 border-amber-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
            <CardTitle className="text-amber-900">Minhas Especialidades</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {user.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="bg-gradient-to-r from-orange-600 to-amber-700 text-white shadow-md">
                  {WORK_TYPES_LABELS[specialty]}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Button 
            className="h-24 flex-col gap-2 bg-gradient-to-br from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 shadow-lg hover:shadow-xl transition-all"
            onClick={() => alert('Funcionalidade em desenvolvimento - Módulo 2')}
          >
            <Search className="w-6 h-6" />
            Buscar Obras
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all"
            onClick={() => alert('Funcionalidade em desenvolvimento - Módulo 2')}
          >
            <Calendar className="w-6 h-6 text-amber-700" />
            <span className="text-gray-900">Minha Agenda</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all"
            onClick={() => {
              if (!hasPortfolioAccess) {
                alert('Recurso disponível apenas para planos Premium e Equipe!');
                router.push('/planos');
              } else {
                alert('Funcionalidade de portfólio em desenvolvimento - Módulo 3');
              }
            }}
          >
            <FolderOpen className="w-6 h-6 text-amber-700" />
            <span className="text-gray-900">Portfólio</span>
            {!hasPortfolioAccess && <Crown className="w-3 h-3 text-blue-600 absolute top-2 right-2" />}
          </Button>

          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all"
            onClick={() => {
              if (!hasCoursesAccess) {
                alert('Cursos disponíveis apenas para planos Premium e Equipe!');
                router.push('/planos');
              } else {
                router.push('/cursos');
              }
            }}
          >
            <BookOpen className="w-6 h-6 text-amber-700" />
            <span className="text-gray-900">Cursos</span>
            {!hasCoursesAccess && <Crown className="w-3 h-3 text-blue-600 absolute top-2 right-2" />}
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all"
            onClick={() => alert('Funcionalidade em desenvolvimento - Módulo 2')}
          >
            <MessageSquare className="w-6 h-6 text-amber-700" />
            <span className="text-gray-900">Mensagens</span>
          </Button>
        </div>

        {/* Works Section */}
        <Card className="border-2 border-amber-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-amber-900">Minhas Ordens de Serviço</CardTitle>
                <CardDescription className="text-gray-700">
                  {works.length === 0 ? 'Nenhuma ordem de serviço ativa' : `${works.length} ordem(ns) ativa(s)`}
                </CardDescription>
              </div>
              {hasPortfolioAccess && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-300 hover:bg-amber-50"
                  onClick={() => alert('Funcionalidade de negociação em desenvolvimento')}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Negociar Orçamento
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {works.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Você ainda não tem ordens de serviço</p>
                <Button 
                  onClick={() => alert('Funcionalidade em desenvolvimento - Módulo 2')}
                  className="bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 shadow-lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar Oportunidades
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {works.map((work) => (
                  <Card key={work.id} className="hover:shadow-xl transition-all border-amber-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-gray-900">{work.title}</CardTitle>
                          <CardDescription className="text-gray-600">
                            {WORK_TYPES_LABELS[work.type]} • {work.address}
                          </CardDescription>
                        </div>
                        <Badge className="bg-amber-600 text-white">
                          {work.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{work.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-amber-300 hover:bg-amber-50">
                          Ver Detalhes
                        </Button>
                        <Button size="sm" variant="outline" className="border-amber-300 hover:bg-amber-50">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Mensagens
                        </Button>
                        {hasPortfolioAccess && (
                          <Button size="sm" variant="outline" className="border-amber-300 hover:bg-amber-50">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Negociar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
