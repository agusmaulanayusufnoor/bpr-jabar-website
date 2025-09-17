'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Star, Users, Building2, TrendingUp, Award, ArrowRight } from 'lucide-react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [useImageFallback, setUseImageFallback] = useState(false)

  const slides = [
    {
      title: "Solusi Keuangan Terpercaya untuk Masyarakat Jawa Barat",
      description: "PT BPR Jabar Perseroda hadir dengan layanan perbankan profesional dan terpercaya untuk mendukung perekonomian daerah.",
      image: "/images/hero/bank-1.jpg",
      fallback: "from-green-700 to-green-900",
      cta: "Ajukan Kredit Sekarang",
      ctaLink: "/pengajuan"
    },
    {
      title: "Dukung UMKM dengan Modal Kerja Mudah",
      description: "Kami menyediakan berbagai produk pembiayaan untuk membantu pengembangan Usaha Mikro, Kecil, dan Menengah.",
      image: "/images/hero/umkm-1.jpg",
      fallback: "from-blue-700 to-green-800",
      cta: "Pelajari Lebih Lanjut",
      ctaLink: "/layanan"
    },
    {
      title: "Tabungan dan Deposito dengan Bunga Kompetitif",
      description: "Nikmati bunga menarik untuk tabungan dan deposito Anda dengan keamanan terjamin LPS.",
      image: "/images/hero/saving-1.jpg",
      fallback: "from-emerald-700 to-teal-800",
      cta: "Hitung Simulasi",
      ctaLink: "/simulasi"
    }
  ]

  const layananUtama = [
    {
      icon: Building2,
      title: "Tabungan",
      description: "Berbagai produk tabungan dengan bunga kompetitif dan fasilitas lengkap",
      features: ["Tabungan Sip", "Tabungan Berjangka", "Tabungan Haji"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Deposito",
      description: "Deposito berjangka dengan suku bunga menarik dan keamanan terjamin",
      features: ["Deposito Berjangka", "Deposito On-Call", "Dijamin LPS"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "Kredit",
      description: "Pembiayaan untuk berbagai kebutuhan dengan proses cepat dan mudah",
      features: ["Kredit Modal Kerja", "Kredit Investasi", "Kredit Multiguna"],
      color: "bg-purple-100 text-purple-600"
    }
  ]

  const keunggulan = [
    {
      icon: Award,
      title: "Terpercaya",
      description: "Bank Perkreditan Rakyat dengan reputasi terbaik di Jawa Barat"
    },
    {
      icon: Building2,
      title: "Profesional",
      description: "Layanan perbankan standar tinggi dengan tim yang berpengalaman"
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Fokus pada kepuasan nasabah dengan layanan personal"
    },
    {
      icon: TrendingUp,
      title: "Inovatif",
      description: "Terus berinovasi dalam produk dan layanan digital"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleImageError = () => {
    setUseImageFallback(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              
              {/* Try to load image, fallback to gradient if not available */}
              {useImageFallback ? (
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.fallback}`} />
              ) : (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                  onError={handleImageError}
                />
              )}
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4">
                <Star className="w-4 h-4 mr-1" />
                Bank Terpercaya
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link href={slides[currentSlide].ctaLink}>
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              {/* Image status indicator */}
              {useImageFallback && (
                <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-200">
                    ⚠️ Images sedang dalam proses upload. Menggunakan placeholder sementara.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Layanan Utama Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Utama Kami</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              PT BPR Jabar Perseroda menyediakan berbagai produk dan layanan perbankan 
              untuk memenuhi kebutuhan masyarakat Jawa Barat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {layananUtama.map((layanan, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg ${layanan.color} flex items-center justify-center mb-4`}>
                    <layanan.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl">{layanan.title}</CardTitle>
                  <CardDescription className="text-base">
                    {layanan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {layanan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Pelajari Lebih Lanjut
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Memilih Kami</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              PT BPR Jabar Perseroda berkomitmen untuk memberikan layanan terbaik 
              dengan standar profesionalisme tinggi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keunggulan.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memulai Perjalanan Keuangan Anda?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan temukan solusi keuangan 
            yang tepat untuk kebutuhan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/pengajuan">
                Ajukan Kredit Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/kontak">
                Hubungi Kami
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}