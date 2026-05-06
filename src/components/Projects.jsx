import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import styles from './Projects.module.css';

export default function Projects() {
  const projects = [
    {
      title: 'Agarwood Business System',
      description: 'Advanced business management PWA with offline-first architecture, IndexedDB integration, and real-time Google Sheets synchronization.',
      tags: ['PWA', 'Vanilla JS', 'Business'],
      link: 'https://unusual-0.github.io/test1-AW/'
    },
    {
      title: 'Nadi X Zahid Brand',
      description: 'High-end personal brand interface designed for premium digital presence and creative storytelling.',
      tags: ['Branding', 'Motion', 'UI/UX'],
      link: 'https://gammyxplood.github.io/NXJ-269/'
    },
    {
      title: 'Smiley Cake Studio',
      description: 'Commercial website with custom cake builder UI and automated notification system.',
      tags: ['React', 'E-commerce', 'UI/UX'],
      link: '#'
    },
    {
      title: 'The Trio of Dream',
      description: 'Collaborative cinematic portfolio for a creative collective. Focused on dark, immersive visual experiences.',
      tags: ['Creative', 'Portfolio', 'Frontend'],
      link: 'https://minhazul-islam-maain1.github.io/The-Trio-of-Dream/index.html'
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
