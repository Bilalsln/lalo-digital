import { memo } from "react";
import { motion } from "framer-motion";

export default memo(function Studio({ t }) {
  return (
    <section id="studio" className="studio-band">
      <motion.div
        className="section-kicker section-inner"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {t.studio.kicker}
      </motion.div>

      <motion.h2
        className="studio-statement"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75 }}
      >
        {t.studio.statement.split(" ").map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className={index % 5 === 0 ? "gradient-text" : ""}
            initial={{ opacity: 0, y: 28, rotate: index % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.52, delay: index * 0.018, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.h2>

      <motion.p
        className="studio-copy"
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.12 }}
      >
        {t.studio.copy}
      </motion.p>
    </section>
  );
});
