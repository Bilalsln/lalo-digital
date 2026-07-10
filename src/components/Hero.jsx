import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import LaloInteractiveLogo from "./LaloInteractiveLogo";

const heroTags = ["Strategy", "Interface", "Code", "Launch"];

export default function Hero({ t }) {
  return (
    <section id="top" className="section hero">
      <LaloInteractiveLogo />
      
      <div className="section-inner hero-inner">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              {t.hero.primary}
              <ArrowUpRight size={18} />
            </a>
            <a className="btn btn-secondary" href="#works">
              {t.hero.secondary}
            </a>
          </div>

          <div className="hero-stats">
            {t.hero.stats.map((item) => (
              <motion.div
                className="stat-card glass"
                key={item.label}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="hero-rail" aria-label="Studio workflow">
            {heroTags.map((tag, index) => (
              <span key={tag}>
                {String(index + 1).padStart(2, "0")} / {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
