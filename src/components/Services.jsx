import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, PenTool, Layout, Rocket, Monitor } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import ContactModal from './ContactModal';
import styles from './Services.module.css';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const services = [
    {
      title: 'Frontend Web Development',
      description: 'HTML, CSS, JS builds — clean, fast, no bloat. PWAs with offline support, Firebase integration, API-connected apps. I use AI to build faster, not to replace the craft.',
      icon: <Layout size={24} />,
    },
    {
      title: 'Video Editing',
      description: 'Short-form content, long-form documentaries, blog videos. Full edit from raw footage to final export. Cinematic pacing and cuts — done with intent.',
      icon: <Video size={24} />,
    },
    {
      title: 'Script & Content Writing',
      description: 'High-quality scripts for video content, brand messaging, and digital storytelling. Written to hold attention, not just fill space.',
      icon: <PenTool size={24} />,
    },
    {
      title: 'AI Workflow & Mentorship',
      description: 'I teach people how to actually use AI to build things — websites, tools, workflows. Free guidance to start. Paid remote sessions for depth.',
      icon: <Rocket size={24} />,
    },
    {
      title: 'PC Building & Setup',
      description: 'Hardware selection, full PC builds, system setup and management. Remote guidance — I walk you through it step by step. Free or paid depending on depth.',
      icon: <Monitor size={24} />,
    }
  ];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Capabilities</span>
          <h2 className={styles.sectionTitle}>What I Do</h2>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
              onClick={() => {
                setSelectedService(service.title);
                setIsModalOpen(true);
                soundEngine.playPop();
              }}
              onMouseEnter={() => soundEngine.playTick()}
            >
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceTitle={selectedService} 
      />
    </section>
  );
}
