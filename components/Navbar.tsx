'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const S = {
  cormorant: { fontFamily: "'Cormorant Garamond', serif" },
  dmSans: { fontFamily: "'DM Sans', sans-serif" },
  lora: { fontFamily: "'Lora', serif" },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          backgroundColor: scrolled ? 'rgba(245,240,234,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(214,201,178,0.4)' : 'none',
          transition: 'all 0.6s ease',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none' }}>
          <p style={{ ...S.cormorant, fontSize: '13px', letterSpacing: '0.28em', color: '#1C1C1C', textTransform: 'uppercase', fontWeight: 300, marginBottom: '2px' }}>
            Studio Panjabutha
          </p>
          <p style={{ ...S.dmSans, fontSize: '8px', letterSpacing: '0.38em', color: '#B5603A', textTransform: 'uppercase' }}>
            Architecture · Interior · Construction
          </p>
        </a>

        {/* Desktop links */}
        <nav style={{ display: 'flex', gap: '40px' }} className="hidden md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ color: '#B5603A' }}
              style={{
                ...S.dmSans,
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(28,28,28,0.55)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 9 : 0 }}
            style={{ display: 'block', width: '22px', height: '1px', backgroundColor: '#1C1C1C', transformOrigin: 'center' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            style={{ display: 'block', width: '22px', height: '1px', backgroundColor: '#1C1C1C' }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -9 : 0 }}
            style={{ display: 'block', width: '22px', height: '1px', backgroundColor: '#1C1C1C', transformOrigin: 'center' }}
          />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              backgroundColor: '#F5F0EA',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '36px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  ...S.cormorant,
                  fontSize: '42px',
                  fontWeight: 300,
                  color: '#1C1C1C',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                ...S.dmSans,
                fontSize: '9px',
                letterSpacing: '0.4em',
                color: '#B5603A',
                textTransform: 'uppercase',
                marginTop: '20px',
              }}
            >
              Architecture · Interior · Construction
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
