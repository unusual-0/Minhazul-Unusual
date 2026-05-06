import React from 'react';
import { motion } from 'framer-motion';
import { Code, Film, Layers, Target } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  const capabilities = [
    {
      title: 'Development',
      desc: 'HTML, CSS, JavaScript — no-framework builds that actually ship. PWAs, offline-first architecture, Firebase backend, Google Sheets API integration. I also use AI tools to build faster without cutting corners.',
      icon: <Code size={20} strokeWidth={1.5} />
    },
    {
      title: 'Creative',
      desc: 'Video editing across formats — short-form content, long-form documentaries, blog videos. Script writing built for retention. Dark cinematic aesthetic runs through everything I make.',
      icon: <Film size={20} strokeWidth={1.5} />
    },
    {
      title: 'Systems & Hardware',
      desc: 'PC building, hardware selection, full system setup and management. Real-world system thinking — from business management tools to Minecraft server administration. I know how things fit together.',
      icon: <Layers size={20} strokeWidth={1.5} />
    },
    {
      title: 'Ship & Deliver',
      desc: 'Freelance projects for real clients, products built for real problems. I plan, build, and deliver — solo. Not just technically, but knowing what the client actually needs.',
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
