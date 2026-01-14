'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontSize: '14px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
              LET'S TALK
            </p>
            <h1 style={{ fontSize: '60px', fontWeight: 200, letterSpacing: '0.15em', color: 'white', marginBottom: '24px' }} className="text-4xl md:text-6xl">
              GET IN TOUCH
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: 300, maxWidth: '600px', margin: '0 auto' }}>
              Ready to bring your vision to life? Let's start a conversation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
            {[
              { 
                icon: <MapPin size={20} />, 
                title: 'LOCATION', 
                content: 'HeadQ, 6th floor, Tower 1\nHilite Business Park\nKozhikode, Kerala 673014, India'
              },
              { 
                icon: <Mail size={20} />, 
                title: 'EMAIL', 
                content: 'studiopanjabutha@gmail.com',
                link: 'mailto:studiopanjabutha@gmail.com'
              },
              { 
                icon: <Phone size={20} />, 
                title: 'PHONE', 
                content: '+91 XXX XXX XXXX',
                link: 'tel:+91XXXXXXXXXX'
              },
              { 
                icon: <Clock size={20} />, 
                title: 'OFFICE HOURS', 
                content: 'Monday - Saturday\n9:00 AM - 6:00 PM'
              },
            ].map((item, index) => (
              <motion.div 
                key={index}
                style={{ 
                  padding: '32px', 
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, borderColor: 'rgba(147,51,234,0.5)' }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 300, marginBottom: '20px', letterSpacing: '0.2em', color: 'white' }}>
                  {item.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', color: 'rgba(255,255,255,0.7)' }}>
                  {item.icon}
                  {item.link ? (
                    <a href={item.link} style={{ fontWeight: 300, fontSize: '14px', color: 'inherit', textDecoration: 'none', whiteSpace: 'pre-line' }}>
                      {item.content}
                    </a>
                  ) : (
                    <p style={{ fontWeight: 300, fontSize: '14px', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>
                      {item.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ maxWidth: '800px', margin: '0 auto', padding: '48px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: 200, letterSpacing: '0.1em', color: 'white', marginBottom: '40px', textAlign: 'center' }}>
              SEND US A MESSAGE
            </h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <input 
                  type="text" 
                  placeholder="NAME" 
                  required 
                  style={{ 
                    width: '100%', 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    borderBottom: '2px solid rgba(255,255,255,0.2)', 
                    paddingBottom: '16px', 
                    color: 'white', 
                    outline: 'none', 
                    fontSize: '14px',
                    letterSpacing: '0.15em',
                    fontWeight: 300,
                  }} 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="EMAIL" 
                  required 
                  style={{ 
                    width: '100%', 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    borderBottom: '2px solid rgba(255,255,255,0.2)', 
                    paddingBottom: '16px', 
                    color: 'white', 
                    outline: 'none', 
                    fontSize: '14px',
                    letterSpacing: '0.15em',
                    fontWeight: 300,
                  }} 
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="PHONE" 
                  style={{ 
                    width: '100%', 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    borderBottom: '2px solid rgba(255,255,255,0.2)', 
                    paddingBottom: '16px', 
                    color: 'white', 
                    outline: 'none', 
                    fontSize: '14px',
                    letterSpacing: '0.15em',
                    fontWeight: 300,
                  }} 
                />
              </div>
              <div>
                <textarea 
                  placeholder="MESSAGE" 
                  rows={5} 
                  required 
                  style={{ 
                    width: '100%', 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    borderBottom: '2px solid rgba(255,255,255,0.2)', 
                    paddingBottom: '16px', 
                    color: 'white', 
                    outline: 'none', 
                    resize: 'none', 
                    fontSize: '14px',
                    letterSpacing: '0.15em',
                    fontWeight: 300,
                  }} 
                />
              </div>
              <motion.button 
                type="submit" 
                style={{ 
                  border: '2px solid white', 
                  padding: '16px 40px', 
                  fontSize: '14px', 
                  letterSpacing: '0.3em', 
                  color: 'white', 
                  backgroundColor: 'transparent', 
                  cursor: 'pointer', 
                  width: '100%', 
                  marginTop: '16px',
                }}
                whileHover={{ backgroundColor: 'white', color: '#000' }}
                whileTap={{ scale: 0.95 }}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
