/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // When photography moves to Supabase Storage, add its host here, e.g.:
    // remotePatterns: [{ protocol: 'https', hostname: 'YOUR-PROJECT.supabase.co' }],
  },
};

export default nextConfig;
