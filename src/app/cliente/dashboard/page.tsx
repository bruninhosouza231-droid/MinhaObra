'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, MessageSquare, Bell, LogOut, Settings, Package, Crown, BookOpen, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getCurrentUser, getWorksByClientId, getNotificationsByUserId } from '@/lib/storage';
import { Cliente, WORK_TYPES_LABELS, PLANS } from '@/lib/types';

export default function ClienteDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Cliente | null>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.type !== 'cliente') {
      router.push('/auth/login?type=cliente');
      return;
    }
    setUser(currentUser as Cliente);
    
    const userWorks = getWorksByClientId(currentUser.id);
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
  const worksThisMonth = user.worksThisMonth || 0;
  const worksLimit = planInfo.maxWorksPerMonth === 'unlimited' ? 'Ilimitado' : planInfo.maxWorksPerMonth;
  const worksProgress = planInfo.maxWorksPerMonth === 'unlimited' ? 100 : (worksThisMonth / (planInfo.maxWorksPerMonth as number)) * 100;
  const canCreateWork = planInfo.maxWorksPerMonth === 'unlimited' || worksThisMonth < (planInfo.maxWorksPerMonth as number);

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
                <p className="text-xs text-amber-100">Área do Cliente</p>
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
            Olá, {user.name}! 👋
          </h2>
          <p className="text-gray-700">
            Bem-vindo ao seu painel de controle
          </p>
        </div>

        {/* Plan Info with Usage */}
        <Card className="mb-8 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-blue-900">{planInfo.name}</CardTitle>
                  {user.plan !== 'gratis' && (
                    <Badge className="bg-blue-600 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-blue-700 font-medium">
                  Comissão: {planInfo.commission}%
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/planos')}
                className="border-blue-400 text-blue-700 hover:bg-blue-100"
              >
                {user.plan === 'gratis' ? 'Fazer Upgrade' : 'Gerenciar Plano'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Works Usage */}
            {user.plan === 'gratis' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-800 font-medium">Obras este mês</span>
                  <span className="text-sm text-blue-900 font-bold">{worksThisMonth} / {worksLimit}</span>
                </div>
                <Progress value={worksProgress} className="h-2" />
                {!canCreateWork && (
                  <p className="text-xs text-red-600 mt-2 font-medium">
                    ⚠️ Limite de obras atingido. Faça upgrade para continuar!
                  </p>
                )}
              </div>
            )}

            {/* Features List */}
            <ul className="space-y-1 text-sm text-blue-800">
              {planInfo.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Upgrade CTA for Free Plan */}
            {user.plan === 'gratis' && (
              <div className="pt-3 border-t border-blue-200">
                <p className="text-sm text-blue-900 font-medium mb-2">
                  🚀 Desbloqueie recursos premium:
                </p>
                <ul className="text-xs text-blue-800 space-y-1 mb-3">
                  <li>• Obras ilimitadas</li>
                  <li>• Negociação de orçamentos</li>
                  <li>• Acesso a cursos profissionalizantes</li>
                </ul>
                <Button 
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={() => router.push('/planos')}
                >
                  Ver Planos Premium
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Button 
            className="h-24 flex-col gap-2 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
            onClick={() => {
              if (!canCreateWork) {
                alert('Limite de obras atingido! Faça upgrade para o plano Premium.');
                router.push('/planos');
              } else {
                alert('Funcionalidade em desenvolvimento - Módulo 2');
              }
            }}
            disabled={!canCreateWork}
          >
            <Plus className="w-6 h-6" />
            Nova Obra
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all"
            onClick={() => alert('Funcionalidade em desenvolvimento - Módulo 3')}
          >
            <Search className="w-6 h-6 text-amber-700" />
            <span className="text-gray-900">Buscar Diaristas</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all"
            onClick={() => alert('Funcionalidade em desenvolvimento - Módulo 3')}
          >
            <Package className="w-6 h-6 text-amber-700" />
            <span className="text-gray-900">Buscar Materiais</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 shadow-md hover:shadow-lg transition-all"
            onClick={() => router.push('/cursos')}
          >
            <BookOpen className="w-6 h-6 text-amber-700" />
            <span className="text-gray-900">Cursos</span>
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
                <CardTitle className="text-amber-900">Minhas Obras</CardTitle>
                <CardDescription className="text-gray-700">
                  {works.length === 0 ? 'Nenhuma obra cadastrada ainda' : `${works.length} obra(s) ativa(s)`}
                </CardDescription>
              </div>
              {user.plan !== 'gratis' && (
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
                <p className="text-gray-600 mb-4">Você ainda não tem obras cadastradas</p>
                <Button 
                  onClick={() => {
                    if (!canCreateWork) {
                      alert('Limite de obras atingido! Faça upgrade para o plano Premium.');
                      router.push('/planos');
                    } else {
                      alert('Funcionalidade em desenvolvimento - Módulo 2');
                    }
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                  disabled={!canCreateWork}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Primeira Obra
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
                        {user.plan !== 'gratis' && (
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
