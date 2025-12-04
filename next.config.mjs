/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Empêche l'export statique type `next export`
  images: {
    unoptimized: true,
  },
}

export default nextConfig
