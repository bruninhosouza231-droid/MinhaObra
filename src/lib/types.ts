// Tipos do aplicativo Minha Obra

export type UserType = 'cliente' | 'colaborador';

export type PlanType = 'gratis' | 'premium' | 'equipe';

export type PaymentFrequency = 'semanal' | 'quinzenal' | 'mensal';

export type WorkType = 
  | 'pintura' 
  | 'alvenaria' 
  | 'eletrica' 
  | 'hidraulica' 
  | 'acabamento'
  | 'limpeza-comercial'
  | 'limpeza-padrao'
  | 'limpeza-pesada'
  | 'limpeza-pre-mudanca'
  | 'limpeza-pos-obra'
  | 'outros';

export type WorkStatus = 'pendente' | 'em-andamento' | 'concluido' | 'cancelado';

export type CourseCategory = 'pintura' | 'alvenaria' | 'eletrica' | 'hidraulica' | 'gestao' | 'seguranca';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  plan: PlanType;
  createdAt: string;
  avatar?: string;
  worksThisMonth?: number; // Para controle do limite do plano grátis
}

export interface Colaborador extends User {
  type: 'colaborador';
  specialties: WorkType[];
  paymentFrequency: PaymentFrequency;
  rating: number;
  completedWorks: number;
  bonusEligible: boolean;
  portfolio?: PortfolioItem[];
  albums?: Album[];
  completedCourses?: string[];
}

export interface Cliente extends User {
  type: 'cliente';
  activeWorks: number;
  completedCourses?: string[];
}

export interface Work {
  id: string;
  clientId: string;
  clientName: string;
  colaboradorId?: string;
  colaboradorName?: string;
  type: WorkType;
  title: string;
  description: string;
  status: WorkStatus;
  budget?: number;
  budgetNegotiable: boolean; // Nova propriedade para orçamento negociável
  address: string;
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  endDate?: string;
  proposals?: BudgetProposal[]; // Propostas de orçamento
}

export interface BudgetProposal {
  id: string;
  workId: string;
  colaboradorId: string;
  colaboradorName: string;
  amount: number;
  description: string;
  estimatedDays: number;
  createdAt: string;
  status: 'pendente' | 'aceita' | 'recusada';
}

export interface Message {
  id: string;
  workId: string;
  senderId: string;
  senderName: string;
  senderType: UserType;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  supplier: string;
  price: number;
  location: string;
  rating: number;
  description: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'work' | 'message' | 'payment' | 'bonus' | 'course';
  read: boolean;
  timestamp: string;
  workId?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  workType: WorkType;
  completedAt: string;
  clientRating?: number;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  items: PortfolioItem[];
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  duration: string; // Ex: "4 semanas"
  level: 'iniciante' | 'intermediario' | 'avancado';
  price: number;
  instructor: string;
  availableForPlans: PlanType[]; // Quais planos têm acesso
}

export interface PlanInfo {
  name: string;
  commission: number;
  maxWorksPerMonth: number | 'unlimited';
  features: string[];
  price: number; // Preço mensal em R$
}

export const PLANS: Record<PlanType, PlanInfo> = {
  gratis: {
    name: 'Plano Grátis',
    commission: 5,
    maxWorksPerMonth: 3,
    price: 0,
    features: [
      'Até 3 obras por mês',
      'Comissão de 5%',
      'Mensagens básicas',
      'Suporte por email'
    ]
  },
  premium: {
    name: 'Plano Premium',
    commission: 10,
    maxWorksPerMonth: 'unlimited',
    price: 49.90,
    features: [
      'Obras ilimitadas',
      'Comissão de 10%',
      'Suporte 24/7',
      'Criar álbuns e portfólios',
      'Acesso a cursos profissionalizantes',
      'Negociação de orçamentos',
      'Sem anúncios'
    ]
  },
  equipe: {
    name: 'Plano Equipe',
    commission: 15,
    maxWorksPerMonth: 'unlimited',
    price: 99.90,
    features: [
      'Tudo do Premium',
      'Comissão de 15%',
      'Gestão de equipe completa',
      'Álbuns e portfólios ilimitados',
      'Todos os cursos inclusos',
      'Relatórios avançados',
      'API de integração',
      'Gerente de conta dedicado'
    ]
  }
};

export const WORK_TYPES_LABELS: Record<WorkType, string> = {
  'pintura': 'Pintura',
  'alvenaria': 'Alvenaria',
  'eletrica': 'Elétrica',
  'hidraulica': 'Hidráulica',
  'acabamento': 'Acabamento',
  'limpeza-comercial': 'Limpeza Comercial',
  'limpeza-padrao': 'Limpeza Padrão',
  'limpeza-pesada': 'Limpeza Pesada',
  'limpeza-pre-mudanca': 'Limpeza Pré-Mudança',
  'limpeza-pos-obra': 'Limpeza Pós-Obra',
  'outros': 'Outros'
};
