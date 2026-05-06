import React from 'react';
import { motion } from 'framer-motion';
import { Code, Film, Layers, Target } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  const capabilities = [
    {
      title: 'Development',
      desc: 'HTML, CSS, JavaScript — pure, no-framework mastery. Progressive Web Apps, offline-first architecture, IndexedDB, Google Sheets API integration. Clean, semantic code.',
      icon: <Code size={20} strokeWidth={1.5} />
    },
    {
      title: 'Creative',
      desc: 'Video editing, visual storytelling, motion direction. Dark cinematic aesthetic. I treat design as a language, not decoration.',
      icon: <Film size={20} strokeWidth={1.5} />
    },
    {
      title: 'Technical Architecture',
      desc: 'System thinking for real-world products — not just UIs but how they fit into workflows. Built business management systems, Minecraft server administration, multi-platform project management.',
      icon: <Layers size={20} strokeWidth={1.5} />
    },
    {
      title: 'Strategy & Execution',
      desc: 'Entrepreneurially oriented. Freelance client work, long-term planning, turning ideas into shipped products. I don\'t just build — I think about why.',
      icon: <Target size={20} strokeWidth={1.5} />
    }
  ];

  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        <div className={styles.introContainer}>
          <motion.div 
            className={styles.introBlock}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <p>
              I'm <span className={styles.highlightName}>Minhaz</span> — a frontend developer and creative technologist. I build systems that are both functional and intentional, whether that's a web app, a brand interface, or a video production workflow. Based in Bangladesh, working globally.
            </p>
          </motion.div>

          <motion.div 
            className={styles.portraitWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <img 
              src="portrait.png" 
              alt="Minhaz Portrait" 
              className={styles.portrait}
            />
          </motion.div>
        </div>

        <div className={styles.grid}>
          {capabilities.map((cap, index) => (
            <motion.div 
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <div className={styles.iconWrapper}>
                {cap.icon}
              </div>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardDesc}>{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
