import React, { useEffect, useRef } from 'react';
import styles from './ShapeSystem.module.css';

export default function ShapeSystem() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 12;
    const colors = [
      'rgba(124, 140, 255, 0.4)', // Vibrant Blue
      'rgba(180, 124, 255, 0.4)', // Vibrant Purple
      'rgba(124, 255, 230, 0.4)', // Cyan
      'rgba(255, 124, 180, 0.4)', // Pink
    ];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const createParticle = () => {
      const types = ['square', 'hexagon', 'triangle'];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 40 + Math.random() * 80,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        targetType: null,
        morphProgress: 0,
        morphDelay: Math.random() * 200,
      };
    };

    const drawShape = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;

      const sides = p.type === 'square' ? 4 : p.type === 'hexagon' ? 6 : 3;
      const step = (Math.PI * 2) / sides;
      
      for (let i = 0; i < sides; i++) {
        const x = Math.cos(i * step) * p.size;
        const y = Math.sin(i * step) * p.size;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        p.morphDelay--;
        if (p.morphDelay <= 0) {
          const types = ['square', 'hexagon', 'triangle'];
          p.type = types[Math.floor(Math.random() * types.length)];
          p.morphDelay = 200 + Math.random() * 300;
        }

        drawShape(p);
      });

      requestAnimationFrame(animate);
    };

    init();
    window.addEventListener('resize', init);
    animate();

    return () => window.removeEventListener('resize', init);
  }, []);

  return <canvas ref={canvasRef} className={styles.shapeCanvas} />;
}
