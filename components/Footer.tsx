'use client';

import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1C1C1C', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Top row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(245,240,234,0.08)',
            marginBottom: '32px',
          }}
          className="md:flex-row md:items-center md:justify-between"
        >
          {/* Logo + tagline */}
          <div>
            <h3 style={{ ...S.cormorant, fontSize: '26px', fontWeight: 300, color: '#F5F0EA', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Studio Panjabutha
            </h3>
            <p style={{ ...S.lora, fontStyle: 'italic', color: 'rgba(245,240,234,0.26)', fontSize: '13px', lineHeight: 1.85, maxWidth: '340px' }}>
              "architecture is not a style to be imposed,<br />but a story to be discovered"
            </p>
          </div>

          {/* Footer nav + socials */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'flex-start' }}
            className="md:items-end"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px' }}>
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ color: '#B5603A' }}
                  style={{
                    ...S.dmSans,
                    fontSize: '9px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,234,0.35)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <Instagram size={15} />, label: 'Instagram', href: '#' },
                { icon: <Linkedin size={15} />, label: 'LinkedIn', href: '#' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ backgroundColor: '#B5603A', borderColor: '#B5603A' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid rgba(245,240,234,0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(245,240,234,0.4)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', textAlign: 'center' }}
          className="md:flex-row md:justify-between"
        >
          <p style={{ ...S.dmSans, fontSize: '8px', letterSpacing: '0.48em', color: 'rgba(245,240,234,0.16)', textTransform: 'uppercase' }}>
            Architecture · Interior · Construction
          </p>
          <p style={{ ...S.dmSans, fontSize: '8px', letterSpacing: '0.28em', color: 'rgba(245,240,234,0.16)' }}>
            © {new Date().getFullYear()} Studio Panjabutha. All rights reserved.
          </p>
          <p style={{ ...S.dmSans, fontSize: '8px', letterSpacing: '0.28em', color: 'rgba(245,240,234,0.16)' }}>
            Kozhikode, Kerala, India
          </p>
        </div>

      </div>
    </footer>
  );
}
