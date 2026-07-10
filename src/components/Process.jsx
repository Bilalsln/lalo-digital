import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function Process({ t }) {
  return (
    <section id="process" className="section section-motion">
      <div className="section-inner">
        <SectionHeader kicker={t.process.kicker} title={t.process.title} copy={t.process.copy} />

        <div className="process-list">
          {t.process.steps.map((step, index) => (
            <motion.article
              className="process-step glass"
              key={step.title}
              initial={{ opacity: 0, x: index % 2 ? 46 : -46, filter: "blur(9px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              whileHover={{ scale: 1.015, x: 6 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.62, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="process-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
