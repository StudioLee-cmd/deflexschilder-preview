import Link from 'next/link';

// Cluster-template (hub-and-spoke zichtbaar gemaakt): elke pillar toont zijn
// ondersteunende artikelen — live of "binnenkort". Zo ziet André precies hoe
// het cluster rond elke pillar groeit (het model waarmee de concurrentie rankt).
export default function ClusterBlok({ titel, intro, items }) {
  return (
    <div className="cluster">
      <div className="cluster__kop">
        <h3 style={{ fontSize: 19 }}>{titel}</h3>
        <span className="meta" style={{ fontSize: 13, color: 'var(--tekst-licht)' }}>
          cluster-template · pillar + ondersteunende artikelen
        </span>
      </div>
      {intro && <p style={{ marginTop: 8, fontSize: 15 }}>{intro}</p>}
      <div className="cluster__items">
        {items.map((it) => (
          <div key={it.titel} className="cluster__item">
            {it.href ? (
              <Link href={it.href}>{it.titel}</Link>
            ) : (
              <span className="binnenkort">
                {it.titel} <span className="tag">binnenkort</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
