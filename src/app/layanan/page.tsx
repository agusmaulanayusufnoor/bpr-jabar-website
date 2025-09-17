'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  PiggyBank, 
  TrendingUp, 
  HandCoins, 
  Calculator,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Users
} from 'lucide-react'
import produkData from '@/json/produk.json'

export default function LayananPage() {
  const [activeTab, setActiveTab] = useState('tabungan')

  const renderProdukCard = (produk: any, type: string) => (
    <Card key={produk.nama} className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              type === 'tabungan' ? 'bg-green-100 text-green-600' :
              type === 'deposito' ? 'bg-blue-100 text-blue-600' :
              'bg-purple-100 text-purple-600'
            }`}>
              {type === 'tabungan' ? <PiggyBank className="w-6 h-6" /> :
               type === 'deposito' ? <TrendingUp className="w-6 h-6" /> :
               <HandCoins className="w-6 h-6" />}
            </div>
            <div>
              <CardTitle className="text-xl">{produk.nama}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {produk.suku_bunga}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-base">
          {produk.deskripsi}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fitur */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <Star className="w-4 h-4 mr-2 text-primary" />
            Fitur Utama
          </h4>
          <ul className="space-y-2">
            {produk.fitur.map((fitur: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{fitur}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Manfaat */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center">
            <Users className="w-4 h-4 mr-2 text-primary" />
            Manfaat
          </h4>
          <ul className="space-y-2">
            {produk.manfaat.map((manfaat: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{manfaat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            Simulasi
          </Button>
          <Button size="sm" className="flex-1 group-hover:bg-primary/90">
            Ajukan Sekarang
            <ArrowRight className="w-4 h-4 ml-2" />
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
                <PiggyBank className="w-4 h-4 mr-1" />
                Produk & Layanan
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Produk & Layanan Kami
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                PT BPR Jabar Perseroda menyediakan berbagai produk perbankan yang 
                dirancang untuk memenuhi kebutuhan keuangan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto mb-12">
              <TabsTrigger value="tabungan">Tabungan</TabsTrigger>
              <TabsTrigger value="deposito">Deposito</TabsTrigger>
              <TabsTrigger value="kredit">Kredit</TabsTrigger>
            </TabsList>

            {/* Tabungan */}
            <TabsContent value="tabungan" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Produk Tabungan</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Pilih produk tabungan yang sesuai dengan kebutuhan keuangan Anda 
                  dengan berbagai kemudahan dan keuntungan.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {produkData.tabungan.map((produk) => renderProdukCard(produk, 'tabungan'))}
              </div>

              {/* Info Section */}
              <Card className="mt-16 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Keuntungan Menabung di BPR Jabar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Aman Terjamin</h4>
                      <p className="text-sm text-muted-foreground">
                        Simpanan Anda dijamin oleh LPS (Lembaga Penjamin Simpanan)
                      </p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Bunga Kompetitif</h4>
                      <p className="text-sm text-muted-foreground">
                        Nikmati suku bunga yang menarik dan kompetitif
                      </p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Kemudahan Akses</h4>
                      <p className="text-sm text-muted-foreground">
                        Akses mudah melalui jaringan kantor dan layanan digital
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Deposito */}
            <TabsContent value="deposito" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Produk Deposito</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dapatkan pengembalian investasi yang optimal dengan produk deposito 
                  kami yang aman dan menguntungkan.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {produkData.deposito.map((produk) => renderProdukCard(produk, 'deposito'))}
              </div>

              {/* Info Section */}
              <Card className="mt-16 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Mengapa Memilih Deposito Kami?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Keamanan Terjamin
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Dijamin oleh LPS hingga batas maksimal</li>
                        <li>• Sistem keamanan berlapis</li>
                        <li>• Monitoring transaksi real-time</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Fleksibilitas Tinggi
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Pilihan jangka waktu beragam</li>
                        <li>• Perpanjangan otomatis (ARO)</li>
                        <li>• Bisa dijadikan jaminan kredit</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kredit */}
            <TabsContent value="kredit" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Produk Kredit</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Solusi pembiayaan untuk berbagai kebutuhan dengan proses cepat 
                  dan persyaratan yang mudah.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {produkData.kredit.map((produk) => renderProdukCard(produk, 'kredit'))}
              </div>

              {/* Info Section */}
              <Card className="mt-16 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Keunggulan Kredit Kami</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Proses Cepat</h4>
                      <p className="text-sm text-muted-foreground">
                        Persetujuan cepat tanpa ribet
                      </p>
                    </div>
                    <div className="text-center">
                      <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Layanan Prima</h4>
                      <p className="text-sm text-muted-foreground">
                        Konsultasi dengan ahli keuangan
                      </p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Bunga Kompetitif</h4>
                      <p className="text-sm text-muted-foreground">
                        Suku bunga yang bersaing
                      </p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Aman & Terpercaya</h4>
                      <p className="text-sm text-muted-foreground">
                        Proses transparan dan terjamin
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Butuh Konsultasi Keuangan?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Tim kami siap membantu Anda memilih produk yang paling sesuai 
            dengan kebutuhan keuangan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Calculator className="w-5 h-5 mr-2" />
              Hitung Simulasi
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}