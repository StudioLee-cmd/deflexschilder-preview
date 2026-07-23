/** @type {import('next').NextConfig} */
const nextConfig = {
  // PREVIEW: nooit indexeren — dit is een review-object, niet de live site.
  // ICP-correctie 22-07: deze opdrachtgeverpagina is verwijderd; de oude URL
  // vangen we op naar de inhuur-pillar (301) i.p.v. een 404.
  async redirects() {
    return [
      { source: '/voor-woningcorporaties', destination: '/schilders-inhuren', permanent: true },
    ];
  },
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
