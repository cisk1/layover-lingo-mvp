/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export'
  // If your repo is not at the root domain, set the basePath and assetPrefix:
  // basePath: '/REPO_NAME',
  // assetPrefix: '/REPO_NAME/',
}

export default nextConfig;
