import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Pricing({ t }) {
  return (
    <section id="pricing" className="section section-motion">
      <div className="section-inner">
        <SectionHeader kicker={t.pricing.kicker} title={t.pricing.title} copy={t.pricing.copy} />

        <div className="pricing-grid">
          {t.pricing.items.map((item, index) => (
            <motion.article
              className="price-card glass"
              key={item.title}
              initial={{ opacity: 0, y: 42, rotate: index % 2 ? 1.4 : -1.4, filter: "blur(9px)" }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
              whileHover={{ y: -8, scale: 1.012 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.62, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
              }}
            >
              <h3>{item.title}</h3>
              <strong className="price">{item.price}</strong>

              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a className="btn btn-primary" href="#contact">
                {t.pricing.cta}
                <ArrowUpRight size={17} />
              </a>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="pricing-note"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.56, delay: 0.1 }}
        >
          {t.pricing.note}
        </motion.p>
      </div>
    </section>
  );
}
