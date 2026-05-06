import React, { useEffect, useRef } from 'react';
import styles from './HeroBlocks.module.css';

export default function HeroBlocks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let blocks = [];
    const size = 60;
    const padding = 2;

    const colors = [
      'rgba(124, 140, 255, 0.2)', // Blue
      'rgba(180, 124, 255, 0.2)', // Purple
      'rgba(124, 255, 230, 0.2)', // Cyan
      'rgba(255, 124, 180, 0.2)', // Pink
    ];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const cols = Math.ceil(canvas.width / size);
      const rows = Math.ceil(canvas.height / size);
      
      blocks = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          blocks.push({
            x: i * size,
            y: j * size,
            type: 'square',
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.15,
            targetOpacity: Math.random() * 0.15,
            morphTimer: Math.random() * 100,
          });
        }
      }
    };

    const drawShape = (b) => {
      ctx.save();
      ctx.translate(b.x + size / 2, b.y + size / 2);
      ctx.beginPath();
      ctx.fillStyle = b.color.replace('0.2', b.opacity.toString());
      
      const s = size - padding * 2;
      const r = s / 2;

      if (b.type === 'square') {
        ctx.rect(-r, -r, s, s);
      } else if (b.type === 'hexagon') {
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else if (b.type === 'triangle') {
        for (let i = 0; i < 3; i++) {
          const angle = (i * 2 * Math.PI) / 3 - Math.PI / 2;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      blocks.forEach(b => {
        b.opacity += (b.targetOpacity - b.opacity) * 0.05;
        if (Math.abs(b.targetOpacity - b.opacity) < 0.01) {
          b.targetOpacity = Math.random() * 0.15;
        }

        b.morphTimer--;
        if (b.morphTimer <= 0) {
          const types = ['square', 'hexagon', 'triangle'];
          b.type = types[Math.floor(Math.random() * types.length)];
          b.morphTimer = 300 + Math.random() * 500;
          b.color = colors[Math.floor(Math.random() * colors.length)];
        }

        drawShape(b);
      });

      requestAnimationFrame(animate);
    };

    init();
    window.addEventListener('resize', init);
    animate();

    return () => window.removeEventListener('resize', init);
  }, []);

  return <canvas ref={canvasRef} className={styles.blocksCanvas} />;
}
