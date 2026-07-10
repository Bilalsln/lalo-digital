import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar({ language, setLanguage, t }) {
  const [open, setOpen] = useState(false);

  const links = [
    ["#services", t.nav.services],
    ["#works", t.nav.works],
    ["#studio", t.nav.studio],
    ["#process", t.nav.process],
    ["#pricing", t.nav.pricing],
    ["#contact", t.nav.contact]
  ];

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <motion.nav
        className="nav-inner glass"
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <a className="logo" href="#top" onClick={closeMenu}>
          <span>
            LALO Digital
            <small>Software Studio</small>
          </span>
        </a>

        <div className="nav-links">
          {links.map(([href, label]) => (
            <motion.a
              key={href}
              href={href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              {label}
            </motion.a>
          ))}
        </div>

        <div className="nav-actions">
          <div className="lang-switcher" aria-label="Language switcher">
            <button
              className={language === "tr" ? "active" : ""}
              type="button"
              onClick={() => setLanguage("tr")}
            >
              TR
            </button>
            <button
              className={language === "en" ? "active" : ""}
              type="button"
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>

          <motion.a
            className="btn btn-primary nav-cta"
            href="#contact"
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.nav.cta}
            <ArrowUpRight size={17} />
          </motion.a>

          <button
            className="menu-button"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={closeMenu}>
                <strong>{label}</strong>
              </a>
            ))}

            <a className="btn btn-primary" href="#contact" onClick={closeMenu}>
              {t.nav.cta}
              <ArrowUpRight size={17} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
