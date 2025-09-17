'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  FileText, 
  Download, 
  Search,
  Filter,
  Calendar,
  FileBarChart,
  Shield,
  Globe,
  ExternalLink
} from 'lucide-react'
import laporanData from '@/json/laporan.json'

export default function LaporanPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterKategori, setFilterKategori] = useState('semua')
  const [filterTahun, setFilterTahun] = useState('semua')

  const filterLaporan = (laporanList: any[]) => {
    return laporanList.filter(laporan => {
      const matchesSearch = laporan.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          laporan.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesKategori = filterKategori === 'semua' || laporan.kategori === filterKategori
      const matchesTahun = filterTahun === 'semua' || laporan.tanggal.includes(filterTahun)
      
      return matchesSearch && matchesKategori && matchesTahun
    })
  }

  const formatFileSize = (bytes: string) => {
    return bytes
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getKategoriIcon = (kategori: string) => {
    switch (kategori) {
      case 'Laporan Keuangan':
        return <FileBarChart className="w-5 h-5" />
      case 'Laporan Tahunan':
        return <FileText className="w-5 h-5" />
      case 'Tata Kelola':
        return <Shield className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'Laporan Keuangan':
        return 'bg-blue-100 text-blue-600'
      case 'Laporan Tahunan':
        return 'bg-green-100 text-green-600'
      case 'Tata Kelola':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const filteredLaporan = filterLaporan(laporanData.laporan_publikasi)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-primary/80">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4">
                <FileText className="w-4 h-4 mr-1" />
                Laporan Publikasi
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Laporan Publikasi
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Akses laporan keuangan, laporan tahunan, dan laporan tata kelola 
                PT BPR Jabar Perseroda untuk transparansi dan akuntabilitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari laporan..."
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
                  <SelectItem value="semua">Semua Kategori</SelectItem>
                  <SelectItem value="Laporan Keuangan">Laporan Keuangan</SelectItem>
                  <SelectItem value="Laporan Tahunan">Laporan Tahunan</SelectItem>
                  <SelectItem value="Tata Kelola">Tata Kelola</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterTahun} onValueChange={setFilterTahun}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter tahun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Tahun</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
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
            {/* Stats Section */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-2xl font-bold">{laporanData.laporan_publikasi.length}</div>
                  <div className="text-sm text-muted-foreground">Total Laporan</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileBarChart className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <div className="text-2xl font-bold">
                    {laporanData.laporan_publikasi.filter(l => l.kategori === 'Laporan Keuangan').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Laporan Keuangan</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <div className="text-2xl font-bold">
                    {laporanData.laporan_publikasi.filter(l => l.kategori === 'Laporan Tahunan').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Laporan Tahunan</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <div className="text-2xl font-bold">
                    {laporanData.laporan_publikasi.filter(l => l.kategori === 'Tata Kelola').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Tata Kelola</div>
                </CardContent>
              </Card>
            </div>

            {/* Laporan List */}
            <div className="space-y-4">
              {filteredLaporan.length > 0 ? (
                filteredLaporan.map((laporan) => (
                  <Card key={laporan.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg ${getKategoriColor(laporan.kategori)} flex items-center justify-center flex-shrink-0`}>
                            {getKategoriIcon(laporan.kategori)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">{laporan.judul}</h3>
                              <Badge variant="outline" className={getKategoriColor(laporan.kategori)}>
                                {laporan.kategori}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{laporan.deskripsi}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(laporan.tanggal)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{laporan.file_type}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Download className="w-4 h-4" />
                                <span>{formatFileSize(laporan.file_size)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Tidak ada laporan ditemukan</h3>
                    <p className="text-muted-foreground">
                      Tidak ada laporan yang sesuai dengan kriteria pencarian Anda.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Info Section */}
            <Card className="mt-12 bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Tentang Laporan Publikasi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3">Transparansi dan Akuntabilitas</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      PT BPR Jabar Perseroda berkomitmen untuk menjaga transparansi dan akuntabilitas 
                      dalam setiap aspek operasional. Laporan publikasi ini disusun sesuai dengan 
                      standar akuntansi keuangan dan peraturan perbankan yang berlaku.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Akses Informasi Publik</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Seluruh laporan publikasi dapat diakses secara gratis oleh masyarakat. 
                      Dokumen disediakan dalam format PDF untuk memudahkan pembacaan dan pencetakan. 
                      Untuk informasi lebih lanjut, silakan hubungi kami.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Butuh Informasi Lebih Lanjut?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Hubungi kami jika Anda membutuhkan informasi tambahan atau 
            memiliki pertanyaan mengenai laporan publikasi kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Hubungi Kami
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Kunjungi Kantor
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}