'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Newspaper, 
  Search, 
  Filter,
  Calendar,
  User,
  Tag,
  Share2,
  Heart,
  Eye,
  ArrowRight,
  Clock
} from 'lucide-react'
import beritaData from '@/json/berita.json'

export default function BeritaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterKategori, setFilterKategori] = useState('semua')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const filterBerita = (beritaList: any[]) => {
    return beritaList.filter(berita => {
      const matchesSearch = berita.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          berita.ringkasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          berita.tag.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesKategori = filterKategori === 'semua' || berita.kategori === filterKategori
      
      return matchesSearch && matchesKategori
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'Penghargaan':
        return 'bg-yellow-100 text-yellow-600'
      case 'Program':
        return 'bg-blue-100 text-blue-600'
      case 'Inovasi':
        return 'bg-green-100 text-green-600'
      case 'Kerjasama':
        return 'bg-purple-100 text-purple-600'
      case 'Transformasi Digital':
        return 'bg-indigo-100 text-indigo-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const filteredBerita = filterBerita(beritaData.berita)
  const totalPages = Math.ceil(filteredBerita.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentBerita = filteredBerita.slice(startIndex, startIndex + postsPerPage)

  const kategoriList = ['semua', ...new Set(beritaData.berita.map(b => b.kategori))]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-primary/80">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4">
                <Newspaper className="w-4 h-4 mr-1" />
                Berita & Artikel
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Berita & Artikel
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Dapatkan informasi terkini seputar PT BPR Jabar Perseroda, 
                program terbaru, dan artikel menarik seputar dunia perbankan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari berita atau artikel..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterKategori} onValueChange={setFilterKategori}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter kategori" />
                </SelectTrigger>
                <SelectContent>
                  {kategoriList.map((kategori) => (
                    <SelectItem key={kategori} value={kategori}>
                      {kategori === 'semua' ? 'Semua Kategori' : kategori}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Featured News */}
            {currentBerita.length > 0 && currentPage === 1 && (
              <Card className="mb-12 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={currentBerita[0].gambar}
                        alt={currentBerita[0].judul}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className={`mb-2 ${getKategoriColor(currentBerita[0].kategori)}`}>
                          {currentBerita[0].kategori}
                        </Badge>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {currentBerita[0].judul}
                        </h2>
                        <p className="text-white/80 text-sm mb-3">
                          {currentBerita[0].ringkasan}
                        </p>
                        <div className="flex items-center space-x-4 text-white/70 text-xs">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(currentBerita[0].tanggal)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{currentBerita[0].penulis}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Berita Terkini</h3>
                      <Button variant="outline" size="sm">
                        Lihat Semua
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {currentBerita.slice(1, 4).map((berita, index) => (
                        <div key={berita.id} className="flex space-x-3">
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 relative">
                            <Image
                              src={berita.gambar}
                              alt={berita.judul}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <Badge variant="outline" className={`text-xs mb-1 ${getKategoriColor(berita.kategori)}`}>
                              {berita.kategori}
                            </Badge>
                            <h4 className="font-medium text-sm mb-1 line-clamp-2">
                              <Link href={`/berita/${berita.slug}`} className="hover:text-primary">
                                {berita.judul}
                              </Link>
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(berita.tanggal)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* News Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(currentPage === 1 ? currentBerita.slice(4) : currentBerita).map((berita) => (
                <Card key={berita.id} className="hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={berita.gambar}
                      alt={berita.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getKategoriColor(berita.kategori)}>
                        {berita.kategori}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(berita.tanggal)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{berita.penulis}</span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/berita/${berita.slug}`}>
                        {berita.judul}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {berita.ringkasan}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          <span>1.2K</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/berita/${berita.slug}`}>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {berita.tag.slice(0, 3).map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredBerita.length === 0 && (
              <Card className="mt-8">
                <CardContent className="p-12 text-center">
                  <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tidak ada berita ditemukan</h3>
                  <p className="text-muted-foreground">
                    Tidak ada berita atau artikel yang sesuai dengan kriteria pencarian Anda.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10 h-10"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Berlangganan Newsletter
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Dapatkan berita terbaru dan informasi penting langsung di email Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Email Anda" className="flex-1" />
              <Button>Berlangganan</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}