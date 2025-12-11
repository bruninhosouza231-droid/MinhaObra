'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Heart, Share2, Filter, Image as ImageIcon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type MediaCategory = 'all' | 'obras' | 'equipe' | 'depoimentos' | 'antes-depois';

export default function GaleriaPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>('all');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const videos = [
    {
      id: 'v1',
      title: 'Transformação Completa de Apartamento',
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=450&fit=crop',
      duration: '3:45',
      category: 'obras',
      views: '12.5k',
      likes: 342
    },
    {
      id: 'v2',
      title: 'Nossa Equipe em Ação - Construção Residencial',
      thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=450&fit=crop',
      duration: '5:20',
      category: 'equipe',
      views: '8.3k',
      likes: 256
    },
    {
      id: 'v3',
      title: 'Depoimento Cliente Satisfeito - Reforma Completa',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop',
      duration: '2:15',
      category: 'depoimentos',
      views: '15.2k',
      likes: 489
    },
    {
      id: 'v4',
      title: 'Antes e Depois - Cozinha Moderna',
      thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=450&fit=crop',
      duration: '4:10',
      category: 'antes-depois',
      views: '22.1k',
      likes: 678
    },
    {
      id: 'v5',
      title: 'Pintura Profissional - Técnicas Avançadas',
      thumbnail: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=450&fit=crop',
      duration: '6:30',
      category: 'obras',
      views: '9.7k',
      likes: 312
    },
    {
      id: 'v6',
      title: 'Time de Especialistas - Conheça Nossa Equipe',
      thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=450&fit=crop',
      duration: '3:00',
      category: 'equipe',
      views: '6.8k',
      likes: 198
    }
  ];

  const images = [
    {
      id: 'i1',
      url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
      title: 'Sala de Estar Moderna',
      category: 'obras',
      likes: 234
    },
    {
      id: 'i2',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      title: 'Fachada Residencial',
      category: 'obras',
      likes: 189
    },
    {
      id: 'i3',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
      title: 'Quarto Planejado',
      category: 'obras',
      likes: 312
    },
    {
      id: 'i4',
      url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
      title: 'Cozinha Gourmet',
      category: 'obras',
      likes: 445
    },
    {
      id: 'i5',
      url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop',
      title: 'Equipe Profissional',
      category: 'equipe',
      likes: 167
    },
    {
      id: 'i6',
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
      title: 'Colaboradores Felizes',
      category: 'equipe',
      likes: 223
    },
    {
      id: 'i7',
      url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=400&fit=crop',
      title: 'Banheiro Luxuoso - Antes',
      category: 'antes-depois',
      likes: 389
    },
    {
      id: 'i8',
      url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=400&fit=crop',
      title: 'Banheiro Luxuoso - Depois',
      category: 'antes-depois',
      likes: 512
    },
    {
      id: 'i9',
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop',
      title: 'Área Externa Completa',
      category: 'obras',
      likes: 278
    }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(i => i.category === selectedCategory);

  const handleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Confira: ${title}`,
        url: window.location.href
      });
    } else {
      alert('Link copiado para área de transferência!');
    }
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
              <h1 className="text-xl font-bold text-white">Galeria e Vídeos</h1>
              <p className="text-xs text-amber-100">Conheça nossos serviços em ação</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-900 to-orange-800 bg-clip-text text-transparent mb-4">
            Veja nossos trabalhos e depoimentos
          </h2>
          <p className="text-lg text-gray-700">
            Obras reais, equipe profissional e clientes satisfeitos
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 hover:bg-amber-50'}
          >
            <Filter className="w-4 h-4 mr-2" />
            Todos
          </Button>
          <Button
            variant={selectedCategory === 'obras' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('obras')}
            className={selectedCategory === 'obras' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 hover:bg-amber-50'}
          >
            Obras Concluídas
          </Button>
          <Button
            variant={selectedCategory === 'equipe' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('equipe')}
            className={selectedCategory === 'equipe' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 hover:bg-amber-50'}
          >
            Nossa Equipe
          </Button>
          <Button
            variant={selectedCategory === 'depoimentos' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('depoimentos')}
            className={selectedCategory === 'depoimentos' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 hover:bg-amber-50'}
          >
            Depoimentos
          </Button>
          <Button
            variant={selectedCategory === 'antes-depois' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('antes-depois')}
            className={selectedCategory === 'antes-depois' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 hover:bg-amber-50'}
          >
            Antes e Depois
          </Button>
        </div>

        {/* Videos Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Video className="w-6 h-6 text-amber-900" />
            <h3 className="text-2xl font-bold text-gray-900">Vídeos</h3>
            <Badge className="bg-red-500 text-white ml-2">{filteredVideos.length}</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="border-2 border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-8 h-8 text-red-600 ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-900 line-clamp-2">{video.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span>{video.views} visualizações</span>
                    <span>•</span>
                    <span>{video.likes} curtidas</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 ${likedItems.has(video.id) ? 'bg-red-50 border-red-300' : 'border-amber-300'}`}
                      onClick={() => handleLike(video.id)}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${likedItems.has(video.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      Curtir
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-amber-300"
                      onClick={() => handleShare(video.title)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Images Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="w-6 h-6 text-amber-900" />
            <h3 className="text-2xl font-bold text-gray-900">Fotos</h3>
            <Badge className="bg-blue-500 text-white ml-2">{filteredImages.length}</Badge>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <Card key={image.id} className="border-2 border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-semibold mb-2">{image.title}</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className={`flex-1 ${likedItems.has(image.id) ? 'bg-red-500 hover:bg-red-600' : ''}`}
                          onClick={() => handleLike(image.id)}
                        >
                          <Heart className={`w-4 h-4 ${likedItems.has(image.id) ? 'fill-white text-white' : ''}`} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleShare(image.title)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Download App */}
        <Card className="mt-12 max-w-3xl mx-auto border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-900">
              Baixe nosso app e tenha acesso a mais conteúdos
            </CardTitle>
            <CardDescription className="text-lg text-gray-700">
              Vídeos exclusivos, tutoriais e muito mais no aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              onClick={() => router.push('/mobile')}
            >
              Baixar Aplicativo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
