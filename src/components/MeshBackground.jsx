import React, { useEffect, useRef } from 'react';
import styles from './MeshBackground.module.css';

export default function MeshBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, isOnPage: false });
  const dotsRef = useRef([]);
  const requestRef = useRef();
  const opacityRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isOnPage = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isOnPage = false;
    };

    const handleScroll = () => {
      const h = window.innerHeight;
      // Start appearing after 60% of Hero, fully visible at About
      const o = Math.min(1, Math.max(0, (window.scrollY - h * 0.6) / (h * 0.4)));
      opacityRef.current = o;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    const SPACING = 20; // Slightly larger spacing for cleaner look
    const DOT_RADIUS = 1.2;
    const INFLUENCE_RADIUS = 100;
    const MAX_DISPLACEMENT = 6;
    const LERP_SPEED = 0.08;

    const initGrid = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      
      // Reset transform then scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / SPACING) + 2;
      const rows = Math.ceil(h / SPACING) + 2;
      const offsetX = (w % SPACING) / 2;
      const offsetY = (h % SPACING) / 2;

      const dots = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING + offsetX - SPACING;
          const y = j * SPACING + offsetY - SPACING;
          dots.push({ ox: x, oy: y, x: x, y: y, tx: x, ty: y });
        }
      }
      dotsRef.current = dots;
    };

    const smoothstep = (t) => t * t * (3 - 2 * t);

    const tick = () => {
      const opacity = opacityRef.current;
      canvas.style.opacity = opacity;

      if (opacity > 0) {
        // IMPORTANT: Clear using CSS units because of the scale transform
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        const { x: mx, y: my, isOnPage } = mouseRef.current;
        const dots = dotsRef.current;

        ctx.beginPath();
        for (const dot of dots) {
          if (isOnPage) {
            const dx = dot.ox - mx;
            const dy = dot.oy - my;
            const distSq = dx * dx + dy * dy;

            if (distSq < 10000) { // 100 * 100
              const dist = Math.sqrt(distSq);
              const force = (100 - dist) / 100;
              dot.tx = dot.ox + (dx / dist) * force * MAX_DISPLACEMENT;
              dot.ty = dot.oy + (dy / dist) * force * MAX_DISPLACEMENT;
            } else {
              dot.tx = dot.ox;
              dot.ty = dot.oy;
            }
          } else {
            dot.tx = dot.ox;
            dot.ty = dot.oy;
          }

          dot.x += (dot.tx - dot.x) * LERP_SPEED;
          dot.y += (dot.ty - dot.y) * LERP_SPEED;

          // Draw dot
          ctx.moveTo(dot.x + DOT_RADIUS, dot.y);
          ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.12})`;
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    initGrid();
    window.addEventListener('resize', initGrid);
    requestRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', initGrid);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.meshCanvas}
    />
  );
}
