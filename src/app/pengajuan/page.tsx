'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  Briefcase,
  FileText,
  CheckCircle,
  AlertCircle,
  Send,
  ArrowRight
} from 'lucide-react'

export default function PengajuanPage() {
  const [activeTab, setActiveTab] = useState('tabungan')
  const [formData, setFormData] = useState({
    // Data Pribadi
    namaLengkap: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    kewarganegaraan: 'WNI',
    namaIbuKandung: '',
    statusPerkawinan: '',
    pendidikan: '',
    npwp: '',
    
    // Kontak
    noHP: '',
    noWA: '',
    email: '',
    alamat: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    kodePos: '',
    
    // Pekerjaan
    pekerjaan: '',
    namaPerusahaan: '',
    jabatan: '',
    lamaBekerja: '',
    penghasilan: '',
    alamatKantor: '',
    noTelpKantor: '',
    
    // Data Pengajuan
    jenisProduk: '',
    jumlahPengajuan: '',
    tujuanPengajuan: '',
    jangkaWaktu: '',
    agunan: '',
    keterangan: '',
    
    // Persetujuan
    setujuData: false,
    setujuSyarat: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
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

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(amount) || 0)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Pengajuan Berhasil!</CardTitle>
            <CardDescription>
              Terima kasih atas pengajuan Anda. Kami akan segera memproses data Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Nomor pengajuan Anda: AJN-{Date.now()}
            </p>
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
                <FileText className="w-4 h-4 mr-1" />
                Form Pengajuan
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Form Pengajuan Produk
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Ajukan tabungan, deposito, atau kredit dengan mudah melalui 
                form pengajuan online kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-[600px] mx-auto mb-12">
                <TabsTrigger value="tabungan">Pengajuan Tabungan</TabsTrigger>
                <TabsTrigger value="deposito">Pengajuan Deposito</TabsTrigger>
                <TabsTrigger value="kredit">Pengajuan Kredit</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <input type="hidden" name="jenisProduk" value={activeTab} />
                
                {/* Data Pribadi Section */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Data Pribadi</span>
                    </CardTitle>
                    <CardDescription>
                      Isi data diri Anda dengan lengkap dan benar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                        <Input
                          id="namaLengkap"
                          required
                          value={formData.namaLengkap}
                          onChange={(e) => handleInputChange('namaLengkap', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tempatLahir">Tempat Lahir *</Label>
                        <Input
                          id="tempatLahir"
                          required
                          value={formData.tempatLahir}
                          onChange={(e) => handleInputChange('tempatLahir', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tanggalLahir">Tanggal Lahir *</Label>
                        <Input
                          id="tanggalLahir"
                          type="date"
                          required
                          value={formData.tanggalLahir}
                          onChange={(e) => handleInputChange('tanggalLahir', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
                        <Select
                          value={formData.jenisKelamin}
                          onValueChange={(value) => handleInputChange('jenisKelamin', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="namaIbuKandung">Nama Ibu Kandung *</Label>
                        <Input
                          id="namaIbuKandung"
                          required
                          value={formData.namaIbuKandung}
                          onChange={(e) => handleInputChange('namaIbuKandung', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="statusPerkawinan">Status Perkawinan *</Label>
                        <Select
                          value={formData.statusPerkawinan}
                          onValueChange={(value) => handleInputChange('statusPerkawinan', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih status perkawinan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Belum Kawin">Belum Kawin</SelectItem>
                            <SelectItem value="Kawin">Kawin</SelectItem>
                            <SelectItem value="Cerai Hidup">Cerai Hidup</SelectItem>
                            <SelectItem value="Cerai Mati">Cerai Mati</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pendidikan">Pendidikan Terakhir *</Label>
                        <Select
                          value={formData.pendidikan}
                          onValueChange={(value) => handleInputChange('pendidikan', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih pendidikan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SD">SD</SelectItem>
                            <SelectItem value="SMP">SMP</SelectItem>
                            <SelectItem value="SMA">SMA</SelectItem>
                            <SelectItem value="D1">D1</SelectItem>
                            <SelectItem value="D2">D2</SelectItem>
                            <SelectItem value="D3">D3</SelectItem>
                            <SelectItem value="S1">S1</SelectItem>
                            <SelectItem value="S2">S2</SelectItem>
                            <SelectItem value="S3">S3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="npwp">NPWP</Label>
                        <Input
                          id="npwp"
                          placeholder="Opsional"
                          value={formData.npwp}
                          onChange={(e) => handleInputChange('npwp', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Kontak Section */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>Data Kontak</span>
                    </CardTitle>
                    <CardDescription>
                      Informasi kontak yang dapat dihubungi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="noHP">No. HP *</Label>
                        <Input
                          id="noHP"
                          required
                          placeholder="08xxxxxxxxxx"
                          value={formData.noHP}
                          onChange={(e) => handleInputChange('noHP', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="noWA">No. WhatsApp</Label>
                        <Input
                          id="noWA"
                          placeholder="08xxxxxxxxxx"
                          value={formData.noWA}
                          onChange={(e) => handleInputChange('noWA', e.target.value)}
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
                        <Label htmlFor="kodePos">Kode Pos</Label>
                        <Input
                          id="kodePos"
                          value={formData.kodePos}
                          onChange={(e) => handleInputChange('kodePos', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="alamat">Alamat Lengkap *</Label>
                      <Textarea
                        id="alamat"
                        required
                        rows={3}
                        value={formData.alamat}
                        onChange={(e) => handleInputChange('alamat', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="kelurahan">Kelurahan</Label>
                        <Input
                          id="kelurahan"
                          value={formData.kelurahan}
                          onChange={(e) => handleInputChange('kelurahan', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="kecamatan">Kecamatan</Label>
                        <Input
                          id="kecamatan"
                          value={formData.kecamatan}
                          onChange={(e) => handleInputChange('kecamatan', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="kabupaten">Kabupaten/Kota</Label>
                        <Input
                          id="kabupaten"
                          value={formData.kabupaten}
                          onChange={(e) => handleInputChange('kabupaten', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="provinsi">Provinsi *</Label>
                      <Select
                        value={formData.provinsi}
                        onValueChange={(value) => handleInputChange('provinsi', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Pilih provinsi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                          <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                          <SelectItem value="Banten">Banten</SelectItem>
                          <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                          <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Pekerjaan Section */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="w-5 h-5" />
                      <span>Data Pekerjaan</span>
                    </CardTitle>
                    <CardDescription>
                      Informasi pekerjaan dan penghasilan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="pekerjaan">Pekerjaan *</Label>
                        <Select
                          value={formData.pekerjaan}
                          onValueChange={(value) => handleInputChange('pekerjaan', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih pekerjaan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PNS">PNS</SelectItem>
                            <SelectItem value="TNI/Polri">TNI/Polri</SelectItem>
                            <SelectItem value="Swasta">Swasta</SelectItem>
                            <SelectItem value="Wirausaha">Wirausaha</SelectItem>
                            <SelectItem value="Profesional">Profesional</SelectItem>
                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="penghasilan">Penghasilan per Bulan *</Label>
                        <Input
                          id="penghasilan"
                          type="number"
                          required
                          value={formData.penghasilan}
                          onChange={(e) => handleInputChange('penghasilan', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="namaPerusahaan">Nama Perusahaan/Instansi</Label>
                        <Input
                          id="namaPerusahaan"
                          value={formData.namaPerusahaan}
                          onChange={(e) => handleInputChange('namaPerusahaan', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Input
                          id="jabatan"
                          value={formData.jabatan}
                          onChange={(e) => handleInputChange('jabatan', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="lamaBekerja">Lama Bekerja</Label>
                        <Select
                          value={formData.lamaBekerja}
                          onValueChange={(value) => handleInputChange('lamaBekerja', value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih lama bekerja" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="< 1 tahun">&lt; 1 tahun</SelectItem>
                            <SelectItem value="1-3 tahun">1-3 tahun</SelectItem>
                            <SelectItem value="3-5 tahun">3-5 tahun</SelectItem>
                            <SelectItem value="> 5 tahun">&gt; 5 tahun</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="noTelpKantor">No. Telepon Kantor</Label>
                        <Input
                          id="noTelpKantor"
                          value={formData.noTelpKantor}
                          onChange={(e) => handleInputChange('noTelpKantor', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="alamatKantor">Alamat Kantor</Label>
                      <Textarea
                        id="alamatKantor"
                        rows={2}
                        value={formData.alamatKantor}
                        onChange={(e) => handleInputChange('alamatKantor', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Data Pengajuan Section */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Data Pengajuan {activeTab === 'tabungan' ? 'Tabungan' : activeTab === 'deposito' ? 'Deposito' : 'Kredit'}</span>
                    </CardTitle>
                    <CardDescription>
                      Detail pengajuan produk yang diajukan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {activeTab === 'tabungan' && (
                      <>
                        <div>
                          <Label htmlFor="jenisTabungan">Jenis Tabungan *</Label>
                          <Select
                            value={formData.jenisProduk}
                            onValueChange={(value) => handleInputChange('jenisProduk', value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Pilih jenis tabungan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tabungan Sip">Tabungan Sip</SelectItem>
                              <SelectItem value="Tabungan Berjangka">Tabungan Berjangka</SelectItem>
                              <SelectItem value="Tabungan Haji">Tabungan Haji</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="setoranAwal">Setoran Awal *</Label>
                          <Input
                            id="setoranAwal"
                            type="number"
                            required
                            value={formData.jumlahPengajuan}
                            onChange={(e) => handleInputChange('jumlahPengajuan', e.target.value)}
                            className="mt-2"
                          />
                        </div>
                      </>
                    )}

                    {activeTab === 'deposito' && (
                      <>
                        <div>
                          <Label htmlFor="jenisDeposito">Jenis Deposito *</Label>
                          <Select
                            value={formData.jenisProduk}
                            onValueChange={(value) => handleInputChange('jenisProduk', value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Pilih jenis deposito" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Deposito Berjangka">Deposito Berjangka</SelectItem>
                              <SelectItem value="Deposito On-Call">Deposito On-Call</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="jumlahDeposito">Jumlah Deposito *</Label>
                          <Input
                            id="jumlahDeposito"
                            type="number"
                            required
                            value={formData.jumlahPengajuan}
                            onChange={(e) => handleInputChange('jumlahPengajuan', e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="jangkaWaktu">Jangka Waktu *</Label>
                          <Select
                            value={formData.jangkaWaktu}
                            onValueChange={(value) => handleInputChange('jangkaWaktu', value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Pilih jangka waktu" />
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
                      </>
                    )}

                    {activeTab === 'kredit' && (
                      <>
                        <div>
                          <Label htmlFor="jenisKredit">Jenis Kredit *</Label>
                          <Select
                            value={formData.jenisProduk}
                            onValueChange={(value) => handleInputChange('jenisProduk', value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Pilih jenis kredit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Kredit Modal Kerja">Kredit Modal Kerja</SelectItem>
                              <SelectItem value="Kredit Investasi">Kredit Investasi</SelectItem>
                              <SelectItem value="Kredit Konsumtif">Kredit Konsumtif</SelectItem>
                              <SelectItem value="Kredit Multiguna">Kredit Multiguna</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="jumlahKredit">Jumlah Pengajuan *</Label>
                          <Input
                            id="jumlahKredit"
                            type="number"
                            required
                            value={formData.jumlahPengajuan}
                            onChange={(e) => handleInputChange('jumlahPengajuan', e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="jangkaWaktuKredit">Jangka Waktu *</Label>
                          <Select
                            value={formData.jangkaWaktu}
                            onValueChange={(value) => handleInputChange('jangkaWaktu', value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Pilih jangka waktu" />
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
                          <Label htmlFor="agunan">Jenis Agunan</Label>
                          <Select
                            value={formData.agunan}
                            onValueChange={(value) => handleInputChange('agunan', value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Pilih jenis agunan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Sertifikat Rumah">Sertifikat Rumah</SelectItem>
                              <SelectItem value="Sertifikat Tanah">Sertifikat Tanah</SelectItem>
                              <SelectItem value="BPKB Kendaraan">BPKB Kendaraan</SelectItem>
                              <SelectItem value="Lainnya">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    <div>
                      <Label htmlFor="tujuanPengajuan">Tujuan Pengajuan *</Label>
                      <Textarea
                        id="tujuanPengajuan"
                        required
                        rows={3}
                        value={formData.tujuanPengajuan}
                        onChange={(e) => handleInputChange('tujuanPengajuan', e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="keterangan">Keterangan Tambahan</Label>
                      <Textarea
                        id="keterangan"
                        rows={2}
                        value={formData.keterangan}
                        onChange={(e) => handleInputChange('keterangan', e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Persetujuan Section */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Persetujuan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="setujuData"
                        checked={formData.setujuData}
                        onCheckedChange={(checked) => handleInputChange('setujuData', checked as boolean)}
                      />
                      <label htmlFor="setujuData" className="text-sm leading-relaxed">
                        Saya menyatakan bahwa data yang saya berikan adalah benar dan dapat 
                        dipertanggungjawabkan kebenarannya. Saya memberi kuasa kepada BPR Jabar 
                        Perseroda untuk melakukan verifikasi data yang saya berikan.
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="setujuSyarat"
                        checked={formData.setujuSyarat}
                        onCheckedChange={(checked) => handleInputChange('setujuSyarat', checked as boolean)}
                      />
                      <label htmlFor="setujuSyarat" className="text-sm leading-relaxed">
                        Saya telah membaca, memahami, dan menyetujui syarat dan ketentuan 
                        yang berlaku serta kebijakan privasi BPR Jabar Perseroda.
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !formData.setujuData || !formData.setujuSyarat}
                    className="px-12"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Kirim Pengajuan
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}