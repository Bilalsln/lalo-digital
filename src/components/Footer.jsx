export default function Footer({ t }) {
  const links = [
    ["#services", t.nav.services],
    ["#works", t.nav.works],
    ["#studio", t.nav.studio],
    ["#process", t.nav.process],
    ["#pricing", t.nav.pricing],
    ["#contact", t.nav.contact]
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <a className="logo" href="#top">
            <span>
              LALO Digital
              <small>Software Studio</small>
            </span>
          </a>
          <p>{t.footer.description}</p>
        </div>

        <div>
          <h4>{t.footer.quickLinks}</h4>
          {links.slice(0, 4).map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>

        <div>
          <h4>{t.footer.services}</h4>
          {t.services.items.slice(0, 4).map((item) => (
            <a key={item.title} href="#services">
              {item.title}
            </a>
          ))}
        </div>

        <div>
          <h4>{t.footer.contact}</h4>
          <a href="mailto:lalodigital.contact@gmail.com">lalodigital.contact@gmail.com</a>
          <a href="https://wa.me/6283176832131" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t.footer.copyright}</span>
        <span>{t.footer.craft}</span>
      </div>
    </footer>
  );
}
