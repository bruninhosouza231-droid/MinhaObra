'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, Hammer, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveCurrentUser, saveUser, getUsers } from '@/lib/storage';
import { UserType, PlanType, PaymentFrequency, WorkType, WORK_TYPES_LABELS } from '@/lib/types';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as UserType | null;
  
  const [userType, setUserType] = useState<UserType>(typeParam || 'cliente');
  const [isLogin, setIsLogin] = useState(true);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<PlanType>('gratis');
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('semanal');
  const [specialties, setSpecialties] = useState<WorkType[]>([]);

  useEffect(() => {
    if (typeParam) {
      setUserType(typeParam);
    }
  }, [typeParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      const users = getUsers();
      const user = users.find(u => u.email === email && u.type === userType);
      
      if (user) {
        saveCurrentUser(user);
        if (userType === 'cliente') {
          router.push('/cliente/dashboard');
        } else {
          router.push('/colaborador/dashboard');
        }
      } else {
        alert('Usuário não encontrado. Por favor, cadastre-se primeiro.');
      }
    } else {
      // Register logic
      const newUser: any = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        type: userType,
        plan,
        createdAt: new Date().toISOString(),
      };

      if (userType === 'colaborador') {
        newUser.specialties = specialties;
        newUser.paymentFrequency = paymentFrequency;
        newUser.rating = 0;
        newUser.completedWorks = 0;
        newUser.bonusEligible = true;
      } else {
        newUser.activeWorks = 0;
      }

      saveUser(newUser);
      saveCurrentUser(newUser);

      if (userType === 'cliente') {
        router.push('/cliente/dashboard');
      } else {
        router.push('/colaborador/dashboard');
      }
    }
  };

  const toggleSpecialty = (specialty: WorkType) => {
    setSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-4 text-amber-900 hover:text-amber-950 hover:bg-amber-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e595761a-bf3a-4ce6-a456-52fd54a93474.png" 
              alt="Minha Obra" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent">Minha Obra</h1>
          <p className="text-gray-700 mt-2">
            {userType === 'cliente' ? 'Área do Cliente' : 'Área do Colaborador'}
          </p>
        </div>

        <Card className="border-2 border-amber-200 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              {userType === 'cliente' ? (
                <Building2 className="w-8 h-8 text-blue-600" />
              ) : (
                <Hammer className="w-8 h-8 text-orange-700" />
              )}
            </div>
            <CardTitle className="text-center text-gray-900">
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {isLogin 
                ? 'Acesse sua conta para continuar' 
                : 'Preencha os dados para começar'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(v) => setUserType(v as UserType)} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 bg-amber-100">
                <TabsTrigger value="cliente" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Cliente</TabsTrigger>
                <TabsTrigger value="colaborador" className="data-[state=active]:bg-orange-700 data-[state=active]:text-white">Colaborador</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-900">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-amber-700" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="plan" className="text-gray-900">Plano</Label>
                    <Select value={plan} onValueChange={(v) => setPlan(v as PlanType)}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gratis">Grátis (5% comissão)</SelectItem>
                        <SelectItem value="premium">Premium (10% comissão)</SelectItem>
                        <SelectItem value="equipe">Equipe (15% comissão)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {userType === 'colaborador' && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-gray-900">Especialidades</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {(Object.keys(WORK_TYPES_LABELS) as WorkType[]).map((type) => (
                            <Button
                              key={type}
                              type="button"
                              variant={specialties.includes(type) ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => toggleSpecialty(type)}
                              className={`text-xs ${specialties.includes(type) ? 'bg-orange-700 hover:bg-orange-800' : 'border-amber-200 hover:bg-amber-50'}`}
                            >
                              {WORK_TYPES_LABELS[type]}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="payment" className="text-gray-900">Frequência de Pagamento</Label>
                        <Select value={paymentFrequency} onValueChange={(v) => setPaymentFrequency(v as PaymentFrequency)}>
                          <SelectTrigger className="border-amber-200 focus:border-amber-500 focus:ring-amber-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="semanal">Semanal (toda sexta-feira)</SelectItem>
                            <SelectItem value="quinzenal">Quinzenal (15 em 15 dias)</SelectItem>
                            <SelectItem value="mensal">Mensal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </>
              )}

              <Button 
                type="submit" 
                className={`w-full shadow-lg ${userType === 'cliente' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800'}`}
              >
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-amber-900 hover:text-amber-950 underline font-medium"
              >
                {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entrar'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <LoginContent />
    </Suspense>
  );
}
