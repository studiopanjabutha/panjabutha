'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '25+', label: 'Team Members' },
  ];

  const values = [
    { title: 'Innovation', desc: 'Pushing boundaries with creative design solutions' },
    { title: 'Sustainability', desc: 'Building for a better tomorrow' },
    { title: 'Excellence', desc: 'Uncompromising quality in every detail' },
    { title: 'Integrity', desc: 'Honest and transparent in all we do' },
  ];

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
              WHO WE ARE
            </p>
            <h1 style={{ fontSize: '60px', fontWeight: 200, letterSpacing: '0.15em', color: 'white', marginBottom: '24px' }} className="text-4xl md:text-6xl">
              ABOUT US
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: 300, maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
              Studio Panjabutha is a multi-disciplinary design practice based in Kozhikode, Kerala, 
              specializing in architecture, interior design, and landscape architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center' }}
              >
                <motion.p 
                  style={{ fontSize: '48px', fontWeight: 200, color: 'white', marginBottom: '12px' }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.p>
                <p style={{ fontSize: '14px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: 'rgba(255,255,255,0.7)', fontSize: '16px', fontWeight: 300, lineHeight: 1.8 }}
          >
            <p>
              We believe in creating spaces that are not only aesthetically pleasing but also functional and sustainable. 
              Our design philosophy centers around understanding the unique needs of each client and translating them into architectural excellence.
            </p>
            <p>
              With years of experience in diverse projects ranging from residential villas to commercial complexes, 
              we bring innovation, precision, and creativity to every project we undertake.
            </p>
            <p>
              Our team of skilled architects, designers, and engineers work collaboratively to deliver projects that exceed expectations 
              and stand the test of time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#0a0a0a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{ fontSize: '48px', fontWeight: 200, letterSpacing: '0.15em', color: 'white', marginBottom: '16px' }} className="text-3xl md:text-5xl">
              OUR VALUES
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontWeight: 300 }}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{
                  padding: '40px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <h3 style={{ fontSize: '24px', fontWeight: 300, letterSpacing: '0.1em', color: 'white', marginBottom: '16px' }}>
                  {value.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: 300, lineHeight: 1.8 }}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
