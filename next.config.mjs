/** @type {import('next').NextConfig} */
const nextConfig = {
  // ICP-correctie 22-07: deze opdrachtgeverpagina is verwijderd; de oude URL
  // vangen we op naar de inhuur-pillar (301) i.p.v. een 404.
  async redirects() {
    return [
      { source: '/voor-woningcorporaties', destination: '/schilders-inhuren', permanent: true },
      { source: '/contact', destination: '/aanvraag', permanent: true },
      { source: '/diensen', destination: '/schilders-inhuren', permanent: true },
      { source: '/services/uitzenden', destination: '/schilders-inhuren', permanent: true },
      { source: '/services/detachering', destination: '/schilders-inhuren', permanent: true },
      { source: '/services/werving-selectie', destination: '/schilders-inhuren', permanent: true },
      { source: '/kandidaten', destination: '/inschrijven', permanent: true },
      { source: '/vacature-plaatsen', destination: '/aanvraag', permanent: true },
      { source: '/vacatures/vacature', destination: '/vacatures', permanent: true },
      { source: '/vacatures/vacature/solliciteren', destination: '/vacatures', permanent: true },
      { source: '/vacatures/glaszetter/11815', destination: '/vacatures', permanent: true },
      { source: '/vacatures/vakman-schilder/11814', destination: '/vacatures', permanent: true },
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
