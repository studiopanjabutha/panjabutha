'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [focused, setFocused] = useState<string | null>(null);

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background-color: #F5F0EA; color: #1C1C1C; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
      ::selection { background: #B5603A; color: #F5F0EA; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: #F5F0EA; }
      ::-webkit-scrollbar-thumb { background: #D6C9B2; border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: #B5603A; }
      input::placeholder, textarea::placeholder { color: rgba(28,28,28,0.3); }
      input:focus, textarea:focus { outline: none; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const S = {
    labelText: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '10px',
      letterSpacing: '0.4em',
      textTransform: 'uppercase' as const,
      color: '#B5603A',
      marginBottom: '14px',
      display: 'block',
    },
    h2: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1C1C1C', lineHeight: 1.15 },
    h2Light: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#F5F0EA', lineHeight: 1.15 },
    body: { fontFamily: "'Lora', serif", color: 'rgba(28,28,28,0.65)', lineHeight: 2, fontSize: '15px' },
    dmSans: { fontFamily: "'DM Sans', sans-serif" },
    cormorant: { fontFamily: "'Cormorant Garamond', serif" },
    lora: { fontFamily: "'Lora', serif" },
  };

  const elements = [
    { name: 'Air', symbol: '大気', description: 'Passive ventilation, breeze corridors, breathable spaces' },
    { name: 'Space', symbol: '空間', description: 'Proportional voids, compressed entries, expansive living' },
    { name: 'Fire', symbol: '火', description: 'Warm light, material warmth, thermal comfort' },
    { name: 'Water', symbol: '水', description: 'Courtyard pools, rain-responsive design, monsoon planning' },
    { name: 'Earth', symbol: '大地', description: 'Laterite, timber, clay tile — material honesty' },
  ];

  const projects = [
    { name: 'ĀVARA', tagline: '// a house that breathes //', location: 'Kozhikode, Kerala', category: 'Residential', year: '2024', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
    { name: 'STHITHI', tagline: '// stillness in form //', location: 'Palakkad, Kerala', category: 'Residential', year: '2024', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { name: 'LU–ME', tagline: '// light and material //', location: 'Kochi, Kerala', category: 'Interior', year: '2023', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { name: 'PUNARJANI', tagline: '// born again from ruin //', location: 'Palakkad, Kerala', category: 'Renovation', year: '2023', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { name: 'Aathma Bhoomi', tagline: '// where land meets soul //', location: 'Mangalore, Karnataka', category: 'Farmhouse', year: '2023', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
    { name: 'Hearth by Remi', tagline: '// Morocco meets Malabar //', location: 'Wayanad, Kerala', category: 'Hospitality', year: '2022', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1' },
  ];

  const services = [
    { number: '01', title: 'Architecture', description: "From concept to construction documentation — we design buildings that negotiate between land, climate, and the lived experience of the inhabitant.", items: ['Site Analysis', 'Concept Design', 'Design Development', 'Construction Drawings', 'Project Management'], image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
    { number: '02', title: 'Interior', description: "Interiors as extensions of architecture — spatial sequences, material palettes, and furniture selections that carry the building's story inward.", items: ['Space Planning', 'Material Selection', 'Furniture Design', 'Lighting Design', 'Art Curation'], image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
    { number: '03', title: 'Construction', description: "We oversee the realisation of our designs from ground to finish — coordinating contractors, managing timelines, and ensuring the built outcome honours the design intent.", items: ['Contractor Management', 'Quality Control', 'Timeline Management', 'Material Sourcing', 'Handover'], image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80' },
  ];

  const testimonials = [
    { quote: "Studio Panjabutha didn't just design our home — they listened to the land, the wind, the way light moved at certain hours. The result is a house that feels inevitable.", author: "Rajesh & Anitha Kumar", project: "ĀVARA — Kozhikode, 2024" },
    { quote: "Every material chosen, every proportion considered. Walking through our completed space feels like reading a poem we hadn't written but always knew.", author: "Priya Menon", project: "LU–ME — Kochi, 2023" },
    { quote: "The renovation of our ancestral home was deeply emotional. They approached it with the sensitivity of archaeologists and the vision of poets.", author: "Anil Thomas", project: "PUNARJANI — Palakkad, 2023" },
  ];

  const categories = ['All', 'Residential', 'Interior', 'Hospitality', 'Renovation', 'Farmhouse'];
  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div style={{ backgroundColor: '#F5F0EA', minHeight: '100vh', overflowX: 'hidden' }}>

      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} style={{ position: 'relative', height: '100svh', minHeight: '600px', overflow: 'hidden' }}>
        <motion.div style={{ scale: heroScale, position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(28,28,28,0.42)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, #F5F0EA 100%)' }} />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY, position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 24px 80px' }}
        >
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }}
            style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.48em', color: 'rgba(245,240,234,0.5)', textTransform: 'uppercase', marginBottom: '18px' }}>
            Kozhikode, Kerala — Est. 2018
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.55 }}
            style={{ ...S.cormorant, fontSize: 'clamp(52px, 13vw, 120px)', fontWeight: 300, color: '#F5F0EA', lineHeight: 0.93, letterSpacing: '-0.01em', marginBottom: '24px' }}>
            Studio<br /><em style={{ fontStyle: 'italic' }}>Panjabutha</em>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.9 }}
            style={{ ...S.lora, fontStyle: 'italic', color: 'rgba(245,240,234,0.68)', fontSize: 'clamp(13px, 3.5vw, 17px)', maxWidth: '460px', lineHeight: 1.85 }}>
            "architecture is not a style to be imposed,<br />but a story to be discovered"
          </motion.p>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, position: 'absolute', bottom: '32px', right: '24px', zIndex: 10 }}>
          <motion.div animate={{ scaleY: [0.2, 1, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, rgba(245,240,234,0.55), transparent)', transformOrigin: 'top' }} />
        </motion.div>
      </section>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="about" style={{ padding: '96px 24px', backgroundColor: '#F5F0EA' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: '40px', marginBottom: '72px' }} className="grid-cols-1 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
              <span style={S.labelText}>The Practice</span>
              <h2 style={{ ...S.h2, fontSize: 'clamp(32px, 6vw, 52px)' }}>
                Rooted in climate.<br />
                <em style={{ fontStyle: 'italic', color: '#B5603A' }}>Shaped by place.</em>
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <p style={S.body}>
                Studio Panjabutha is an architecture-led practice focused on climate-responsive,
                context-sensitive design rooted in Kerala's tropical vernacular. We believe that
                every structure carries the memory of its land — every wall a negotiation between
                inside and outside, between the human and the elemental.
              </p>
              <div style={{ width: '48px', height: '1px', backgroundColor: '#B5603A', marginTop: '24px' }} />
            </motion.div>
          </div>

          {/* Five Elements */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>
            <p style={{ ...S.dmSans, fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(28,28,28,0.32)', textTransform: 'uppercase', marginBottom: '32px' }}>
              The Five Elements — Panjabutha
            </p>
            <div style={{ borderTop: '1px solid #D6C9B2' }}>
              <div style={{ display: 'grid' }} className="grid-cols-1 md:grid-cols-5">
                {elements.map((el, i) => (
                  <motion.div
                    key={el.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ backgroundColor: '#1C1C1C' }}
                    className="group"
                    style={{ borderBottom: '1px solid #D6C9B2', padding: '28px 20px', cursor: 'default', transition: 'background-color 0.5s ease' }}
                  >
                    <p className="group-hover:text-white/20" style={{ ...S.cormorant, fontSize: '28px', color: '#D6C9B2', marginBottom: '12px', transition: 'color 0.5s ease' }}>{el.symbol}</p>
                    <h3 className="group-hover:text-white" style={{ ...S.cormorant, fontSize: '20px', fontWeight: 300, color: '#1C1C1C', marginBottom: '8px', transition: 'color 0.5s ease' }}>{el.name}</h3>
                    <p className="group-hover:text-white/50" style={{ ...S.dmSans, fontSize: '10px', lineHeight: 1.9, color: 'rgba(28,28,28,0.42)', transition: 'color 0.5s ease' }}>{el.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ PROJECTS ══════════════ */}
      <section id="work" style={{ padding: '96px 24px', backgroundColor: '#F5F0EA' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="md:flex-row md:items-end md:justify-between">
              <div>
                <span style={S.labelText}>Selected Work</span>
                <h2 style={{ ...S.h2, fontSize: 'clamp(32px, 6vw, 52px)' }}>Projects</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                {categories.map((cat) => (
                  <motion.button key={cat} onClick={() => setActiveCategory(cat)} whileHover={{ color: '#B5603A' }}
                    style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', background: 'none', border: 'none', color: activeCategory === cat ? '#B5603A' : 'rgba(28,28,28,0.35)', borderBottom: activeCategory === cat ? '1px solid #B5603A' : '1px solid transparent', paddingBottom: '2px', transition: 'color 0.3s', cursor: 'pointer' }}>
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gridAutoRows: '280px', gap: '10px' }} className="md:grid-cols-3 md:[grid-auto-rows:320px]">
            {filtered.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.07 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`${project.colSpan} ${project.rowSpan}`}
                style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              >
                <motion.div animate={{ scale: hoveredProject === i ? 1.06 : 1 }} transition={{ duration: 0.7, ease: 'easeOut' }} style={{ position: 'absolute', inset: 0 }}>
                  <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </motion.div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,28,28,0.88) 0%, rgba(28,28,28,0.12) 55%, transparent 100%)' }} />
                <motion.div animate={{ opacity: hoveredProject === i ? 1 : 0 }} transition={{ duration: 0.4 }} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(181,96,58,0.18)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(245,240,234,0.65)', textTransform: 'uppercase', backgroundColor: 'rgba(28,28,28,0.35)', backdropFilter: 'blur(4px)', padding: '5px 10px' }}>
                      {project.category}
                    </span>
                    <motion.div animate={{ opacity: hoveredProject === i ? 1 : 0, x: hoveredProject === i ? 0 : 8 }} transition={{ duration: 0.3 }}
                      style={{ width: '32px', height: '32px', backgroundColor: '#F5F0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ArrowUpRight size={13} color="#1C1C1C" />
                    </motion.div>
                  </div>
                  <motion.div animate={{ y: hoveredProject === i ? -5 : 0 }} transition={{ duration: 0.4 }}>
                    <h3 style={{ ...S.cormorant, fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 300, color: '#F5F0EA', letterSpacing: '0.04em', marginBottom: '4px' }}>{project.name}</h3>
                    <p style={{ ...S.lora, fontStyle: 'italic', color: 'rgba(245,240,234,0.52)', fontSize: '12px', marginBottom: '8px' }}>{project.tagline}</p>
                    <p style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(245,240,234,0.42)', textTransform: 'uppercase' }}>{project.location} — {project.year}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ marginTop: '52px', display: 'flex', justifyContent: 'center' }}>
            <motion.button whileHover={{ backgroundColor: '#1C1C1C', color: '#F5F0EA' }} transition={{ duration: 0.4 }}
              style={{ ...S.dmSans, fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase', border: '1px solid rgba(28,28,28,0.25)', padding: '14px 40px', backgroundColor: 'transparent', color: '#1C1C1C', transition: 'all 0.4s ease', cursor: 'pointer' }}>
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

     {/* ══════════════ SERVICES ══════════════ */}
<section id="services" style={{ padding: '96px 24px', backgroundColor: '#F5F0EA' }}>
  <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
      <span style={{ ...S.labelText }}>What We Do</span>
      <h2 style={{ ...S.h2, fontSize: 'clamp(32px, 6vw, 52px)' }}>Services</h2>
    </motion.div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1px', backgroundColor: '#D6C9B2' }} className="md:grid-cols-3">
      {services.map((service, i) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: i * 0.14 }}
          viewport={{ once: true }}
          whileHover={{ backgroundColor: '#EDE8E1' }}
          style={{ backgroundColor: '#F5F0EA', padding: '36px 28px', cursor: 'default', transition: 'background-color 0.5s ease' }}
        >
          <div style={{ overflow: 'hidden', marginBottom: '24px', height: '160px' }}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src={service.image}
              alt={service.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
              loading="lazy"
            />
          </div>

          <p style={{ ...S.cormorant, fontSize: '44px', color: 'rgba(28,28,28,0.08)', marginBottom: '10px' }}>
            {service.number}
          </p>

          <h3 style={{ ...S.cormorant, fontSize: '26px', fontWeight: 300, color: '#1C1C1C', marginBottom: '12px', letterSpacing: '0.04em' }}>
            {service.title}
          </h3>

          <p style={{ ...S.lora, color: 'rgba(28,28,28,0.55)', fontSize: '14px', lineHeight: 2, marginBottom: '24px' }}>
            {service.description}
          </p>

          <div style={{ borderTop: '1px solid #D6C9B2', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {service.items.map((item) => (
              <p key={item} style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.24em', color: 'rgba(28,28,28,0.4)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '14px', height: '1px', backgroundColor: '#B5603A', display: 'inline-block', flexShrink: 0 }} />
                {item}
              </p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section style={{ padding: '96px 24px', backgroundColor: '#F5F0EA' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
            <span style={S.labelText}>Client Voices</span>
            <h2 style={{ ...S.h2, fontSize: 'clamp(28px, 6vw, 52px)', lineHeight: 1.2 }}>
              Words from those<br />
              <em style={{ fontStyle: 'italic', color: '#B5603A' }}>who live in our work</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1px', backgroundColor: '#D6C9B2' }} className="md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: i * 0.14 }} viewport={{ once: true }}
                whileHover={{ backgroundColor: '#1C1C1C' }} className="group"
                style={{ backgroundColor: '#F5F0EA', padding: '36px 28px', cursor: 'default', transition: 'background-color 0.7s ease' }}>
                <p className="group-hover:text-[#B5603A]/25" style={{ ...S.cormorant, fontSize: '56px', color: '#D6C9B2', lineHeight: 1, marginBottom: '16px', transition: 'color 0.5s ease' }}>"</p>
                <p className="group-hover:text-white/72" style={{ ...S.lora, fontStyle: 'italic', color: 'rgba(28,28,28,0.72)', fontSize: '14px', lineHeight: 2, marginBottom: '24px', transition: 'color 0.5s ease' }}>{t.quote}</p>
                <div style={{ borderTop: '1px solid #D6C9B2', paddingTop: '18px' }}>
                  <p className="group-hover:text-white" style={{ ...S.dmSans, fontSize: '12px', color: '#1C1C1C', fontWeight: 500, transition: 'color 0.5s ease' }}>{t.author}</p>
                  <p style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.2em', color: '#B5603A', textTransform: 'uppercase', marginTop: '4px' }}>{t.project}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section id="contact" style={{ padding: '96px 24px', backgroundColor: '#F5F0EA' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: '64px' }} className="grid-cols-1 md:grid-cols-2">

            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
              <span style={S.labelText}>Begin a Conversation</span>
              <h2 style={{ ...S.h2, fontSize: 'clamp(28px, 6vw, 52px)', marginBottom: '28px' }}>
                Let's build<br />
                <em style={{ fontStyle: 'italic', color: '#B5603A' }}>something rooted</em>
              </h2>
              <p style={{ ...S.body, marginBottom: '44px' }}>
                Every project begins with a conversation. Tell us about your land, your brief,
                your aspirations — and we'll tell you how we might discover the story together.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { label: 'Location', value: 'HeadQ, 6th floor, Tower 1\nHilite Business Park\nKozhikode, Kerala 673014' },
                  { label: 'Email', value: 'studiopanjabutha@gmail.com' },
                  { label: 'Hours', value: 'Monday – Saturday\n9:00 AM – 6:00 PM' },
                ].map((item) => (
                  <div key={item.label}>
                    <p style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.4em', color: '#B5603A', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</p>
                    <p style={{ ...S.lora, color: 'rgba(28,28,28,0.62)', fontSize: '14px', whiteSpace: 'pre-line', lineHeight: 1.9 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { name: 'name', label: 'Your Name', type: 'text' },
                  { name: 'email', label: 'Email Address', type: 'email' },
                  { name: 'project', label: 'Project Type', type: 'text' },
                ].map((field) => (
                  <div key={field.name}>
                    <label style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(28,28,28,0.32)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                    <input type={field.type} placeholder={field.label}
                      onFocus={() => setFocused(field.name)} onBlur={() => setFocused(null)}
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${focused === field.name ? '#B5603A' : '#D6C9B2'}`, padding: '10px 0', ...S.lora, fontSize: '15px', color: '#1C1C1C', outline: 'none', transition: 'border-color 0.3s ease' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ ...S.dmSans, fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(28,28,28,0.32)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Your Brief</label>
                  <textarea rows={4} placeholder="Tell us about your project..."
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${focused === 'message' ? '#B5603A' : '#D6C9B2'}`, padding: '10px 0', ...S.lora, fontSize: '15px', color: '#1C1C1C', outline: 'none', resize: 'none', transition: 'border-color 0.3s ease' }}
                  />
                </div>
                <motion.button type="submit" whileHover={{ backgroundColor: '#1C1C1C', color: '#F5F0EA' }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.4 }}
                  style={{ width: '100%', border: '1px solid rgba(28,28,28,0.7)', padding: '16px', ...S.dmSans, fontSize: '10px', letterSpacing: '0.48em', textTransform: 'uppercase', backgroundColor: 'transparent', color: '#1C1C1C', transition: 'all 0.4s ease', marginTop: '8px', cursor: 'pointer' }}>
                  Send Brief
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
