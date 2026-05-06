import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import styles from './Hero.module.css';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <section className={styles.heroSection} id="home">
      {/* Background System */}
      <motion.div 
        className={styles.backgroundSystem}
        style={{ opacity: backgroundOpacity }}
      >
        <div className={styles.videoWrapper}>
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085640_276ea93b-d7da-4418-a09b-2aa5b490e838.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.bgVideo}
          />
        </div>
        
        {/* Overlays */}
        <div className={styles.radialOverlay} />
        <div className={styles.linearOverlay} />
        <div className={styles.dotMesh} />
        <div className={styles.animatedGradient} />
      </motion.div>

      {/* Content */}
      <motion.div 
        className={styles.container}
        style={{ y, opacity: contentOpacity }}
      >
        <motion.div 
          className={styles.content}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
        >
          <motion.div 
            className={styles.tag}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
            }}
          >
            [ Frontend Development / Creative Direction ]
          </motion.div>

          <motion.h1 
            className={styles.headline}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
            }}
          >
            Precision in every layer.<br />
            Built for the <span className={styles.unusual}>unusual</span>
          </motion.h1>

          <motion.p 
            className={styles.description}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
            }}
          >
            I build real things and ship them — solo, end-to-end. Web apps, edited videos, scripts, full products. I combine code and AI the way most people use just one. Based in Bangladesh, working for whoever needs it done right.
          </motion.p>

          <motion.div 
            className={styles.ctaRow}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
            }}
          >
            <a 
              href="#work" 
              className={styles.primaryBtn}
              onMouseEnter={() => soundEngine.playTick()}
              onClick={() => soundEngine.playPop()}
            >
              View Work
            </a>
            <a 
              href="#contact" 
              className={styles.secondaryBtn}
              onMouseEnter={() => soundEngine.playTick()}
              onClick={() => soundEngine.playPop()}
            >
              Get in Touch <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
