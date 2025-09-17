# Image Setup Guide

## 🖼️ Current Issue

Image files di folder `public/images/hero/` tidak bisa diupload ke GitHub karena ukurannya terlalu besar untuk GitHub API limits. Hal ini menyebabkan error 404 saat mencoba mengakses images di development server.

## 🔧 Solusi Cepat (Untuk Development)

### Opsi 1: Download Images Manual

1. **Download images dari server local** atau generate ulang
2. **Tempatkan di folder** `public/images/hero/` di local Anda
3. **Images yang dibutuhkan:**
   - `bank-1.jpg` - Bank building exterior
   - `saving-1.jpg` - Saving concept
   - `umkm-1.jpg` - UMKM concept

### Opsi 2: Generate Images Baru

Gunakan AI image generator atau download dari stock photo websites:

#### Bank Building Image
- **Prompt**: "Modern bank building exterior, green architecture, professional, daylight"
- **Ukuran**: 1024x1024
- **Simpan sebagai**: `public/images/hero/bank-1.jpg`

#### Saving Concept Image  
- **Prompt**: "People saving money, happy customers, bank interior, green theme"
- **Ukuran**: 1024x1024
- **Simpan sebagai**: `public/images/hero/saving-1.jpg`

#### UMKM Concept Image
- **Prompt**: "Small business owners, entrepreneurship, business growth, green theme"
- **Ukuran**: 1024x1024
- **Simpan sebagai**: `public/images/hero/umkm-1.jpg`

### Opsi 3: Gunakan CSS Gradient Placeholder

Untuk development sementara, Anda bisa mengganti images dengan CSS gradients:

1. **Buka file** `src/app/page.tsx`
2. **Cari bagian carousel images**
3. **Ganti dengan div berstyle gradient**

Contoh:
```tsx
// Ganti ini:
<Image
  src="/images/hero/bank-1.jpg"
  alt="Bank Building"
  fill
  className="object-cover"
  priority
/>

// Menjadi ini:
<div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
  <span className="text-white text-2xl font-bold">Bank Building Image</span>
</div>
```

## 🚀 Solusi Jangka Panjang

### 1. Compress Images

Gunakan tools untuk compress images:

```bash
# Install ImageMagick (jika belum ada)
# Ubuntu/Debian:
sudo apt-get install imagemagick

# Mac:
brew install imagemagick

# Windows:
# Download dari https://imagemagick.org/

# Compress images
convert public/images/hero/bank-1.jpg -quality 60 -resize 800x400 public/images/hero/bank-1-optimized.jpg
convert public/images/hero/saving-1.jpg -quality 60 -resize 800x400 public/images/hero/saving-1-optimized.jpg
convert public/images/hero/umkm-1.jpg -quality 60 -resize 800x400 public/images/hero/umkm-1-optimized.jpg
```

### 2. Use Next.js Image Optimization

Next.js memiliki built-in image optimization. Pastikan Anda menggunakan `next/image` component:

```tsx
import Image from 'next/image'

// Di component Anda
<Image
  src="/images/hero/bank-1.jpg"
  alt="Bank Building"
  width={800}
  height={400}
  className="w-full h-full object-cover"
  priority
/>
```

### 3. Use CDN atau External Image Hosting

Untuk production, pertimbangkan untuk:
- Upload images ke CDN (Cloudinary, Imgix, etc.)
- Use external image hosting services
- Use GitHub Pages untuk static assets

### 4. Git LFS (Large File Storage)

Jika Anda ingin menyimpan large files di GitHub:

```bash
# Install Git LFS
git lfs install

# Track image files
git lfs track "*.jpg"
git lfs track "*.png"
git lfs track "*.svg"

# Add .gitattributes
git add .gitattributes

# Commit dan push
git add .
git commit -m "Add Git LFS tracking for images"
git push origin main
```

## 📝 File yang Perlu Diperiksa

### 1. `src/app/page.tsx`
File ini berisi hero section dengan carousel images. Pastikan paths ke images benar.

### 2. `next.config.ts`
Tambahkan configuration untuk external domains jika menggunakan external images:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'], // Tambahkan domain eksternal jika perlu
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
```

### 3. `public/images/hero/` folder
Pastikan folder structure benar:
```
public/
└── images/
    └── hero/
        ├── bank-1.jpg
        ├── saving-1.jpg
        └── umkm-1.jpg
```

## 🔍 Troubleshooting

### Error: "The requested resource isn't a valid image"
**Solusi**: Pastikan file image ada di folder yang benar dan formatnya benar.

### Error: "404 Not Found"
**Solusi**: Cek path di component dan pastikan file ada di public folder.

### Error: "Cross origin request detected"
**Solusi**: Tambahkan configuration di `next.config.ts`:

```typescript
const nextConfig = {
  allowedDevOrigins: ['localhost:3000'],
  images: {
    // ... config lainnya
  },
}
```

## 🎯 Rekomendasi

Untuk development sekarang:
1. **Download 3 image files** dan tempatkan di `public/images/hero/`
2. **Atau gunakan CSS placeholder** sementara
3. **Untuk production**, compress images dan gunakan Next.js image optimization

Images yang dibutuhkan:
- `bank-1.jpg` (Bank building)
- `saving-1.jpg` (Saving concept)  
- `umkm-1.jpg` (UMKM concept)

Ukuran ideal: 800x400px, compressed quality 60-80%.