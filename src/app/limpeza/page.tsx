'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Home, Building, Truck, Shirt, Users, Star, Clock, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const servicosLimpeza = [
  {
    id: 'geral',
    nome: 'Limpeza Geral',
    descricao: 'Limpeza completa de residências e escritórios',
    icon: Home,
    preco: 'A partir de R$ 120',
    duracao: '3-4 horas',
    inclui: ['Todos os cômodos', 'Banheiros', 'Cozinha', 'Áreas comuns'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'pos-obra',
    nome: 'Limpeza Pós-Obra',
    descricao: 'Remoção de resíduos e limpeza profunda após reformas',
    icon: Building,
    preco: 'A partir de R$ 350',
    duracao: '6-8 horas',
    inclui: ['Remoção de entulho', 'Limpeza de janelas', 'Polimento de pisos', 'Limpeza profunda'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'pesada',
    nome: 'Limpeza Pesada',
    descricao: 'Limpeza intensiva para ambientes muito sujos',
    icon: Truck,
    preco: 'A partir de R$ 280',
    duracao: '5-6 horas',
    inclui: ['Limpeza profunda', 'Desinfecção completa', 'Remoção de manchas', 'Tratamento especial'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'passadeira',
    nome: 'Serviço de Passadeira',
    descricao: 'Passar e organizar roupas com cuidado profissional',
    icon: Shirt,
    preco: 'A partir de R$ 80',
    duracao: '2-3 horas',
    inclui: ['Passar roupas', 'Dobrar e organizar', 'Cuidado especial', 'Entrega organizada'],
    color: 'from-green-500 to-emerald-500'
  }
];

const tiposEquipe = [
  {
    tipo: 'Diarista Individual',
    descricao: 'Profissional autônomo para serviços regulares',
    ideal: 'Residências pequenas e médias',
    badge: 'Econômico'
  },
  {
    tipo: 'Equipe Especializada',
    descricao: 'Time completo com equipamentos profissionais',
    ideal: 'Grandes projetos e limpezas complexas',
    badge: 'Profissional'
  }
];

export default function LimpezaPage() {
  const router = useRouter();
  const [servicoSelecionado, setServicoSelecionado] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-cyan-200 bg-gradient-to-r from-cyan-600 to-blue-600 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Serviços de Limpeza</h1>
                <p className="text-xs text-cyan-100">Profissionais qualificados para sua necessidade</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Limpeza Profissional com Qualidade Garantida
          </h2>
          <p className="text-lg text-gray-700">
            Diaristas e equipes especializadas prontas para atender suas necessidades
          </p>
        </div>

        {/* Benefícios */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          <Card className="text-center border-2 border-cyan-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Profissionais Verificados</h3>
              <p className="text-sm text-gray-600">Todos com documentação e referências</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-cyan-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Seguro e Garantido</h3>
              <p className="text-sm text-gray-600">Proteção total para você e sua casa</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-cyan-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Pontualidade</h3>
              <p className="text-sm text-gray-600">Horários flexíveis e cumprimento garantido</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-cyan-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Avaliações Reais</h3>
              <p className="text-sm text-gray-600">Sistema de feedback transparente</p>
            </CardContent>
          </Card>
        </div>

        {/* Serviços de Limpeza */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Nossos Serviços</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {servicosLimpeza.map((servico) => {
              const Icon = servico.icon;
              return (
                <Card 
                  key={servico.id}
                  className={`border-2 hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                    servicoSelecionado === servico.id ? 'border-cyan-500 ring-2 ring-cyan-200' : 'border-cyan-200'
                  }`}
                  onClick={() => setServicoSelecionado(servico.id)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${servico.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{servico.nome}</CardTitle>
                    <CardDescription className="text-gray-600">{servico.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-cyan-600">{servico.preco}</span>
                        <Badge variant="outline" className="border-cyan-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {servico.duracao}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Inclui:</p>
                        <ul className="space-y-1">
                          {servico.inclui.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        className={`w-full bg-gradient-to-r ${servico.color} text-white hover:opacity-90 shadow-lg`}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/auth/login?servico=${servico.id}`);
                        }}
                      >
                        Solicitar Serviço
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tipos de Equipe */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Escolha o Tipo de Profissional</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tiposEquipe.map((equipe, idx) => (
              <Card key={idx} className="border-2 border-cyan-200 hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl text-gray-900">{equipe.tipo}</CardTitle>
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      {equipe.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">{equipe.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-cyan-50 rounded-lg">
                      <p className="text-sm font-semibold text-cyan-900 mb-1">Ideal para:</p>
                      <p className="text-sm text-cyan-700">{equipe.ideal}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-cyan-300 hover:bg-cyan-50"
                      onClick={() => router.push('/auth/login')}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Contratar {equipe.tipo}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA para Diaristas */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Você é Diarista ou Profissional de Limpeza?</CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Cadastre-se e encontre oportunidades de trabalho na sua região
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-2">✓ Benefícios</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Receba solicitações diárias</li>
                      <li>• Escolha seus horários</li>
                      <li>• Pagamento garantido</li>
                      <li>• Sistema de avaliações</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-2">✓ Portfólio Digital</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Mostre seu trabalho</li>
                      <li>• Receba avaliações</li>
                      <li>• Construa reputação</li>
                      <li>• Ganhe mais clientes</li>
                    </ul>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                  onClick={() => router.push('/diarista/cadastro')}
                >
                  Cadastrar como Diarista
                  <Star className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-200 bg-gradient-to-r from-cyan-600 to-blue-600 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-cyan-100">
          <p className="text-sm">© 2024 Minha Obra - Serviços de Limpeza Profissional</p>
        </div>
      </footer>
    </div>
  );
}
