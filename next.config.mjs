/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: { optimizePackageImports: ["@supabase/supabase-js"] },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};
export default nextConfig;
