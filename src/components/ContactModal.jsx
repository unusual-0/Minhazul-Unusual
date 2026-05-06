import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import styles from './ContactModal.module.css';

export default function ContactModal({ isOpen, onClose, serviceTitle }) {
  const [formData, setFormData] = useState({
    email: '',
    details: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    soundEngine.playPop();

    try {
      const response = await fetch('https://formspree.io/f/mojrvbrj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: serviceTitle,
          _subject: `New Inquiry: ${serviceTitle}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', details: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>

            {status === 'success' ? (
              <motion.div 
                className={styles.successState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3>Message Sent.</h3>
                <p>We'll be in touch soon.</p>
                <button className={styles.backBtn} onClick={onClose}>Close</button>
              </motion.div>
            ) : (
              <>
                <div className={styles.header}>
                  <span className={styles.label}>Inquiry for</span>
                  <h2 className={styles.title}>{serviceTitle}</h2>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Project Details</label>
                    <textarea 
                      required 
                      placeholder="Tell us about your project..."
                      rows={5}
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                  </button>
                  
                  {status === 'error' && (
                    <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
