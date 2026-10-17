/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  async redirects() {
  return [
    { source: '/what_to_buy', destination: '/products', permanent: true },
    { source: '/detailpage/16', destination: '/products', permanent: true },
    { source: '/detailpage/:id', destination: '/', permanent: true },
    { source: '/home&outdoor', destination: '/', permanent: true },
    { source: '/holidays&gatherings', destination: '/', permanent: true },
    { source: '/food&recipes', destination: '/', permanent: true },
    { source: '/entertainment&culture', destination: '/', permanent: true },
    { source: '/sports', destination: '/', permanent: true },
    { source: '/health', destination: '/', permanent: true },
    { source: '/travel', destination: '/', permanent: true },
    { source: '/contact', destination: '/about', permanent: true },
    { source: '/sign_in', destination: '/', permanent: true },
    { source: '/privacy_policy', destination: '/privacy', permanent: true },
    { source: '/terms&conditions', destination: '/terms', permanent: true },
  ];
},

};

export default nextConfig;
