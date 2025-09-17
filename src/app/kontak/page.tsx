'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  Building2,
  Users,
  Navigation,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    subjek: '',
    kategori: '',
    pesan: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulasi pengiriman form
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const kantorPusat = {
    nama: "Kantor Pusat",
    alamat: "Jl. Soekarno Hatta No. 578, Bandung",
    telepon: "(022) 7564123",
    fax: "(022) 7564124",
    email: "info@bprjabar.co.id",
    jamOperasional: "Senin - Jumat: 08:00 - 16:00 WIB",
    latitude: -6.9175,
    longitude: 107.6191
  }

  const layananNasabah = [
    {
      icon: Phone,
      title: "Call Center",
      description: "(022) 7564123",
      detail: "Senin - Jumat, 08:00 - 16:00 WIB"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "0812-3456-7890",
      detail: "Available 24/7 for quick responses"
    },
    {
      icon: Mail,
      title: "Email",
      description: "info@bprjabar.co.id",
      detail: "Response within 24 hours"
    }
  ]

  const socialMedia = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'bg-blue-600' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'bg-sky-500' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'bg-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'bg-blue-700' }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Pesan Terkirim!</CardTitle>
            <CardDescription>
              Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/'}>
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-primary/80">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4">
                <MessageCircle className="w-4 h-4 mr-1" />
                Hubungi Kami
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Hubungi Kami
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Kami siap membantu Anda. Hubungi kami untuk informasi, konsultasi, 
                atau pengajuan produk dan layanan kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Kirim Pesan</span>
                    </CardTitle>
                    <CardDescription>
                      Isi form di bawah ini dan kami akan segera merespons pesan Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="nama">Nama Lengkap *</Label>
                          <Input
                            id="nama"
                            required
                            value={formData.nama}
                            onChange={(e) => handleInputChange('nama', e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="telepon">No. Telepon</Label>
                          <Input
                            id="telepon"
                            placeholder="08xxxxxxxxxx"
                            value={formData.telepon}
                            onChange={(e) => handleInputChange('telepon', e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="kategori">Kategori</Label>
                          <Select
                            value={formData.kategori}
                            onValueChange={(value) => handleInputChange('kategori', value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="informasi">Informasi Umum</SelectItem>
                              <SelectItem value="produk">Produk & Layanan</SelectItem>
                              <SelectItem value="pengajuan">Pengajuan Kredit</SelectItem>
                              <SelectItem value="keluhan">Keluhan & Saran</SelectItem>
                              <SelectItem value="kerjasama">Kerjasama</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subjek">Subjek *</Label>
                        <Input
                          id="subjek"
                          required
                          value={formData.subjek}
                          onChange={(e) => handleInputChange('subjek', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pesan">Pesan *</Label>
                        <Textarea
                          id="pesan"
                          required
                          rows={6}
                          value={formData.pesan}
                          onChange={(e) => handleInputChange('pesan', e.target.value)}
                          className="mt-2"
                          placeholder="Tuliskan pesan Anda di sini..."
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Kirim Pesan
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Office Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="w-5 h-5" />
                      <span>Kantor Pusat</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{kantorPusat.alamat}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">{kantorPusat.telepon}</p>
                        <p className="text-sm text-muted-foreground">Fax: {kantorPusat.fax}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">{kantorPusat.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">{kantorPusat.jamOperasional}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Navigation className="w-4 h-4 mr-2" />
                      Petunjuk Arah
                    </Button>
                  </CardContent>
                </Card>

                {/* Customer Service */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Layanan Nasabah</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {layananNasabah.map((layanan, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <layanan.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{layanan.title}</p>
                          <p className="text-sm">{layanan.description}</p>
                          <p className="text-xs text-muted-foreground">{layanan.detail}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ikuti Kami</CardTitle>
                    <CardDescription>
                      Dapatkan informasi terkini melalui media sosial kami
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {socialMedia.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          className={`flex items-center space-x-2 p-3 rounded-lg text-white ${social.color} hover:opacity-90 transition-opacity`}
                        >
                          <social.icon className="w-5 h-5" />
                          <span className="font-medium">{social.name}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Lokasi Kami</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Kunjungi kantor pusat kami di Bandung atau temukan kantor cabang 
                terdekat di lokasi Anda.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Peta Lokasi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Peta Lokasi Kantor Pusat</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Jl. Soekarno Hatta No. 578, Bandung
                    </p>
                    <Button variant="outline" className="mt-4">
                      <Navigation className="w-4 h-4 mr-2" />
                      Buka di Google Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
              <p className="text-lg text-muted-foreground">
                Temukan jawaban untuk pertanyaan yang sering diajukan
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Apa saja persyaratan untuk mengajukan kredit?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Persyaratan umum meliputi KTP, KK, surat keterangan penghasilan, 
                    dan agunan (jika diperlukan). Persyaratan spesifik dapat berbeda 
                    tergantung jenis kredit yang diajukan.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Berapa lama proses pengajuan kredit disetujui?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Proses pengajuan kredit biasanya memakan waktu 3-7 hari kerja, 
                    tergantung kelengkapan dokumen dan jenis kredit yang diajukan.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Apakah simpanan di BPR Jabar Perseroda dijamin LPS?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ya, simpanan nasabah di BPR Jabar Perseroda dijamin oleh LPS 
                    (Lembaga Penjamin Simpanan) sesuai dengan ketentuan yang berlaku.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Bagaimana cara membuka rekening tabungan?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Anda dapat membuka rekening tabungan dengan mendatangi kantor kami 
                    terdekat dengan membawa KTP asli dan mengisi formulir pembukaan rekening.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}