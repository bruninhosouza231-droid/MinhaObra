'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, Award, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Course, CourseCategory } from '@/lib/types';

// Cursos disponíveis
const COURSES: Course[] = [
  {
    id: '1',
    title: 'Técnicas Avançadas de Pintura',
    description: 'Aprenda técnicas profissionais de pintura residencial e comercial, incluindo texturas, efeitos especiais e acabamentos premium.',
    category: 'pintura',
    duration: '4 semanas',
    level: 'intermediario',
    price: 0,
    instructor: 'João Silva',
    availableForPlans: ['premium', 'equipe']
  },
  {
    id: '2',
    title: 'Alvenaria Estrutural Completa',
    description: 'Domine os fundamentos e técnicas avançadas de alvenaria, desde fundações até acabamentos.',
    category: 'alvenaria',
    duration: '6 semanas',
    level: 'avancado',
    price: 0,
    instructor: 'Carlos Mendes',
    availableForPlans: ['premium', 'equipe']
  },
  {
    id: '3',
    title: 'Instalações Elétricas Residenciais',
    description: 'Aprenda a planejar e executar instalações elétricas seguras e eficientes em residências.',
    category: 'eletrica',
    duration: '5 semanas',
    level: 'intermediario',
    price: 0,
    instructor: 'Ana Paula',
    availableForPlans: ['premium', 'equipe']
  },
  {
    id: '4',
    title: 'Hidráulica e Sistemas de Água',
    description: 'Curso completo sobre instalações hidráulicas, sistemas de água quente e fria, e manutenção preventiva.',
    category: 'hidraulica',
    duration: '4 semanas',
    level: 'intermediario',
    price: 0,
    instructor: 'Roberto Lima',
    availableForPlans: ['premium', 'equipe']
  },
  {
    id: '5',
    title: 'Gestão de Obras e Orçamentos',
    description: 'Aprenda a gerenciar obras, fazer orçamentos precisos e negociar com clientes de forma profissional.',
    category: 'gestao',
    duration: '3 semanas',
    level: 'iniciante',
    price: 0,
    instructor: 'Mariana Costa',
    availableForPlans: ['premium', 'equipe']
  },
  {
    id: '6',
    title: 'Segurança no Trabalho em Obras',
    description: 'Normas de segurança, uso de EPIs e prevenção de acidentes em canteiros de obras.',
    category: 'seguranca',
    duration: '2 semanas',
    level: 'iniciante',
    price: 0,
    instructor: 'Pedro Santos',
    availableForPlans: ['premium', 'equipe']
  }
];

const CATEGORY_LABELS: Record<CourseCategory, string> = {
  pintura: 'Pintura',
  alvenaria: 'Alvenaria',
  eletrica: 'Elétrica',
  hidraulica: 'Hidráulica',
  gestao: 'Gestão',
  seguranca: 'Segurança'
};

const LEVEL_LABELS = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado'
};

const LEVEL_COLORS = {
  iniciante: 'bg-green-100 text-green-700',
  intermediario: 'bg-yellow-100 text-yellow-700',
  avancado: 'bg-red-100 text-red-700'
};

export default function CursosPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');

  const filteredCourses = selectedCategory === 'all' 
    ? COURSES 
    : COURSES.filter(course => course.category === selectedCategory);

  const handleEnrollCourse = (course: Course) => {
    alert(`Inscrição no curso "${course.title}" realizada! Funcionalidade completa em desenvolvimento.`);
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
              <h1 className="text-xl font-bold text-white">Cursos Profissionalizantes</h1>
              <p className="text-xs text-amber-100">Desenvolva suas habilidades</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-4">
            Aprenda novas profissões e técnicas
          </h2>
          <p className="text-lg text-gray-700">
            Cursos exclusivos para assinantes Premium e Equipe
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 hover:bg-amber-50'}
          >
            Todos
          </Button>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(key as CourseCategory)}
              className={selectedCategory === key ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 hover:bg-amber-50'}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="border-2 border-amber-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-amber-700 text-white">
                    {CATEGORY_LABELS[course.category]}
                  </Badge>
                  <Badge className={LEVEL_COLORS[course.level]}>
                    {LEVEL_LABELS[course.level]}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gray-900">{course.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>Instrutor: {course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>Disponível para: {course.availableForPlans.map(p => p === 'premium' ? 'Premium' : 'Equipe').join(', ')}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800 hover:to-orange-900"
                  onClick={() => handleEnrollCourse(course)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Começar Curso
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA for Free Plan Users */}
        <Card className="mt-12 max-w-3xl mx-auto border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-900">
              Quer acesso a todos os cursos?
            </CardTitle>
            <CardDescription className="text-lg text-gray-700">
              Faça upgrade para Premium ou Equipe e desenvolva suas habilidades profissionais
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              onClick={() => router.push('/planos')}
            >
              Ver Planos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
