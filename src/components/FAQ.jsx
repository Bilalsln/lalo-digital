import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function FAQ({ t }) {
  const [active, setActive] = useState(0);

  return (
    <section className="section section-motion">
      <div className="section-inner">
        <SectionHeader kicker={t.faq.kicker} title={t.faq.title} />

        <div className="faq-list">
          {t.faq.items.map((item, index) => {
            const isOpen = active === index;

            return (
              <motion.article
                className="faq-item glass"
                key={item.question}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                whileHover={{ x: 6 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  className="faq-button"
                  type="button"
                  onClick={() => setActive(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }}>
                    <Plus size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
