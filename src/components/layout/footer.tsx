import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Clock } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    perusahaan: [
      { label: 'Tentang Kami', href: '/profil' },
      { label: 'Visi & Misi', href: '/profil#visi-misi' },
      { label: 'Struktur Organisasi', href: '/profil#struktur-organisasi' },
      { label: 'Pengurus', href: '/profil#pengurus' },
    ],
    layanan: [
      { label: 'Tabungan', href: '/layanan#tabungan' },
      { label: 'Deposito', href: '/layanan#deposito' },
      { label: 'Kredit', href: '/layanan#kredit' },
      { label: 'Simulasi', href: '/simulasi' },
    ],
    informasi: [
      { label: 'Berita', href: '/berita' },
      { label: 'Laporan', href: '/laporan' },
      { label: 'Kantor', href: '/kantor' },
      { label: 'Kontak', href: '/kontak' },
    ],
    legal: [
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
      { label: 'Pengaduan Nasabah', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  }

  return (
    <footer className="bg-muted/50 border-t">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">BJ</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">BPR Jabar Perseroda</h3>
                <p className="text-sm text-muted-foreground">Terpercaya, Profesional, Berkontribusi</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              PT BPR Jabar Perseroda adalah Bank Perkreditan Rakyat yang berkomitmen 
              untuk mendukung perekonomian masyarakat Jawa Barat melalui layanan 
              perbankan yang profesional dan terpercaya.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-muted-foreground">
                  Jl. Soekarno Hatta No. 578, Bandung
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <span className="text-muted-foreground">(022) 7564123</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <span className="text-muted-foreground">info@bprjabar.co.id</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-primary" />
                <span className="text-muted-foreground">
                  Senin - Jumat: 08:00 - 16:00 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              {footerLinks.perusahaan.map((link, index) => (
                <li key={`perusahaan-${index}`}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link, index) => (
                <li key={`layanan-${index}`}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info & Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.informasi.map((link, index) => (
                <li key={`informasi-${index}`}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={`legal-${index}`}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-muted border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} PT BPR Jabar Perseroda. All rights reserved.
            </div>
            
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex items-center space-x-3">
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer