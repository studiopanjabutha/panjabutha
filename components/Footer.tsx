'use client';

import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '60px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h3 
          style={{ fontSize: '24px', fontWeight: 200, marginBottom: '20px', letterSpacing: '0.2em', color: 'white' }}
          animate={{
            textShadow: [
              '0 0 10px rgba(255,255,255,0.3)',
              '0 0 20px rgba(255,255,255,0.5)',
              '0 0 10px rgba(255,255,255,0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          STUDIO PANJABUTHA
        </motion.h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: 300, marginBottom: '24px' }}>
          Creating exceptional spaces through innovative architecture
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
          {[
            { icon: <Instagram size={18} />, href: '#' },
            { icon: <Linkedin size={18} />, href: '#' }
          ].map((social, i) => (
            <motion.a 
              key={i}
              href={social.href}
              style={{ 
                width: '40px', 
                height: '40px', 
                border: '1px solid rgba(255,255,255,0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'rgba(255,255,255,0.7)',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                textDecoration: 'none',
              }}
              whileHover={{ 
                scale: 1.2,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(147,51,234,0.5)',
                boxShadow: '0 0 20px rgba(147,51,234,0.5)',
              }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { name: 'Home', href: '/' },
            { name: 'Projects', href: '/projects' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              style={{ 
                color: 'rgba(255,255,255,0.6)', 
                fontSize: '14px', 
                fontWeight: 300,
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <motion.p 
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontWeight: 300 }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          © {new Date().getFullYear()} Studio Panjabutha. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
