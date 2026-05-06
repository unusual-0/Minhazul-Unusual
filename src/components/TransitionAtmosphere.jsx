import React, { useEffect, useState } from 'react';
import styles from './TransitionAtmosphere.module.css';

export default function TransitionAtmosphere() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const height = window.innerHeight;
  // Peak at about 1.0 viewports down (start of About)
  // Transition from 0 at Hero top to 0.4 at Hero bottom/About top
  const opacity = Math.max(0, Math.min(0.4, 1 - Math.abs(scrollY - height) / height));

  return (
    <div className={styles.bgContainer} style={{ opacity }}>
      <div className={styles.blob} />
    </div>
  );
}
