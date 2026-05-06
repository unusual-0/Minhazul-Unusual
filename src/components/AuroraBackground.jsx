import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './AuroraBackground.module.css';

export default function AuroraBackground() {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Fade in aurora after hero (0 to 1 between 20% and 80% of first viewport)
  const opacity = useTransform(scrollY, [0, 800], [0, 0.4]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;
      
      // Draw 3 moving blobs for aurora effect (coordinated slow drift)
      const blobs = [
        { x: 0.2, y: 0.3, r: 0.6, c: 'rgba(124, 140, 255, 0.3)', speed: 0.0002 },
        { x: 0.8, y: 0.7, r: 0.7, c: 'rgba(180, 124, 255, 0.25)', speed: 0.0003 },
        { x: 0.5, y: 0.5, r: 0.8, c: 'rgba(124, 255, 230, 0.2)', speed: 0.00015 },
      ];

      blobs.forEach((b, i) => {
        const x = w * (b.x + Math.sin(time * b.speed + i) * 0.1);
        const y = h * (b.y + Math.cos(time * b.speed * 0.8 + i) * 0.1);
        const radius = Math.min(w, h) * b.r;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, b.c);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      time += 16;
      requestAnimationFrame(drawAurora);
    };

    window.addEventListener('resize', resize);
    resize();
    drawAurora();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <motion.div 
      className={styles.auroraContainer}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className={styles.auroraCanvas} />
    </motion.div>
  );
}
