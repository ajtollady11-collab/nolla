/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // WebP only: AVIF smears fine textures (fur, fleece) into a waxy look
    formats: ['image/webp'],
    qualities: [75, 90],
    // When photography moves to Supabase Storage, add its host here, e.g.:
    // remotePatterns: [{ protocol: 'https', hostname: 'YOUR-PROJECT.supabase.co' }],
  },
};

export default nextConfig;
