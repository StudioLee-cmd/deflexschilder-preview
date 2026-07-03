/** @type {import('next').NextConfig} */
const nextConfig = {
  // PREVIEW: nooit indexeren — dit is een review-object, niet de live site.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
