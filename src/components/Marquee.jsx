export default function Marquee({ t }) {
  const text = `${t.marquee} • `;

  return (
    <section className="marquee" aria-label="Studio capabilities">
      <div className="marquee-track">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index}>{text}</span>
        ))}
      </div>
    </section>
  );
}
