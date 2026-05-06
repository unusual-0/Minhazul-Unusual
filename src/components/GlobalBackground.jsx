import React from 'react';
import styles from './GlobalBackground.module.css';

export default function GlobalBackground() {
  return (
    <div className={styles.bgContainer}>
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
      <div className={styles.radialOverlay} />
      <div className={styles.linearOverlay} />
      <div className={styles.animatedGradient} />
    </div>
  );
}
