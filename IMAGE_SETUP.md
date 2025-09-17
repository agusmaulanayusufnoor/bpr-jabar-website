# Image Setup Guide

## 📸 Format Gambar

**⚡ Update**: Semua gambar sekarang menggunakan format **WebP** untuk performa yang lebih baik dan ukuran file yang lebih ringan.

### Keuntungan WebP:
- **Ukuran file lebih kecil** (25-35% lebih kecil dari JPG)
- **Kualitas visual yang sama** atau lebih baik
- **Loading time lebih cepat** untuk website
- **Support oleh semua browser modern**

### File yang sudah dikonversi:
- Hero images: `bank-1.webp`, `saving-1.webp`, `umkm-1.webp`
- Berita images: `penghargaan-2024.webp`, `literasi-keuangan.webp`, `mobile-banking.webp`, `sinergi-pemda.webp`, `digitalisasi.webp`
- Pengurus images: `komisaris-utama.webp`, `komisaris-1.webp`, `komisaris-2.webp`, `direktur-utama.webp`, `direktur-operasional.webp`, `direktur-kepatuhan.webp`

## 🖼️ Current Issue

Image files di folder `public/images/hero/` tidak bisa diupload ke GitHub karena ukurannya terlalu besar untuk GitHub API limits. Hal ini menyebabkan error 404 saat mencoba mengakses images di development server.

## 🔧 Solusi Cepat (Untuk Development)

### Opsi 1: Download Images Manual

1. **Download images dari server local** atau generate ulang
2. **Tempatkan di folder** `public/images/hero/` di local Anda
3. **Images yang dibutuhkan:**
   - `bank-1.webp` - Bank building exterior
   - `saving-1.webp` - Saving concept
   - `umkm-1.webp` - UMKM concept

### Opsi 2: Generate Images Baru

Gunakan AI image generator atau download dari stock photo websites:

#### Bank Building Image
- **Prompt**: "Modern bank building exterior, green architecture, professional, daylight"
- **Ukuran**: 1024x1024
- **Simpan sebagai**: `public/images/hero/bank-1.webp`

#### Saving Concept Image  
- **Prompt**: "People saving money, happy customers, bank interior, green theme"
- **Ukuran**: 1024x1024
- **Simpan sebagai**: `public/images/hero/saving-1.webp`

#### UMKM Concept Image
- **Prompt**: "Small business owners, entrepreneurship, business growth, green theme"
- **Ukuran**: 1024x1024
- **Simpan sebagai**: `public/images/hero/umkm-1.webp`

### Opsi 3: Gunakan CSS Gradient Placeholder

Untuk development sementara, Anda bisa mengganti images dengan CSS gradients:

1. **Buka file** `src/app/page.tsx`
2. **Cari bagian carousel images**
3. **Ganti dengan div berstyle gradient**

Contoh:
```tsx
// Ganti ini:
<Image
  src="/images/hero/bank-1.webp"
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

# Konversi JPG ke WebP dan compress
convert public/images/hero/bank-1.jpg -quality 80 -resize 800x400 public/images/hero/bank-1.webp
convert public/images/hero/saving-1.jpg -quality 80 -resize 800x400 public/images/hero/saving-1.webp
convert public/images/hero/umkm-1.jpg -quality 80 -resize 800x400 public/images/hero/umkm-1.webp

# Atau gunakan cwebp (Google WebP tool)
# Install: sudo apt-get install webp
cwebp -q 80 bank-1.jpg -o bank-1.webp
cwebp -q 80 saving-1.jpg -o saving-1.webp
cwebp -q 80 umkm-1.jpg -o umkm-1.webp
```

### 2. Batch Conversion Script

Untuk konversi massal dari JPG ke WebP:

```bash
#!/bin/bash
# save as convert_to_webp.sh

# Buat direktori backup
mkdir -p backup_images

# Konversi semua JPG ke WebP
for file in *.jpg; do
    if [ -f "$file" ]; then
        # Backup file original
        cp "$file" backup_images/
        
        # Konversi ke WebP dengan kualitas 80%
        cwebp -q 80 "$file" -o "${file%.jpg}.webp"
        
        echo "Converted $file to ${file%.jpg}.webp"
    fi
done

echo "Conversion complete! Original files backed up in backup_images/"
```

### 3. Use Next.js Image Optimization

Next.js memiliki built-in image optimization. Pastikan Anda menggunakan `next/image` component:

```tsx
import Image from 'next/image'

// Di component Anda
<Image
  src="/images/hero/bank-1.webp"
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
git lfs track "*.webp"
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
        ├── bank-1.webp
        ├── saving-1.webp
        └── umkm-1.webp
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
- `bank-1.webp` (Bank building)
- `saving-1.webp` (Saving concept)  
- `umkm-1.webp` (UMKM concept)

Ukuran ideal: 800x400px, compressed quality 60-80%.