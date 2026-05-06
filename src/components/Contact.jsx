import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Terminal, Camera, MessageCircle } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const links = [
    {
      label: 'minhazulislammaain2009@gmail.com',
      icon: <Mail size={18} strokeWidth={1.5} />,
      href: 'mailto:minhazulislammaain2009@gmail.com'
    },
    {
      label: 'github.com/unusual-0', // Assuming github handle
      icon: <Terminal size={18} strokeWidth={1.5} />,
      href: 'https://github.com/unusual-0'
    },
    {
      label: '@enma.minz',
      icon: <Camera size={18} strokeWidth={1.5} />,
      href: 'https://instagram.com/enma.minz'
    },
    {
      label: 'unusual_101',
      icon: <MessageCircle size={18} strokeWidth={1.5} />,
      href: '#'
    }
  ];

  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className={styles.headline}>Let's build something meaningful.</h2>
          <p className={styles.subtext}>
            Whether it's a frontend system, a creative project, or just a conversation — I'm open.
          </p>
        </motion.div>

        <div className={styles.links}>
          {links.map((link, index) => (
            <motion.a 
              key={index}
              href={link.href}
              className={styles.linkRow}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onMouseEnter={() => soundEngine.playTick()}
              onClick={() => soundEngine.playPop()}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
            >
              <div className={styles.linkLeft}>
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.label}>{link.label}</span>
              </div>
              <ArrowRight size={16} className={styles.arrow} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
