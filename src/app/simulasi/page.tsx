'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Calculator, 
  TrendingUp, 
  PiggyBank, 
  HandCoins,
  ArrowRight,
  Info,
  CheckCircle
} from 'lucide-react'

export default function SimulasiPage() {
  const [activeTab, setActiveTab] = useState('deposito')

  // State untuk simulasi deposito
  const [depositoData, setDepositoData] = useState({
    jumlah: 10000000,
    bungaLPS: 6,
    tenor: 12
  })

  // State untuk simulasi kredit
  const [kreditData, setKreditData] = useState({
    jumlah: 50000000,
    tenor: 12,
    bunga: 1,
    metode: 'anuitas'
  })

  const [hasilDeposito, setHasilDeposito] = useState<any>(null)
  const [hasilKredit, setHasilKredit] = useState<any>(null)

  // Hitung bunga deposito
  const hitungBungaDeposito = (jumlah: number) => {
    if (jumlah <= 50000000) return 5.5
    if (jumlah <= 100000000) return 6
    return depositoData.bungaLPS
  }

  // Hitung simulasi deposito
  const hitungSimulasiDeposito = () => {
    const bungaPersen = hitungBungaDeposito(depositoData.jumlah)
    const bungaPerTahun = depositoData.jumlah * (bungaPersen / 100)
    const bungaPerBulan = bungaPerTahun / 12
    const bungaPerHari = bungaPerTahun / 365
    
    // Hitung bunga bruto untuk periode deposito
    const bungaBruto = bungaPerTahun * depositoData.tenor / 12
    
    // Hitung pajak (20% dari bunga bruto)
    const pajak = bungaBruto * 0.20
    
    // Hitung bunga netto (bunga bruto - pajak)
    const bungaNetto = bungaBruto - pajak
    
    // Hitung total akhir (jumlah deposito + bunga netto)
    const totalAkhir = depositoData.jumlah + bungaNetto

    setHasilDeposito({
      jumlahAwal: depositoData.jumlah,
      bungaPersen,
      bungaPerTahun,
      bungaPerBulan,
      bungaPerHari,
      totalAkhir,
      bungaBruto,
      pajak,
      bungaNetto,
      totalBunga: bungaNetto,
      tenor: depositoData.tenor
    })
  }

  // Hitung simulasi kredit
  const hitungSimulasiKredit = () => {
    const { jumlah, tenor, bunga, metode } = kreditData
    const bungaPerBulan = bunga / 100
    const angsuran: any[] = []

    if (metode === 'flat') {
      // Metode Flat
      const totalBunga = jumlah * bungaPerBulan * tenor
      const totalPinjaman = jumlah + totalBunga
      const angsuranPokok = jumlah / tenor
      const angsuranBunga = totalBunga / tenor
      const angsuranPerBulan = angsuranPokok + angsuranBunga

      for (let i = 1; i <= tenor; i++) {
        angsuran.push({
          periode: i,
          pokok: angsuranPokok,
          bunga: angsuranBunga,
          total: angsuranPerBulan,
          sisa: jumlah - (angsuranPokok * i)
        })
      }

      setHasilKredit({
        metode: 'Flat',
        jumlahPinjaman: jumlah,
        totalBunga,
        totalPembayaran: totalPinjaman,
        angsuranPerBulan,
        angsuran
      })
    } else if (metode === 'efektif') {
      // Metode Efektif
      let sisaPinjaman = jumlah
      const angsuranPokok = jumlah / tenor

      for (let i = 1; i <= tenor; i++) {
        const bungaBulan = sisaPinjaman * bungaPerBulan
        const totalAngsuran = angsuranPokok + bungaBulan
        
        angsuran.push({
          periode: i,
          pokok: angsuranPokok,
          bunga: bungaBulan,
          total: totalAngsuran,
          sisa: sisaPinjaman - angsuranPokok
        })

        sisaPinjaman -= angsuranPokok
      }

      const totalBunga = angsuran.reduce((sum, a) => sum + a.bunga, 0)
      const totalPembayaran = jumlah + totalBunga

      setHasilKredit({
        metode: 'Efektif',
        jumlahPinjaman: jumlah,
        totalBunga,
        totalPembayaran,
        angsuranPerBulan: angsuran[0].total,
        angsuran
      })
    } else if (metode === 'anuitas') {
      // Metode Anuitas
      const rate = bungaPerBulan
      const anuitas = (jumlah * rate * Math.pow(1 + rate, tenor)) / (Math.pow(1 + rate, tenor) - 1)
      let sisaPinjaman = jumlah

      for (let i = 1; i <= tenor; i++) {
        const bungaBulan = sisaPinjaman * rate
        const pokok = anuitas - bungaBulan
        
        angsuran.push({
          periode: i,
          pokok: pokok,
          bunga: bungaBulan,
          total: anuitas,
          sisa: sisaPinjaman - pokok
        })

        sisaPinjaman -= pokok
      }

      const totalBunga = angsuran.reduce((sum, a) => sum + a.bunga, 0)
      const totalPembayaran = jumlah + totalBunga

      setHasilKredit({
        metode: 'Anuitas',
        jumlahPinjaman: jumlah,
        totalBunga,
        totalPembayaran,
        angsuranPerBulan: anuitas,
        angsuran
      })
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
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
                <Calculator className="w-4 h-4 mr-1" />
                Simulasi Keuangan
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Simulasi Keuangan
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Hitung perkiraan bunga deposito dan angsuran kredit dengan 
                simulator keuangan kami yang akurat dan mudah digunakan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto mb-12">
              <TabsTrigger value="deposito">Simulasi Deposito</TabsTrigger>
              <TabsTrigger value="kredit">Simulasi Kredit</TabsTrigger>
            </TabsList>

            {/* Simulasi Deposito */}
            <TabsContent value="deposito" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PiggyBank className="w-5 h-5" />
                        <span>Parameter Deposito</span>
                      </CardTitle>
                      <CardDescription>
                        Masukkan jumlah deposito dan tenor yang diinginkan
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="jumlah">Jumlah Deposito</Label>
                        <Input
                          id="jumlah"
                          type="number"
                          value={depositoData.jumlah}
                          onChange={(e) => setDepositoData({
                            ...depositoData,
                            jumlah: Number(e.target.value)
                          })}
                          className="mt-2"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Minimal Rp 1.000.000
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="tenor">Tenor (bulan)</Label>
                        <Select
                          value={depositoData.tenor.toString()}
                          onValueChange={(value) => setDepositoData({
                            ...depositoData,
                            tenor: Number(value)
                          })}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 bulan</SelectItem>
                            <SelectItem value="3">3 bulan</SelectItem>
                            <SelectItem value="6">6 bulan</SelectItem>
                            <SelectItem value="12">12 bulan</SelectItem>
                            <SelectItem value="24">24 bulan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {depositoData.jumlah > 100000000 && (
                        <div>
                          <Label htmlFor="bungaLPS">Bunga LPS (% per tahun)</Label>
                          <Input
                            id="bungaLPS"
                            type="number"
                            step="0.1"
                            value={depositoData.bungaLPS}
                            onChange={(e) => setDepositoData({
                              ...depositoData,
                              bungaLPS: Number(e.target.value)
                            })}
                            className="mt-2"
                          />
                        </div>
                      )}

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Info className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-sm">Suku Bunga Berlaku</span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>• Rp 1.000.000 - Rp 50.000.000: 5.5% per tahun</p>
                          <p>• Rp 50.000.001 - Rp 100.000.000: 6% per tahun</p>
                          <p>• &gt; Rp 100.000.000: Mengikuti bunga LPS</p>
                        </div>
                      </div>

                      <Button onClick={hitungSimulasiDeposito} className="w-full">
                        <Calculator className="w-4 h-4 mr-2" />
                        Hitung Simulasi
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Hasil Perhitungan */}
                  {hasilDeposito && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5" />
                          <span>Hasil Perhitungan</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Jumlah Awal</Label>
                            <p className="text-lg font-semibold">
                              {formatCurrency(hasilDeposito.jumlahAwal)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Suku Bunga</Label>
                            <p className="text-lg font-semibold">
                              {hasilDeposito.bungaPersen}% per tahun
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Bunga per Hari</Label>
                            <p className="text-lg font-semibold">
                              {formatCurrency(hasilDeposito.bungaPerHari)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Bunga per Bulan</Label>
                            <p className="text-lg font-semibold">
                              {formatCurrency(hasilDeposito.bungaPerBulan)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Bunga Bruto</Label>
                            <p className="text-lg font-semibold text-blue-600">
                              {formatCurrency(hasilDeposito.bungaBruto)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Pajak (20%)</Label>
                            <p className="text-lg font-semibold text-red-600">
                              {formatCurrency(hasilDeposito.pajak)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Bunga Netto</Label>
                            <p className="text-lg font-semibold text-green-600">
                              {formatCurrency(hasilDeposito.bungaNetto)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Total Akhir</Label>
                            <p className="text-lg font-semibold text-primary">
                              {formatCurrency(hasilDeposito.totalAkhir)}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Periode</span>
                            <Badge variant="outline">{hasilDeposito.tenor} bulan</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Simulasi Kredit */}
            <TabsContent value="kredit" className="space-y-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <HandCoins className="w-5 h-5" />
                        <span>Parameter Kredit</span>
                      </CardTitle>
                      <CardDescription>
                        Masukkan jumlah pinjaman dan periode angsuran
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="jumlahPinjaman">Jumlah Pinjaman</Label>
                        <Input
                          id="jumlahPinjaman"
                          type="number"
                          value={kreditData.jumlah}
                          onChange={(e) => setKreditData({
                            ...kreditData,
                            jumlah: Number(e.target.value)
                          })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="tenorKredit">Lama Pinjaman (bulan)</Label>
                        <Select
                          value={kreditData.tenor.toString()}
                          onValueChange={(value) => setKreditData({
                            ...kreditData,
                            tenor: Number(value)
                          })}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 bulan</SelectItem>
                            <SelectItem value="12">12 bulan</SelectItem>
                            <SelectItem value="24">24 bulan</SelectItem>
                            <SelectItem value="36">36 bulan</SelectItem>
                            <SelectItem value="60">60 bulan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="bunga">Bunga per Tahun (%)</Label>
                        <Input
                          id="bunga"
                          type="number"
                          step="0.1"
                          value={kreditData.bunga}
                          onChange={(e) => setKreditData({
                            ...kreditData,
                            bunga: Number(e.target.value)
                          })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="metode">Metode Perhitungan</Label>
                        <Select
                          value={kreditData.metode}
                          onValueChange={(value) => setKreditData({
                            ...kreditData,
                            metode: value
                          })}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flat">Flat</SelectItem>
                            <SelectItem value="efektif">Efektif</SelectItem>
                            <SelectItem value="anuitas">Anuitas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={hitungSimulasiKredit} className="w-full">
                        <Calculator className="w-4 h-4 mr-2" />
                        Hitung Simulasi
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Ringkasan Hasil */}
                  {hasilKredit && (
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5" />
                          <span>Ringkasan Hasil</span>
                        </CardTitle>
                        <CardDescription>
                          Metode perhitungan: {hasilKredit.metode}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Jumlah Pinjaman</Label>
                            <p className="text-lg font-semibold">
                              {formatCurrency(hasilKredit.jumlahPinjaman)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Angsuran per Bulan</Label>
                            <p className="text-lg font-semibold text-primary">
                              {formatCurrency(hasilKredit.angsuranPerBulan)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Total Bunga</Label>
                            <p className="text-lg font-semibold text-red-600">
                              {formatCurrency(hasilKredit.totalBunga)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Total Pembayaran</Label>
                            <p className="text-lg font-semibold">
                              {formatCurrency(hasilKredit.totalPembayaran)}
                            </p>
                          </div>
                        </div>

                        {/* Tabel Angsuran */}
                        <div className="mt-6">
                          <h4 className="font-semibold mb-3">Detail Angsuran</h4>
                          <div className="max-h-96 overflow-y-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Periode</TableHead>
                                  <TableHead>Pokok</TableHead>
                                  <TableHead>Bunga</TableHead>
                                  <TableHead>Total</TableHead>
                                  <TableHead>Sisa</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {hasilKredit.angsuran.map((angsuran: any, index: number) => (
                                  <TableRow key={index}>
                                    <TableCell>{angsuran.periode}</TableCell>
                                    <TableCell>{formatCurrency(angsuran.pokok)}</TableCell>
                                    <TableCell>{formatCurrency(angsuran.bunga)}</TableCell>
                                    <TableCell className="font-semibold">
                                      {formatCurrency(angsuran.total)}
                                    </TableCell>
                                    <TableCell>{formatCurrency(Math.max(0, angsuran.sisa))}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Mengajukan Kredit?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Setelah melihat simulasi, ajukan kredit Anda sekarang juga dan 
            nikmati proses cepat dengan bunga kompetitif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Ajukan Kredit Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}