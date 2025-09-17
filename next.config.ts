import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    allowedDevOrigins: ['localhost:3000','127.0.0.1:3000','http://127.0.0.1:3000', 'http://localhost:3000','local-origin.dev',         // Tambahkan origin tambahan jika kamu menggunakan custom domain
    '*.local-origin.dev',],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
