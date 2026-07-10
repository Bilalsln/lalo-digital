import { motion } from "framer-motion";
import {
  Code2,
  LifeBuoy,
  MousePointerClick,
  PenTool,
  ShoppingBag,
  Smartphone
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const icons = [Code2, Smartphone, PenTool, ShoppingBag, MousePointerClick, LifeBuoy];

export default function Services({ t }) {
  return (
    <section id="services" className="section section-motion">
      <div className="section-inner">
        <SectionHeader kicker={t.services.kicker} title={t.services.title} copy={t.services.copy} />

        <div className="card-grid">
          {t.services.items.map((item, index) => {
            const Icon = icons[index];

            return (
              <motion.article
                className="service-card glass"
                key={item.title}
                initial={{ opacity: 0, y: 42, rotate: index % 2 ? 1.6 : -1.6, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                whileHover={{ y: -8, rotate: index % 2 ? 0.6 : -0.6 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.66, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
                  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
                }}
              >
                <div className="icon-bubble">
                  <Icon size={24} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
