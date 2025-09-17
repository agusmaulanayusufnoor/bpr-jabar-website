'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Eye, 
  Clock, 
  Calendar, 
  User,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  BookmarkPlus
} from 'lucide-react'
import beritaData from '@/json/berita.json'

export default function BeritaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const berita = beritaData.berita.find(b => b.slug === params.slug)
  const relatedBerita = beritaData.berita
    .filter(b => b.slug !== params.slug && b.kategori === berita?.kategori)
    .slice(0, 3)

  if (!berita) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">📭</div>
            <CardTitle>Artikel Tidak Ditemukan</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Maaf, artikel yang Anda cari tidak ditemukan.
            </p>
            <Button onClick={() => router.push('/berita')}>
              Kembali ke Berita
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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

  const shareLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={berita.gambar}
            alt={berita.judul}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-4">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
                <Badge className={getKategoriColor(berita.kategori)}>
                  {berita.kategori}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {berita.judul}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{berita.penulis}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(berita.tanggal)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>1.2K views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Article Content */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    {/* Article Meta */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsLiked(!isLiked)}
                          className={isLiked ? 'text-red-500' : ''}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                          {isLiked ? '234' : '233'}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          45
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsBookmarked(!isBookmarked)}
                          className={isBookmarked ? 'text-primary' : ''}
                        >
                          <BookmarkPlus className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Article Body */}
                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: berita.konten }}
                    />

                    {/* Tags */}
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Tag
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {berita.tag.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Share Section */}
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="font-semibold mb-3">Bagikan Artikel</h3>
                      <div className="flex space-x-2">
                        {shareLinks.map((link, index) => (
                          <Button key={index} variant="outline" size="sm" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              <link.icon className="w-4 h-4 mr-2" />
                              {link.name}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Author Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tentang Penulis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{berita.penulis}</h4>
                        <p className="text-sm text-muted-foreground">Tim Konten BPR Jabar</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Penulis berpengalaman dalam bidang perbankan dan keuangan, 
                      berkomitmen untuk menyajikan informasi yang akurat dan bermanfaat.
                    </p>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Artikel Terkait</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedBerita.map((related) => (
                      <div key={related.id} className="flex space-x-3">
                        <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 relative">
                          <Image
                            src={related.gambar}
                            alt={related.judul}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className={`text-xs mb-1 ${getKategoriColor(related.kategori)}`}>
                            {related.kategori}
                          </Badge>
                          <h4 className="font-medium text-sm mb-1 line-clamp-2">
                            <Link href={`/berita/${related.slug}`} className="hover:text-primary">
                              {related.judul}
                            </Link>
                          </h4>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(related.tanggal)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Newsletter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Dapatkan berita terbaru langsung di email Anda.
                    </p>
                    <Button className="w-full" size="sm">
                      Berlangganan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      {relatedBerita.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Artikel Terkait</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBerita.map((related) => (
                  <Card key={related.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={related.gambar}
                        alt={related.judul}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={getKategoriColor(related.kategori)}>
                          {related.kategori}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        <Link href={`/berita/${related.slug}`} className="hover:text-primary">
                          {related.judul}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {related.ringkasan}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(related.tanggal)}</span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/berita/${related.slug}`}>
                            Baca Selengkapnya
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}