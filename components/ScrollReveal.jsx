'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Lichtgewicht scroll-animaties: één IntersectionObserver over de hele site,
// pure CSS-transities (geen library, ~1,5 KB). Respecteert
// prefers-reduced-motion. Kaarten/secties faden subtiel omhoog, gestaffeld.
const SELECTOR = [
  '.sectie .kaartje',
  '.sectie .vacature',
  '.sectie .stap',
  '.sectie .cluster',
  '.sectie .grafiek',
  '.sectie .reken',
  '.sectie h2',
  '.paginakop h1',
  '.kaartwrap > *',
  '.plaatsen__stad',
  '.nieuwskaart',
  '.fotocta__kaart',
  '.statstrip__item',
].join(', ');

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll(SELECTOR));
    const perOuder = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('reveal--in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    for (const el of els) {
      if (el.classList.contains('reveal--in')) continue;
      // stagger: volgorde binnen dezelfde ouder bepaalt de vertraging (max 5 stappen)
      const ouder = el.parentElement;
      const n = perOuder.get(ouder) || 0;
      perOuder.set(ouder, n + 1);
      el.style.transitionDelay = `${Math.min(n, 5) * 70}ms`;
      el.classList.add('reveal');
      io.observe(el);
    }

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
