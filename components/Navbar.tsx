'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s',
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.5)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              href="/"
              style={{ 
                fontSize: '18px', 
                fontWeight: 300, 
                letterSpacing: '0.2em', 
                color: 'white',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              className="text-sm md:text-xl"
            >
              STUDIO PANJABUTHA
            </Link>
          </motion.div>

          {/* Desktop Menu - Shows on desktop only */}
          <div 
            className="hidden md:flex"
            style={{ 
              gap: '48px', 
              alignItems: 'center'
            }} 
          >
            {[
              { name: 'HOME', href: '/' },
              { name: 'PROJECTS', href: '/projects' },
              { name: 'ABOUT', href: '/about' },
              { name: 'CONTACT', href: '/contact' }
            ].map((item, i) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Link 
                  href={item.href}
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: 300, 
                    letterSpacing: '0.15em', 
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button - Shows on mobile only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:hidden"
            style={{ 
              color: 'white', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              zIndex: 60,
              padding: '8px',
            }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              paddingBottom: '24px', 
              paddingTop: '16px',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              marginTop: '0',
            }} 
            className="md:hidden"
          >
            {[
              { name: 'HOME', href: '/' },
              { name: 'PROJECTS', href: '/projects' },
              { name: 'ABOUT', href: '/about' },
              { name: 'CONTACT', href: '/contact' }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)} 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 300, 
                    letterSpacing: '0.15em', 
                    color: 'white', 
                    textDecoration: 'none',
                    display: 'block',
                    padding: '8px 0',
                    transition: 'all 0.3s',
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
