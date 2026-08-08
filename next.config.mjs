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
    // SLOT 3 VAN 3 — de X-Robots-Tag-header. Deze dekt wat een robots-meta niet kán dekken:
    // sitemap.xml, de afbeeldingen en de API-routes dragen geen HTML en dus geen meta-tag.
    // Zolang NEXT_PUBLIC_INDEXEERBAAR niet op '1' staat krijgt élk antwoord de noindex.
    //
    // Op de livegang-dag VALT DE HEADER WEG in plaats van op 'index' te gaan staan. Dat is
    // bewust: geen X-Robots-Tag is de normale toestand van een indexeerbare site, en een
    // expliciete index-header zou een tweede uitspraak zijn naast de robots-meta uit
    // app/layout.jsx — twee bronnen die kunnen gaan afwijken (RULE 3).
    if (process.env.NEXT_PUBLIC_INDEXEERBAAR === '1') return [];
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
