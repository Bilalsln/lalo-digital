import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const handleMouseMove = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
};

export default memo(function Works({ t }) {
  return (
    <section id="works" className="section section-motion">
      <div className="section-inner">
        <SectionHeader kicker={t.works.kicker} title={t.works.title} copy={t.works.copy} />

        <div className="works-grid">
          {t.works.items.map((project, index) => (
            <motion.article
              className="project-card glass"
              key={project.title}
              initial={{ opacity: 0, y: 48, scale: 0.97, rotate: index % 2 ? 1.8 : -1.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
              whileHover={{ y: -10, scale: 1.01 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
            >
              <div className={`project-visual visual-${index + 1}`}>
                <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                <motion.div
                  className="project-orb"
                  animate={{ x: [0, 22, 0], y: [0, -18, 0], rotate: [0, 8, 0] }}
                  transition={{
                    duration: 5 + index * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <div className="project-content">
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className="btn btn-secondary" href="#contact">
                  {t.works.view}
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});
