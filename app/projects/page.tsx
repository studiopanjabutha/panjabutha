'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('ALL');

  const projects = [
    { 
      id: 1, 
      title: 'Modern Villa', 
      category: 'Architecture', 
      location: 'Kozhikode', 
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
    },
    { 
      id: 2, 
      title: 'Luxury Interior', 
      category: 'Interior', 
      location: 'Kochi', 
      year: '2024',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80'
    },
    { 
      id: 3, 
      title: 'Garden Landscape', 
      category: 'Landscape', 
      location: 'Calicut', 
      year: '2023',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    },
    { 
      id: 4, 
      title: 'Commercial Space', 
      category: 'Architecture', 
      location: 'Trivandrum', 
      year: '2023',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    },
    { 
      id: 5, 
      title: 'Residential Interior', 
      category: 'Interior', 
      location: 'Kozhikode', 
      year: '2024',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80'
    },
    { 
      id: 6, 
      title: 'Urban Park', 
      category: 'Landscape', 
      location: 'Kochi', 
      year: '2023',
      image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80'
    },
    { 
      id: 7, 
      title: 'Beachside Villa', 
      category: 'Architecture', 
      location: 'Varkala', 
      year: '2023',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'
    },
    { 
      id: 8, 
      title: 'Office Interior', 
      category: 'Interior', 
      location: 'Kozhikode', 
      year: '2024',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
    },
    { 
      id: 9, 
      title: 'Rooftop Garden', 
      category: 'Landscape', 
      location: 'Kochi', 
      year: '2024',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80'
    },
  ];

  const categories = ['ALL', 'Architecture', 'Interior', 'Landscape'];
  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontSize: '14px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
              OUR PORTFOLIO
            </p>
            <h1 style={{ fontSize: '60px', fontWeight: 200, letterSpacing: '0.15em', color: 'white', marginBottom: '24px' }} className="text-4xl md:text-6xl">
              ALL PROJECTS
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: 300, maxWidth: '600px', margin: '0 auto' }}>
              Explore our complete collection of architectural excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '12px 32px',
                  fontSize: '14px',
                  letterSpacing: '0.2em',
                  color: filter === cat ? '#000' : 'rgba(255,255,255,0.7)',
                  backgroundColor: filter === cat ? '#fff' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '80px 24px', backgroundColor: '#0a0a0a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ cursor: 'pointer' }}
                whileHover={{ y: -15 }}
              >
                <motion.div 
                  style={{ 
                    position: 'relative', 
                    height: '400px', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    overflow: 'hidden', 
                    marginBottom: '24px',
                    borderRadius: '12px',
                  }}
                  animate={{
                    borderColor: hoveredProject === project.id ? 'rgba(147,51,234,0.5)' : 'rgba(255,255,255,0.1)',
                    boxShadow: hoveredProject === project.id 
                      ? '0 20px 60px rgba(147,51,234,0.3)' 
                      : '0 10px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <motion.div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
                    }}
                    animate={{
                      opacity: hoveredProject === project.id ? 0.9 : 0.6,
                    }}
                  />

                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '8px 16px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '12px',
                    letterSpacing: '0.2em',
                    color: 'white',
                    borderRadius: '6px',
                  }}>
                    {project.year}
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                  }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', letterSpacing: '0.3em', marginBottom: '8px' }}>
                      {project.category.toUpperCase()}
                    </p>
                    <h3 style={{ fontSize: '22px', fontWeight: 300, marginBottom: '8px', letterSpacing: '0.05em', color: 'white' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 300, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={14} />
                      {project.location}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
