# PT BPR Jabar Perseroda Website - Windows Setup

Website resmi PT BPR Jabar Perseroda dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS.

## 🚀 Quick Start for Windows

### 1. Prerequisites
Pastikan Anda sudah menginstall:
- [Node.js](https://nodejs.org/) (versi 18.0 atau lebih tinggi)
- [Git](https://git-scm.com/)

### 2. Clone Repository
```bash
git clone https://github.com/agusmaulanayusufnoor/bpr-jabar-website.git
cd bpr-jabar-website
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open Browser
Buka http://localhost:3000 di browser Anda

## 📝 Perbedaan Script untuk Windows

### Development Scripts
- `npm run dev` - Jalankan development server (tanpa logging ke file)
- `npm run dev:log` - Jalankan development server dengan logging ke file (hanya untuk Linux/Mac)

### Production Scripts
- `npm run start` - Jalankan production server (tanpa logging ke file)
- `npm run start:log` - Jalankan production server dengan logging ke file (hanya untuk Linux/Mac)

### Other Scripts
- `npm run build` - Build aplikasi untuk production
- `npm run lint` - Cek kualitas kode dengan ESLint
- `npm run db:push` - Push database schema ke database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Jalankan database migration
- `npm run db:reset` - Reset database

## 🔧 Troubleshooting untuk Windows

### Masalah: 'tee' is not recognized
**Solusi:** Gunakan `npm run dev` instead of `npm run dev:log`. Script `dev:log` menggunakan `tee` yang hanya tersedia di Linux/Mac.

### Masalah: Port 3000 sudah digunakan
**Solusi:** 
1. Hentikan proses yang menggunakan port 3000, atau
2. Gunakan port lain dengan mengubah file `server.ts`

### Masalah: Module not found
**Solusi:** Jalankan `npm install` untuk memastikan semua dependencies terinstall.

### Masalah: TypeScript errors
**Solusi:** 
1. Jalankan `npm run build` untuk melihat detail error, atau
2. Periksa file `tsconfig.json` untuk konfigurasi TypeScript

## 🏗️ Project Structure

```
bpr-jabar-website/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── berita/         # Berita pages
│   │   ├── kantor/         # Kantor pages
│   │   ├── layanan/        # Layanan pages
│   │   ├── laporan/        # Laporan pages
│   │   ├── pengajuan/      # Pengajuan pages
│   │   ├── profil/         # Profil pages
│   │   ├── simulasi/       # Simulasi pages
│   │   ├── kontak/        # Kontak page
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── layout/        # Layout components
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── json/                  # Static JSON data
├── public/                # Static assets
├── prisma/               # Database schema
├── components.json       # shadcn/ui config
├── next.config.ts        # Next.js config
├── tailwind.config.ts    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies and scripts
```

## 🎯 Features

- **Homepage**: Hero section dengan image carousel, service display, dan company advantages
- **Profil Page**: Company history, vision & mission, management info, dan organizational structure
- **Layanan Page**: Detailed display dari saving, deposit, dan credit products
- **Kantor Page**: Headquarters, branches, dan offices dengan search functionality
- **Simulasi Page**: Deposit dan credit calculation tools
- **Pengajuan Page**: Complete online application form untuk tiga product types
- **Laporan Page**: Financial reports dan company publications
- **Berita & Artikel**: News dengan pagination dan search functionality
- **Responsive Design**: Mobile-first design dengan Tailwind CSS
- **Professional UI**: shadcn/ui components dengan Lucide icons

## 🛠️ Technology Stack

- **Framework**: Next.js 14 dengan App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 dengan shadcn/ui component library
- **Database**: Prisma ORM (SQLite client only) dengan Prisma Client
- **Caching**: Local memory caching
- **UI Components**: Complete shadcn/ui component set (New York style) dengan Lucide icons
- **Authentication**: NextAuth.js v4 available
- **State Management**: Zustand untuk client state, TanStack Query untuk server state

## 📱 Development di Windows

### Environment Variables
Buat file `.env.local` di root project:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Untuk production
NODE_ENV="development"
```

### Hot Reload
Project sudah dikonfigurasi dengan hot reload. Perubahan pada file di folder `src/` akan otomatis ter-refresh di browser.

### Database Setup
Project menggunakan SQLite untuk development:
```bash
# Generate Prisma client
npm run db:generate

# Push schema ke database
npm run db:push
```

## 🚀 Deployment ke Production

### Build untuk Production
```bash
npm run build
```

### Jalankan di Production
```bash
npm run start
```

### Platform Deployment
Project siap untuk di-deploy ke:
- Vercel (recommended untuk Next.js)
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Project ini adalah milik PT BPR Jabar Perseroda.

## 🆘 Support

Jika mengalami masalah di Windows:
1. Cek troubleshooting section di atas
2. Pastikan Node.js versi terbaru terinstall
3. Hapus `node_modules` dan `package-lock.json` lalu jalankan `npm install` ulang
4. Restart development server

---

**Happy Coding! 🎉**