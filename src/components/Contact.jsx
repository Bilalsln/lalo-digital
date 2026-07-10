import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Contact({ t }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("https://formsubmit.co/ajax/lalodigital.contact@gmail.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      setSent(true);
      form.reset();
    } catch (error) {
      console.error(error);
      setSent(true);
      form.reset();
    }
  };

  return (
    <section id="contact" className="section section-motion">
      <div className="section-inner">
        <SectionHeader kicker={t.contact.kicker} title={t.contact.title} copy={t.contact.copy} />

        <div className="contact-grid">
          <motion.div
            className="contact-panel glass"
            initial={{ opacity: 0, x: -32, rotate: -1, filter: "blur(9px)" }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>LALO Digital</h3>
            <p>{t.contact.copy}</p>

            <div className="contact-actions">
              <a
                className="btn btn-primary"
                href="https://wa.me/6283176832131"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                {t.contact.whatsapp}
              </a>
              <a className="btn btn-secondary" href="mailto:lalodigital.contact@gmail.com">
                <Mail size={18} />
                {t.contact.email}
              </a>
            </div>

            <div className="contact-methods" aria-label="Direct contact options">
              <a href="https://wa.me/6283176832131" target="_blank" rel="noreferrer">
                <strong>{t.contact.whatsapp}</strong>
                <small>+62 831-7683-2131</small>
              </a>
              <a href="mailto:lalodigital.contact@gmail.com">
                <strong>{t.contact.email}</strong>
                <small>lalodigital.contact@gmail.com</small>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact-panel glass"
            initial={{ opacity: 0, x: 32, rotate: 1, filter: "blur(9px)" }}
            whileInView={{ opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.66, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-row">
                <label htmlFor="name">{t.contact.form.name}</label>
                <input id="name" name="name" type="text" required />
              </div>

              <div className="input-row">
                <label htmlFor="email">{t.contact.form.email}</label>
                <input id="email" name="email" type="email" required />
              </div>

              <div className="input-row">
                <label htmlFor="project">{t.contact.form.project}</label>
                <select id="project" name="project" required defaultValue="">
                  <option value="" disabled>
                    {t.contact.form.project}
                  </option>
                  {t.contact.form.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-row">
                <label htmlFor="message">{t.contact.form.message}</label>
                <textarea id="message" name="message" required />
              </div>

              {sent && <div className="success-message">{t.contact.form.success}</div>}

              <button className="btn btn-primary" type="submit">
                {t.contact.form.send}
                <ArrowUpRight size={17} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
