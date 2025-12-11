'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trophy, Star, Gift, TrendingUp, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function BonificacaoPage() {
  const router = useRouter();
  
  // Dados simulados do colaborador
  const [userStats] = useState({
    pontosAtuais: 1250,
    nivel: 'Ouro',
    obrasCompletas: 47,
    avaliacaoMedia: 4.8,
    proximoNivel: 2000,
    bonusAcumulado: 850.00
  });

  const niveis = [
    { nome: 'Bronze', minPontos: 0, bonus: '2%', cor: 'from-orange-400 to-orange-600' },
    { nome: 'Prata', minPontos: 500, bonus: '5%', cor: 'from-gray-300 to-gray-500' },
    { nome: 'Ouro', minPontos: 1000, bonus: '10%', cor: 'from-yellow-400 to-yellow-600' },
    { nome: 'Platina', minPontos: 2000, bonus: '15%', cor: 'from-blue-300 to-blue-500' },
    { nome: 'Diamante', minPontos: 5000, bonus: '20%', cor: 'from-purple-400 to-purple-600' }
  ];

  const conquistas = [
    { id: 1, titulo: 'Primeira Obra', descricao: 'Complete sua primeira obra', pontos: 50, conquistado: true },
    { id: 2, titulo: '10 Obras', descricao: 'Complete 10 obras', pontos: 100, conquistado: true },
    { id: 3, titulo: '50 Obras', descricao: 'Complete 50 obras', pontos: 250, conquistado: false },
    { id: 4, titulo: 'Avaliação 5 Estrelas', descricao: 'Receba 10 avaliações 5 estrelas', pontos: 150, conquistado: true },
    { id: 5, titulo: 'Pontualidade', descricao: 'Complete 20 obras no prazo', pontos: 200, conquistado: true },
    { id: 6, titulo: 'Cliente Satisfeito', descricao: 'Mantenha média 4.5+ em 30 obras', pontos: 300, conquistado: false }
  ];

  const recompensas = [
    { id: 1, titulo: 'Vale Combustível R$ 50', pontos: 500, disponivel: true },
    { id: 2, titulo: 'Kit Ferramentas Premium', pontos: 1000, disponivel: true },
    { id: 3, titulo: 'Curso Avançado Grátis', pontos: 800, disponivel: true },
    { id: 4, titulo: 'Bônus R$ 100 em Dinheiro', pontos: 1500, disponivel: false },
    { id: 5, titulo: 'Destaque no App (1 mês)', pontos: 1200, disponivel: true },
    { id: 6, titulo: 'Certificado Profissional', pontos: 2000, disponivel: false }
  ];

  const progressoNivel = (userStats.pontosAtuais / userStats.proximoNivel) * 100;

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
              <h1 className="text-xl font-bold text-white">Sistema de Bonificação</h1>
              <p className="text-xs text-amber-100">Ganhe pontos e recompensas</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Card */}
        <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900">Seu Nível: {userStats.nivel}</CardTitle>
                <CardDescription className="text-lg">
                  {userStats.pontosAtuais} pontos acumulados
                </CardDescription>
              </div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Progresso para Platina</span>
                <span className="font-bold text-yellow-700">{userStats.pontosAtuais}/{userStats.proximoNivel}</span>
              </div>
              <Progress value={progressoNivel} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                <div className="text-2xl font-bold text-amber-900">{userStats.obrasCompletas}</div>
                <div className="text-xs text-gray-600">Obras Completas</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                <div className="text-2xl font-bold text-amber-900">{userStats.avaliacaoMedia}</div>
                <div className="text-xs text-gray-600">Avaliação Média</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                <div className="text-2xl font-bold text-green-600">R$ {userStats.bonusAcumulado.toFixed(2)}</div>
                <div className="text-xs text-gray-600">Bônus Acumulado</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                <div className="text-2xl font-bold text-blue-600">{userStats.pontosAtuais}</div>
                <div className="text-xs text-gray-600">Pontos Totais</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Níveis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Níveis de Bonificação</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {niveis.map((nivel) => (
              <Card 
                key={nivel.nome}
                className={`border-2 ${userStats.nivel === nivel.nome ? 'border-yellow-400 shadow-xl' : 'border-amber-200'}`}
              >
                <CardHeader className="text-center pb-3">
                  <div className={`mx-auto mb-2 w-16 h-16 rounded-full bg-gradient-to-br ${nivel.cor} flex items-center justify-center shadow-lg`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{nivel.nome}</CardTitle>
                  {userStats.nivel === nivel.nome && (
                    <Badge className="bg-yellow-500 text-white">Atual</Badge>
                  )}
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-sm text-gray-600">{nivel.minPontos}+ pontos</div>
                  <div className="text-lg font-bold text-green-600">+{nivel.bonus} bônus</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Conquistas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conquistas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {conquistas.map((conquista) => (
              <Card 
                key={conquista.id}
                className={`border-2 ${conquista.conquistado ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {conquista.conquistado ? (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <Star className="w-5 h-5 text-gray-400" />
                        )}
                        {conquista.titulo}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {conquista.descricao}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className={conquista.conquistado ? 'bg-green-600' : 'bg-gray-400'}>
                    +{conquista.pontos} pontos
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recompensas */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resgatar Recompensas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recompensas.map((recompensa) => (
              <Card 
                key={recompensa.id}
                className={`border-2 ${recompensa.disponivel ? 'border-purple-400' : 'border-gray-300'}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Gift className={`w-5 h-5 ${recompensa.disponivel ? 'text-purple-600' : 'text-gray-400'}`} />
                        {recompensa.titulo}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={recompensa.disponivel ? 'bg-purple-600' : 'bg-gray-400'}>
                      {recompensa.pontos} pontos
                    </Badge>
                    {userStats.pontosAtuais >= recompensa.pontos && (
                      <Badge className="bg-green-500">Disponível</Badge>
                    )}
                  </div>
                  <Button 
                    className={`w-full ${
                      recompensa.disponivel && userStats.pontosAtuais >= recompensa.pontos
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!recompensa.disponivel || userStats.pontosAtuais < recompensa.pontos}
                  >
                    {userStats.pontosAtuais >= recompensa.pontos ? 'Resgatar' : 'Pontos Insuficientes'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Como Ganhar Pontos */}
        <Card className="mt-8 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              Como Ganhar Mais Pontos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Complete Obras</div>
                  <div className="text-sm text-gray-600">+50 pontos por obra concluída</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Avaliações 5 Estrelas</div>
                  <div className="text-sm text-gray-600">+25 pontos por avaliação</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Pontualidade</div>
                  <div className="text-sm text-gray-600">+30 pontos por obra no prazo</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Conquistas Especiais</div>
                  <div className="text-sm text-gray-600">Até +300 pontos</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
