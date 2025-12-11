'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Star, MapPin, Phone, Mail, User, Briefcase, Camera, CheckCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const especialidades = [
  'Limpeza Geral',
  'Limpeza Pós-Obra',
  'Limpeza Pesada',
  'Passadeira',
  'Cozinha',
  'Organização',
  'Lavanderia',
  'Jardinagem'
];

const diasDisponiveis = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
];

export default function CadastroDiaristaPage() {
  const router = useRouter();
  const [etapa, setEtapa] = useState(1);
  const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState<string[]>([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [fotosPortfolio, setFotosPortfolio] = useState<string[]>([]);

  const toggleEspecialidade = (esp: string) => {
    setEspecialidadesSelecionadas(prev =>
      prev.includes(esp) ? prev.filter(e => e !== esp) : [...prev, esp]
    );
  };

  const toggleDia = (dia: string) => {
    setDiasSelecionados(prev =>
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    );
  };

  const handleSubmit = () => {
    // Aqui você implementaria a lógica de cadastro
    alert('Cadastro realizado com sucesso! Aguarde aprovação.');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header */}
      <header className="border-b border-purple-200 bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/limpeza')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Cadastro de Diarista</h1>
              <p className="text-xs text-purple-100">Etapa {etapa} de 3</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso</span>
            <span className="text-sm font-medium text-purple-600">{Math.round((etapa / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(etapa / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Etapa 1: Dados Pessoais */}
          {etapa === 1 && (
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center text-gray-900">Dados Pessoais</CardTitle>
                <CardDescription className="text-center">Preencha suas informações básicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input id="nome" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input id="telefone" placeholder="(00) 00000-0000" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input id="endereco" placeholder="Rua, número, bairro, cidade - UF" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experiencia">Anos de Experiência *</Label>
                  <Input id="experiencia" type="number" placeholder="Ex: 5" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sobre">Sobre Você</Label>
                  <Textarea 
                    id="sobre" 
                    placeholder="Conte um pouco sobre sua experiência e diferenciais..."
                    rows={4}
                  />
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => setEtapa(2)}
                >
                  Próxima Etapa
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Etapa 2: Especialidades e Disponibilidade */}
          {etapa === 2 && (
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center text-gray-900">Especialidades e Disponibilidade</CardTitle>
                <CardDescription className="text-center">Selecione suas áreas de atuação e horários</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Especialidades * (selecione pelo menos 2)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {especialidades.map((esp) => (
                      <Button
                        key={esp}
                        variant={especialidadesSelecionadas.includes(esp) ? "default" : "outline"}
                        className={`justify-start ${
                          especialidadesSelecionadas.includes(esp)
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'border-purple-300 hover:bg-purple-50'
                        }`}
                        onClick={() => toggleEspecialidade(esp)}
                      >
                        {especialidadesSelecionadas.includes(esp) && (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        {esp}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Dias Disponíveis * (selecione pelo menos 3)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {diasDisponiveis.map((dia) => (
                      <Button
                        key={dia}
                        variant={diasSelecionados.includes(dia) ? "default" : "outline"}
                        className={`justify-start ${
                          diasSelecionados.includes(dia)
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'border-purple-300 hover:bg-purple-50'
                        }`}
                        onClick={() => toggleDia(dia)}
                      >
                        {diasSelecionados.includes(dia) && (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        {dia}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="horario-inicio">Horário de Início</Label>
                    <Input id="horario-inicio" type="time" defaultValue="08:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="horario-fim">Horário de Término</Label>
                    <Input id="horario-fim" type="time" defaultValue="18:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor-hora">Valor por Hora (R$) *</Label>
                  <Input id="valor-hora" type="number" placeholder="Ex: 35" />
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="flex-1 border-purple-300"
                    onClick={() => setEtapa(1)}
                  >
                    Voltar
                  </Button>
                  <Button 
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => setEtapa(3)}
                  >
                    Próxima Etapa
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 3: Portfólio e Documentos */}
          {etapa === 3 && (
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center text-gray-900">Portfólio e Documentos</CardTitle>
                <CardDescription className="text-center">Mostre seu trabalho e envie documentos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Fotos do Portfólio (opcional)</Label>
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-2">
                      Clique para adicionar fotos dos seus trabalhos
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG até 5MB cada (máximo 10 fotos)
                    </p>
                  </div>
                  {fotosPortfolio.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {fotosPortfolio.map((foto, idx) => (
                        <div key={idx} className="aspect-square bg-gray-100 rounded-lg" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Documentos Necessários *</Label>
                  <div className="space-y-3">
                    <div className="border border-purple-200 rounded-lg p-4 hover:border-purple-400 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Upload className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">RG ou CNH</p>
                            <p className="text-xs text-gray-500">Documento com foto</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-purple-300">Obrigatório</Badge>
                      </div>
                    </div>

                    <div className="border border-purple-200 rounded-lg p-4 hover:border-purple-400 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Upload className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Comprovante de Residência</p>
                            <p className="text-xs text-gray-500">Últimos 3 meses</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-purple-300">Obrigatório</Badge>
                      </div>
                    </div>

                    <div className="border border-purple-200 rounded-lg p-4 hover:border-purple-400 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Upload className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Certificados</p>
                            <p className="text-xs text-gray-500">Cursos e treinamentos</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-green-300">Opcional</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-1">Processo de Aprovação</h4>
                      <p className="text-sm text-purple-700">
                        Após o envio, nossa equipe analisará seu cadastro em até 48 horas. 
                        Você receberá um e-mail com o resultado da análise.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="flex-1 border-purple-300"
                    onClick={() => setEtapa(2)}
                  >
                    Voltar
                  </Button>
                  <Button 
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={handleSubmit}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Finalizar Cadastro
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefícios */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Avaliações</h3>
                <p className="text-sm text-gray-600">Construa sua reputação</p>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Pagamento Garantido</h3>
                <p className="text-sm text-gray-600">Receba em dia sempre</p>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Flexibilidade</h3>
                <p className="text-sm text-gray-600">Escolha seus horários</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-200 bg-gradient-to-r from-purple-600 to-pink-600 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-purple-100">
          <p className="text-sm">© 2024 Minha Obra - Cadastro de Diaristas</p>
        </div>
      </footer>
    </div>
  );
}
