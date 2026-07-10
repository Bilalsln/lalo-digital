import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import Works from '../components/Works';
import Studio from '../components/Studio';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { translations } from '../data/translations';

export default function App() {
  const [language, setLanguage] = useState("tr");
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const target = document.querySelector(anchor.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="site-shell">
      <AnimatedBackground />
      <Navbar language={language} setLanguage={setLanguage} t={t} />

      <AnimatePresence mode="wait">
        <motion.main
          key={language}
          initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(12px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero t={t} />
          <Marquee t={t} />
          <Services t={t} />
          <Works t={t} />
          <Studio t={t} />
          <Process t={t} />
          <Pricing t={t} />
          <FAQ t={t} />
          <Contact t={t} />
        </motion.main>
      </AnimatePresence>

      <Footer t={t} />
    </div>
  );
}
