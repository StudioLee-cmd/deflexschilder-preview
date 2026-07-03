// AI-voorbeeldbeeld met badge — placeholders ter goedkeuring door André.
// Bij akkoord worden dit definitieve beelden (of vervangen door eigen fotografie).
export default function BeeldAI({ src, alt, ratio, badge = 'AI-voorbeeldbeeld — ter goedkeuring' }) {
  return (
    <figure className="aibeeld" style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={src} alt={alt} loading="lazy" />
      <figcaption className="aibeeld__badge">{badge}</figcaption>
    </figure>
  );
}
