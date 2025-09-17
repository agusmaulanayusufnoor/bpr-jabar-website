'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation,
  Search,
  Filter
} from 'lucide-react'
import kantorData from '@/json/kantor.json'

export default function KantorPage() {
  const [activeTab, setActiveTab] = useState('pusat')
  const [searchTerm, setSearchTerm] = useState('')

  const filterKantor = (kantorList: any[]) => {
    return kantorList.filter(kantor => 
      kantor.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kantor.alamat.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const renderKantorCard = (kantor: any, index: number) => (
    <Card key={index} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{kantor.nama}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {kantor.tipe === 'pusat' ? 'Kantor Pusat' : kantor.tipe === 'cabang' ? 'Cabang' : 'Kas'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{kantor.alamat}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{kantor.telepon}</span>
          </div>
          {kantor.fax && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Fax: {kantor.fax}</span>
            </div>
          )}
          {kantor.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{kantor.email}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{kantor.jam_operasional}</span>
          </div>
        </div>
        
        <div className="pt-2">
          <Button variant="outline" size="sm" className="w-full">
            <Navigation className="w-4 h-4 mr-2" />
            Petunjuk Arah
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-primary/80">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4">
                <Building2 className="w-4 h-4 mr-1" />
                Jaringan Kantor
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Jaringan Kantor Kami
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                PT BPR Jabar Perseroda hadir di berbagai lokasi strategis di Jawa Barat 
                untuk memberikan layanan terbaik kepada nasabah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Cari kantor berdasarkan nama atau alamat..."
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto mb-12">
              <TabsTrigger value="pusat">Kantor Pusat</TabsTrigger>
              <TabsTrigger value="cabang">Cabang</TabsTrigger>
              <TabsTrigger value="kas">Kantor Kas</TabsTrigger>
            </TabsList>

            {/* Kantor Pusat */}
            <TabsContent value="pusat" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Kantor Pusat Info */}
                  <div>
                    {renderKantorCard(kantorData.kantor_pusat, 0)}
                  </div>
                  
                  {/* Map */}
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
                          <p className="text-muted-foreground">Peta Kantor Pusat</p>
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

                {/* Additional Info */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Informasi Layanan Kantor Pusat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Layanan Nasabah</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Pembukaan rekening tabungan</li>
                          <li>• Penempatan deposito</li>
                          <li>• Pengajuan kredit</li>
                          <li>• Transaksi perbankan</li>
                          <li>• Konsultasi keuangan</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Fasilitas</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Area parkir luas</li>
                          <li>• Wi-Fi gratis</li>
                          <li>• Ruang tunggu nyaman</li>
                          <li>• ATM Center</li>
                          <li>• Aksesibilitas disabilitas</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Cabang */}
            <TabsContent value="cabang" className="space-y-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Kantor Cabang</h2>
                  <p className="text-lg text-muted-foreground">
                    Kami memiliki {kantorData.cabang.length} kantor cabang yang tersebar di berbagai kota di Jawa Barat
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterKantor(kantorData.cabang).map((cabang, index) => renderKantorCard(cabang, index))}
                </div>

                {filterKantor(kantorData.cabang).length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Tidak ditemukan kantor cabang yang sesuai dengan pencarian Anda</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Kantor Kas */}
            <TabsContent value="kas" className="space-y-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Kantor Kas</h2>
                  <p className="text-lg text-muted-foreground">
                    Kami memiliki {kantorData.kas.length} kantor kas untuk memudahkan akses layanan nasabah
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterKantor(kantorData.kas).map((kas, index) => renderKantorCard(kas, index))}
                </div>

                {filterKantor(kantorData.kas).length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Tidak ditemukan kantor kas yang sesuai dengan pencarian Anda</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cakupan Wilayah</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jaringan kantor PT BPR Jabar Perseroda tersebar di berbagai wilayah strategis di Jawa Barat
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Peta Sebaran Kantor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Peta Sebaran Kantor</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Visualisasi peta sebaran kantor cabang dan kantor kas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}