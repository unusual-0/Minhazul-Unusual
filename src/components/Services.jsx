import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, PenTool, Layout, Rocket } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import ContactModal from './ContactModal';
import styles from './Services.module.css';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const services = [
    {
      title: 'Cinematic Post-Production',
      description: 'Master-level video engineering specializing in short-form virality and long-form cinematic storytelling. We handle the full spectrum of motion direction and high-fidelity editing.',
      icon: <Video size={24} />,
    },
    {
      title: 'Digital Content Strategy',
      description: 'Architecting viral reaction content and high-retention scripts. We merge creative writing with data-driven content creation for maximum digital impact.',
      icon: <PenTool size={24} />,
    },
    {
      title: '3D Interactive Engineering',
      description: 'Building professional-grade 3D interactive web systems. We specialize in merging fluid motion with technical precision to create intentional digital brand interfaces.',
      icon: <Layout size={24} />,
    },
    {
      title: 'AI Development Mentorship',
      description: 'Consultancy on building state-of-the-art websites using advanced AI integration. We teach the bridge between prompt engineering and professional web architecture.',
      icon: <Rocket size={24} />,
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
          <h2 className={styles.sectionTitle}>What We Do</h2>
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
