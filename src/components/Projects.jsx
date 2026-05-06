import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import styles from './Projects.module.css';

export default function Projects() {
  const projects = [
    {
      title: 'Agarwood Business System',
      description: 'Business management system built to replace paper records for a family agarwood operation. Offline-first with IndexedDB, syncs live to Google Sheets. Shipped and in use.',
      tags: ['PWA', 'Offline-First', 'Business'],
      link: 'https://unusual-0.github.io/test1-AW/'
    },
    {
      title: 'Quorum',
      description: 'Real-time web chat app with Firebase as the backend. Personal project — built to learn full-stack thinking from scratch. Now live.',
      tags: ['Firebase', 'Real-time', 'Experimental'],
      link: 'https://unusual-0.github.io/Quorum/'
    },
    {
      title: 'Nadi x Zahid Brand',
      description: 'Personal brand interface for a creative identity. High-end visual presence with intentional layout and motion direction.',
      tags: ['Branding', 'UI/UX', 'Frontend'],
      link: 'https://gammyxplood.github.io/NXJ-269/'
    },
    {
      title: 'The Trio of Dream',
      description: 'Collaborative portfolio for a creative collective. Built to feel like a world, not just a page — dark, immersive, intentional.',
      tags: ['Creative', 'Portfolio', 'Collab'],
      link: 'https://minhazul-islam-maain1.github.io/The-Trio-of-Dream/index.html'
    },
    {
      title: 'QR Code Generator',
      description: 'Clean, fast QR generator. No libraries, no bloat — pure JavaScript. Built and shipped as a standalone utility tool.',
      tags: ['Tool', 'Vanilla JS', 'Utility'],
      link: 'https://unusual-0.github.io/QR-generator/'
    }
  ];

  return (
    <section className={styles.projectsSection} id="work">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className={styles.sectionTitle}>Selected Work</h2>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.a 
              href={project.link}
              key={index}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
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
              onMouseEnter={() => soundEngine.playTick()}
              onClick={() => soundEngine.playPop()}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles.hoverReveal}>
                <span>View</span> <ArrowRight size={16} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
