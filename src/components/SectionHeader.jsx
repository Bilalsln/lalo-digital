import { memo } from "react";
import { motion } from "framer-motion";

function EmphasizedTitle({ children }) {
  const words = children.split(" ");

  return (
    <>
      {words.slice(0, -2).join(" ")} <span>{words.slice(-2).join(" ")}</span>
    </>
  );
}

export default memo(function SectionHeader({ kicker, title, copy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-kicker">{kicker}</div>
      <h2 className="section-title">
        <EmphasizedTitle>{title}</EmphasizedTitle>
      </h2>
      {copy && <p className="section-copy">{copy}</p>}
    </motion.div>
  );
});
