import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

const words = ['BUILD', 'DESIGN', 'SYSTEM', 'Unusual'];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2700;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easeOutQuart = 1 - Math.pow(1 - currentStep / steps, 4);
      let newProgress = Math.min(Math.floor(easeOutQuart * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Hold for 0.5s at 100% before starting fade out
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 600); 
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const wordInterval = 2700 / 4; 
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
    }, wordInterval);

    return () => clearInterval(timer);
  }, []);

  // Calculate dynamic background based on progress
  const bgOpacity = (progress / 100) * 0.08;
  const dynamicBg = `radial-gradient(circle at center, rgba(124, 140, 255, ${bgOpacity}), #0b0b0c)`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.loaderContainer}
          style={{ background: dynamicBg }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
        >
          <div className={styles.content}>
            <div className={styles.counter}>{progress}%</div>
            <div className={styles.wordContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className={`${styles.word} ${wordIndex === 3 ? styles.unusual : ''}`}
                >
                  {words[wordIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className={styles.progressBarContainer}>
            <motion.div
              className={styles.progressBar}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
