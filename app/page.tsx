'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, MapPin, Instagram, Linkedin, ArrowRight, Clock, Building2, Home as HomeIcon, Layers } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';

const InteractiveScene3D = dynamic(() => import('../components/InteractiveScene3D'), { ssr: false });

export default function HomePage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredType, setHoveredType] = useState<number | null>(null);
  
  const heroRef = useRef(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const style = document.createElement('style');
    style.innerHTML = `
      html {
        scroll-behavior: smooth;
      }

      body {
        overflow-x: hidden;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(10,10,10,0.3);
        backdrop-filter: blur(10px);
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(147,51,234,0.5);
        border-radius: 10px;
        backdrop-filter: blur(10px);
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(147,51,234,0.7);
      }

      .glass {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .glass-hover:hover {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .horizontal-scroll {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        gap: 1.5rem;
        padding-bottom: 1.5rem;
      }

      .scroll-item {
        scroll-snap-align: start;
        flex-shrink: 0;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      .animate-float {
        animation: float 3s ease-in-out infinite;
      }

      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      .shimmer {
        background: linear-gradient(90deg, transparent, rgba(147,51,234,0.1), transparent);
        background-size: 1000px 100%;
        animation: shimmer 3s infinite;
      }

      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(147,51,234,0.3); }
        50% { box-shadow: 0 0 40px rgba(147,51,234,0.6); }
      }

      .pulse-glow {
        animation: pulse-glow 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  const zoomInVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.34, 1.56, 0.64, 1],
      }
    }
  };

  const slideUpZoomVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  const services = [
    {
      title: 'Residential Architecture',
      description: 'Crafting dream homes with innovative design that combines functionality with aesthetic excellence.',
      icon: <HomeIcon size={40} />,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      span: 'col-span-2 row-span-1'
    },
    {
      title: 'Commercial Spaces',
      description: 'Designing modern commercial buildings that enhance productivity and make lasting impressions.',
      icon: <Building2 size={40} />,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      span: 'col-span-1 row-span-1'
    },
    {
      title: 'Urban Planning',
      description: 'Shaping the future of cities with sustainable and innovative urban planning solutions.',
      icon: <Layers size={40} />,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      span: 'col-span-1 row-span-2'
    },
    {
      title: 'Interior Design',
      description: 'Transform spaces into stunning environments that reflect your style and functionality.',
      icon: <HomeIcon size={40} />,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      span: 'col-span-1 row-span-1'
    },
    {
      title: 'Landscape Design',
      description: 'Craft outdoor environments that harmonize nature with architectural vision.',
      icon: <Building2 size={40} />,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      span: 'col-span-2 row-span-1'
    },
    {
      title: 'Construction',
      description: 'End-to-end construction oversight ensuring quality and precision.',
      icon: <Layers size={40} />,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
      span: 'col-span-1 row-span-1'
    },
  ];

  const designTypes = [
    {
      title: 'Modern Villas',
      description: 'Luxury villa designs with contemporary aesthetics and sustainable features for premium living experiences.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      span: 'col-span-2 row-span-1'
    },
    {
      title: 'High-Rise Buildings',
      description: 'Innovative vertical architecture that defines skylines and maximizes urban space efficiency.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      span: 'col-span-1 row-span-1'
    },
    {
      title: 'Luxury Interiors',
      description: 'Bespoke interior solutions that blend elegance with comfort for sophisticated living.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      span: 'col-span-1 row-span-2'
    },
    {
      title: 'Office Spaces',
      description: 'Modern workplace design that boosts productivity and reflects corporate identity.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      span: 'col-span-1 row-span-1'
    },
    {
      title: 'Resort Architecture',
      description: 'Hospitality design that creates unforgettable experiences through thoughtful planning.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      span: 'col-span-2 row-span-1'
    },
    {
      title: 'Landscape Projects',
      description: 'Outdoor spaces that seamlessly integrate with architecture to create harmony.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      span: 'col-span-1 row-span-1'
    },
    {
      title: '3D Visualization',
      description: 'Photorealistic renderings and virtual walkthroughs that bring designs to life.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      span: 'col-span-2 row-span-1'
    },
  ];

  const testimonials = [
    {
      text: "We had the pleasure of working with Studio Panjabutha on our residential project in Kozhikode. Their architectural vision and attention to detail exceeded all expectations. From the initial concept to final execution, they demonstrated exceptional professionalism and creativity. The team's ability to transform our ideas into reality while maintaining budget and timeline was impressive.",
      author: "Rajesh Kumar",
      position: "Homeowner, Kozhikode"
    },
    {
      text: "Studio Panjabutha designed our commercial complex and the results are outstanding! Their innovative approach to space planning and sustainable design has created a building that's both functional and beautiful. The team was collaborative, responsive, and delivered beyond our expectations. Highly recommend for any commercial projects.",
      author: "Priya Menon",
      position: "Business Owner, Kochi"
    },
    {
      text: "Working with Studio Panjabutha on our villa project was an absolute pleasure. Their modern design sensibility combined with practical functionality resulted in our dream home. The construction management was flawless, and they guided us through every decision with expertise. Couldn't be happier with our new home!",
      author: "Anil Thomas",
      position: "Homeowner, Calicut"
    },
    {
      text: "Studio Panjabutha handled the complete interior design and renovation of our restaurant space. Their creative solutions maximized our space while creating an ambiance that customers love. The attention to lighting, materials, and flow demonstrates their deep understanding of hospitality design. Outstanding work!",
      author: "Deepa Nair",
      position: "Restaurant Owner, Kozhikode"
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)' }}>
      <Navbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)',
              filter: 'brightness(0.25)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/80" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-20 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="glass rounded-3xl p-12 md:p-16 shimmer pulse-glow"
          >
            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-xs md:text-sm uppercase tracking-[0.4em] mb-6 font-light"
            >
              Standing Tall with Our Clients
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white mb-12 tracking-tight leading-none"
              style={{ textShadow: '0 0 50px rgba(147,51,234,0.3)' }}
            >
              From Concept<br />To Creation
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12"
            >
              <motion.a
                href="#services"
                whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(147,51,234,0.5)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block glass glass-hover rounded-full px-10 py-4 text-xs uppercase tracking-[0.3em] font-medium transition-all duration-300 text-white"
              >
                Explore Services
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-float"
        >
          <motion.a
            href="#services"
            className="glass rounded-full w-7 h-12 flex items-start justify-center p-2"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-purple-400 rounded-full" 
              style={{ boxShadow: '0 0 10px rgba(147,51,234,0.8)' }}
            />
          </motion.a>
        </motion.div>
      </section>

      {/* SERVICES BENTO GRID */}
      <section id="services" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            variants={zoomInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-tight" style={{ textShadow: '0 0 30px rgba(147,51,234,0.3)' }}>
              Our Architectural Services
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className={`${service.span} relative overflow-hidden group cursor-pointer rounded-2xl`}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 25px 70px rgba(147,51,234,0.4)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full h-full relative"
                >
                  {/* Image Background */}
                  <motion.div 
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </motion.div>

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
                    <motion.div 
                      className="text-purple-400 mb-4"
                      animate={{ 
                        rotate: hoveredService === index ? 360 : 0,
                        scale: hoveredService === index ? 1.15 : 1
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      {service.icon}
                    </motion.div>
                    
                    <motion.h3 
                      className="text-2xl md:text-3xl font-light text-white mb-3 tracking-wide"
                      animate={{ 
                        y: hoveredService === index ? -8 : 0,
                        scale: hoveredService === index ? 1.05 : 1
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
                    >
                      {service.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-white/80 text-sm leading-relaxed mb-4 font-light"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: hoveredService === index ? 1 : 0.7 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.description}
                    </motion.p>
                    
                    <motion.div
                      animate={{ x: hoveredService === index ? 8 : 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-[0.2em] group-hover:text-purple-400 transition-colors font-medium"
                    >
                      Learn More <ArrowRight size={14} />
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={slideUpZoomVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(147,51,234,0.4)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="glass glass-hover rounded-full text-white px-8 py-3 text-xs uppercase tracking-[0.3em] transition-all duration-300 font-medium"
            >
              View All Services
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* DESIGN TYPES BENTO GRID */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            variants={zoomInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-extralight text-white mb-4 tracking-tight" style={{ textShadow: '0 0 30px rgba(147,51,234,0.3)' }}>
              Project Portfolio
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
          >
            {designTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredType(index)}
                onMouseLeave={() => setHoveredType(null)}
                className={`${type.span} relative overflow-hidden group cursor-pointer rounded-2xl`}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 25px 70px rgba(147,51,234,0.4)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full h-full relative"
                >
                  <motion.div 
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img 
                      src={type.image} 
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </motion.div>

                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-light text-white mb-3 tracking-wide"
                      animate={{ 
                        y: hoveredType === index ? -8 : 0,
                        scale: hoveredType === index ? 1.05 : 1
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
                    >
                      {type.title}
                    </motion.h3>
                    <motion.p 
                      className="text-white/80 text-sm leading-relaxed mb-4 font-light"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: hoveredType === index ? 1 : 0.7 }}
                      transition={{ duration: 0.3 }}
                    >
                      {type.description}
                    </motion.p>
                    <motion.div
                      animate={{ x: hoveredType === index ? 8 : 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-[0.2em] group-hover:text-purple-400 transition-colors font-medium"
                    >
                      View Project <ArrowRight size={14} />
                    </motion.div>
                  </div>

                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={slideUpZoomVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(147,51,234,0.4)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="glass glass-hover rounded-full text-white px-8 py-3 text-xs uppercase tracking-[0.3em] transition-all duration-300 font-medium"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 3D SECTION */}
      <section id="interactive" className="h-screen relative">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
        
        <motion.div
          variants={zoomInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute top-16 left-0 right-0 z-20 text-center px-6"
        >
          <motion.div 
            className="glass rounded-2xl inline-block px-12 py-6 pulse-glow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-tight" style={{ textShadow: '0 0 30px rgba(147,51,234,0.5)' }}>
              Explore In 3D
            </h2>
          </motion.div>
        </motion.div>
        
        <InteractiveScene3D modelUrl="/models/building.glb" />
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="glass glass-hover rounded-3xl p-12 md:p-16"
            variants={zoomInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -60, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl font-extralight text-white mb-8 tracking-tight" style={{ textShadow: '0 0 30px rgba(147,51,234,0.3)' }}>
                  About Our Studio
                </h2>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(147,51,234,0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="glass glass-hover rounded-full text-white px-8 py-3 text-xs uppercase tracking-[0.3em] transition-all duration-300 font-medium"
                >
                  Know More About Us
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
              >
                <p className="text-white/70 text-base leading-relaxed mb-6 font-light">
                  We're a premier Architecture and Design Studio in Kozhikode, Kerala. As innovators and creators, we bring your vision to life with cutting-edge architectural design and comprehensive construction solutions.
                </p>
                <p className="text-white/70 text-base leading-relaxed font-light">
                  At Studio Panjabutha, we create architectural masterpieces, stunning interiors, and sustainable construction projects. Whether you're building your dream home or designing a commercial space, we bring innovation, passion, and precision to every project.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS HORIZONTAL SCROLL */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
        
        <div className="max-w-[95vw] mx-auto px-6 relative z-10">
          <motion.div
            variants={zoomInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-tight" style={{ textShadow: '0 0 30px rgba(147,51,234,0.3)' }}>
              Client Testimonials
            </h2>
          </motion.div>

          <motion.div 
            ref={testimonialsScrollRef} 
            className="horizontal-scroll"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100, scale: 0.85 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: (index % 4) * 0.1,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                viewport={{ once: true }}
                className="scroll-item w-[400px] md:w-[500px]"
              >
                <motion.div 
                  whileHover={{ 
                    y: -12, 
                    scale: 1.03,
                    boxShadow: '0 20px 60px rgba(147,51,234,0.3)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass glass-hover rounded-2xl p-10 h-full transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl" />
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-8 font-light relative z-10">{testimonial.text}</p>
                  <div className="border-t border-white/10 pt-6 relative z-10">
                    <p className="text-white font-light text-base mb-1">{testimonial.author}</p>
                    <p className="text-white/50 text-xs font-light">{testimonial.position}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-black/50" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            variants={zoomInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-extralight text-white mb-4 tracking-tight" style={{ textShadow: '0 0 30px rgba(147,51,234,0.3)' }}>
              Get In Touch
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { 
                icon: <MapPin size={20} />, 
                title: 'Location', 
                content: 'HeadQ, 6th floor, Tower 1\nHilite Business Park\nKozhikode, Kerala 673014, India'
              },
              { 
                icon: <Mail size={20} />, 
                title: 'Email', 
                content: 'studiopanjabutha@gmail.com'
              },
              { 
                icon: <Clock size={20} />, 
                title: 'Office Hours', 
                content: 'Monday - Saturday\n9:00 AM - 6:00 PM'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.05,
                  boxShadow: '0 20px 60px rgba(147,51,234,0.3)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass glass-hover rounded-2xl p-8 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all duration-500" />
                
                <motion.div 
                  className="text-purple-400 mb-4 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-white text-xs uppercase tracking-[0.2em] mb-4 font-medium relative z-10">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line font-light relative z-10">{item.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            variants={zoomInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass rounded-3xl p-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-light text-white mb-2 uppercase tracking-wider" style={{ textShadow: '0 0 20px rgba(147,51,234,0.3)' }}>
                  Studio Panjabutha
                </h3>
                <p className="text-white/50 text-sm font-light">Creating exceptional spaces through innovative architecture</p>
              </div>
              
              <div className="flex gap-4">
                {[<Instagram key="ig" size={18} />, <Linkedin key="li" size={18} />].map((icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      boxShadow: '0 10px 30px rgba(147,51,234,0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="glass glass-hover rounded-full w-12 h-12 flex items-center justify-center text-white/70 hover:text-purple-400 transition-all"
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="text-center pt-8 border-t border-white/10">
              <p className="text-white/40 text-xs font-light">© {new Date().getFullYear()} Studio Panjabutha. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
