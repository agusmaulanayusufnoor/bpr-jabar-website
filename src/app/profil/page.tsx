'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2, Users, Award, Target, Calendar, MapPin } from 'lucide-react'
import profilData from '../../../json/profil.json'

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('sejarah')

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
                Profil Perusahaan
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                PT BPR Jabar Perseroda
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Bank Perkreditan Rakyat yang berkomitmen untuk mendukung perekonomian 
                masyarakat Jawa Barat melalui layanan perbankan yang profesional dan terpercaya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto mb-12">
              <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
              <TabsTrigger value="visimisi">Visi & Misi</TabsTrigger>
              <TabsTrigger value="pengurus">Pengurus</TabsTrigger>
              <TabsTrigger value="struktur">Struktur</TabsTrigger>
            </TabsList>

            {/* Sejarah Tab */}
            <TabsContent value="sejarah" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-8 h-8 text-primary" />
                      <div>
                        <CardTitle className="text-2xl">{profilData.sejarah.judul}</CardTitle>
                        <CardDescription className="text-base mt-2">
                          Perjalanan panjang PT BPR Jabar Perseroda dalam melayani masyarakat Jawa Barat
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {profilData.sejarah.konten}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-xl">Milestone Perusahaan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">2007</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Pendirian Perusahaan</h4>
                          <p className="text-muted-foreground">
                            PT BPR Jabar Perseroda didirikan sebagai bagian dari program Pemerintah Provinsi Jawa Barat
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">2010</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Ekspansi Layanan</h4>
                          <p className="text-muted-foreground">
                            Perluasan jaringan kantor dan penambahan produk layanan
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">2015</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Transformasi Digital</h4>
                          <p className="text-muted-foreground">
                            Implementasi sistem perbankan digital dan layanan online
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">2020</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Penghargaan Terbaik</h4>
                          <p className="text-muted-foreground">
                            Meraih penghargaan sebagai BPR terbaik se-Jawa Barat
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Visi & Misi Tab */}
            <TabsContent value="visimisi" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Visi */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Target className="w-8 h-8 text-primary" />
                        <CardTitle className="text-xl">{profilData.visi.judul}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {profilData.visi.konten}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Misi */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Award className="w-8 h-8 text-primary" />
                        <CardTitle className="text-xl">{profilData.misi.judul}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {profilData.misi.konten.map((misi, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{misi}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Nilai Perusahaan */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-xl">Nilai-Nilai Perusahaan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Building2 className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Profesional</h4>
                        <p className="text-sm text-muted-foreground">
                          Memberikan layanan dengan standar profesionalisme tinggi
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Terpercaya</h4>
                        <p className="text-sm text-muted-foreground">
                          Membangun kepercayaan melalui integritas dan transparansi
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Award className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Inovatif</h4>
                        <p className="text-sm text-muted-foreground">
                          Terus berinovasi untuk memberikan layanan terbaik
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Pengurus Tab */}
            <TabsContent value="pengurus" className="space-y-8">
              <div className="max-w-6xl mx-auto">
                {/* Komisaris */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Dewan Komisaris</CardTitle>
                    <CardDescription>
                      Dewan Komisaris PT BPR Jabar Perseroda yang bertanggung jawab atas pengawasan manajemen
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {profilData.pengurus.komisaris.map((komisaris, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-4">
                            <Avatar className="w-24 h-24 mx-auto mb-4">
                              <AvatarImage src={komisaris.foto} alt={komisaris.nama} />
                              <AvatarFallback className="text-lg">
                                {komisaris.nama.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-lg">{komisaris.nama}</CardTitle>
                            <Badge variant="secondary">{komisaris.jabatan}</Badge>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Direksi */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-2xl">Dewan Direksi</CardTitle>
                    <CardDescription>
                      Dewan Direksi PT BPR Jabar Perseroda yang bertanggung jawab atas operasional perusahaan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {profilData.pengurus.direksi.map((direksi, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-4">
                            <Avatar className="w-24 h-24 mx-auto mb-4">
                              <AvatarImage src={direksi.foto} alt={direksi.nama} />
                              <AvatarFallback className="text-lg">
                                {direksi.nama.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-lg">{direksi.nama}</CardTitle>
                            <Badge variant="secondary">{direksi.jabatan}</Badge>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Struktur Tab */}
            <TabsContent value="struktur" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                {/* Struktur Organisasi */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Struktur Organisasi</CardTitle>
                    <CardDescription>
                      Struktur organisasi PT BPR Jabar Perseroda dirancang untuk memastikan efektivitas operasional
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <p className="text-muted-foreground mb-4">
                        {profilData.struktur_organisasi.deskripsi}
                      </p>
                      <div className="bg-muted/50 rounded-lg p-8">
                        <div className="w-full h-64 bg-white rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Building2 className="w-16 h-16 text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">Struktur Organisasi</p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Gambar struktur organisasi akan ditampilkan di sini
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Kepemilikan Saham */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-2xl">{profilData.kepemilikan_saham.judul}</CardTitle>
                    <CardDescription>
                      Informasi kepemilikan saham PT BPR Jabar Perseroda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {profilData.kepemilikan_saham.deskripsi}
                    </p>
                    <div className="bg-muted/50 rounded-lg p-6">
                      {profilData.kepemilikan_saham.pemegang_saham.map((pemegang, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-6 h-6 text-primary" />
                            <div>
                              <h4 className="font-semibold">{pemegang.nama}</h4>
                              <p className="text-sm text-muted-foreground">{pemegang.keterangan}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-lg px-4 py-2">
                            {pemegang.persentase}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}