'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const FEATURE_CARD_IMG = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85";
const FEATURES_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";
const ICON_CARD_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85";
const ICON_CARD_3 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85";

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
}

const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({ segments }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const wordsData = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({
      word,
      className: segment.className || '',
    }))
  );

  return (
    <div ref={containerRef} style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '0.25em', rowGap: '0.25rem' }}>
      {wordsData.map((item, idx) => (
        <span key={idx} style={{ display: 'inline-block', overflow: 'hidden', padding: '0.1rem 0' }}>
          <motion.span
            className={item.className}
            style={{ display: 'inline-block' }}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: idx * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

const ScrollRevealParagraph: React.FC<{ text: string }> = ({ text }) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.85', 'end 0.15'],
  });

  const characters = text.split('');
  const totalChars = characters.length;

  return (
    <p ref={paragraphRef} style={{ color: '#DEDBC8', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '640px', margin: '3rem auto 0 auto', textAlign: 'center', padding: '0 1rem', fontWeight: 300 }}>
      {characters.map((char, index) => {
        const charProgress = index / totalChars;
        const startRange = Math.max(0, charProgress - 0.1);
        const endRange = Math.min(1, charProgress + 0.05);
        const opacity = useTransform(scrollYProgress, [startRange, endRange], [0.2, 1]);

        return (
          <motion.span key={index} style={{ opacity }} className="inline">
            {char}
          </motion.span>
        );
      })}
    </p>
  );
};

interface TextCardProps {
  number: string;
  imgSrc: string;
  title: string;
  items: string[];
}

const FeatureTextCard: React.FC<TextCardProps> = ({ number, imgSrc, title, items }) => {
  return (
    <div style={{
      backgroundColor: '#161616',
      border: '1px solid rgba(255, 255, 255, 0.03)',
      borderRadius: '6px',
      padding: '2.5rem 2rem 2rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '450px',
      boxSizing: 'border-box'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <img src={imgSrc} alt="" style={{ width: '44px', height: '44px', borderRadius: '4px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.08)' }} />
          <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '0.75rem', fontFamily: 'monospace' }}>{number}</span>
        </div>

        <h4 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 500, margin: '0 0 1.5rem 0', letterSpacing: '-0.01em' }}>
          {title}
        </h4>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.85rem', lineHeight: 1.45 }}>
              <Check style={{ width: '14px', height: '14px', color: '#DEDBC8', marginTop: '3px', flexShrink: 0 }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <a 
        href="#" 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none', width: 'fit-content', transition: 'all 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)'}
      >
        <span>Learn more</span>
        <ArrowRight style={{ width: '12px', height: '12px', transform: 'rotate(-45deg)' }} />
      </a>
    </div>
  );
};

export default function PrismaLanding() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', fontFamily: "'Almarai', sans-serif", width: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      {/* Sanitized layout selectors completely free of invisible character parsing blocks */}
      <style dangerouslySetInnerHTML={{ __html: `
        .prisma-about-card {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          background-color: #101010;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.02);
          padding: 6rem 2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .prisma-features-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 8rem 2rem 12rem 2rem;
          box-sizing: border-box;
        }
        .prisma-grid-engine {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 16px !important;
          width: 100% !important;
          box-sizing: border-box;
        }
        .statement-text-size {
          font-size: 2rem;
          line-height: 1.2;
          max-width: 840px;
          margin: 0 auto;
          text-align: center;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @media (min-width: 640px) {
          .prisma-grid-engine { 
            grid-template-columns: repeat(2, 1fr) !important; 
          }
          .statement-text-size { 
            font-size: 2.8rem; 
          }
        }
        
        @media (min-width: 1024px) {
          .prisma-grid-engine { 
            grid-template-columns: repeat(4, 1fr) !important; 
          }
          .statement-text-size { 
            font-size: 3.6rem; 
          }
          .prisma-about-card { 
            padding: 8rem 4rem; 
          }
        }
      `}} />

      {/* SECTION 2: ABOUT MODULE */}
      <section style={{ backgroundColor: '#000000', padding: '6rem 1rem 4rem 1rem', boxSizing: 'border-box' }}>
        <div className="prisma-about-card">
          <span style={{ color: '#DEDBC8', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>
            Visual arts
          </span>

          <div className="statement-text-size">
            <WordsPullUpMultiStyle 
              segments={[
                { text: "I am Marcus Chen, ", className: "font-normal text-[#E1E0CC]" },
                { text: "a self-taught director. ", className: "font-serif italic text-[#DEDBC8]" },
                { text: "I have skills in color grading, visual effects, and narrative design.", className: "font-normal text-[#E1E0CC]" }
              ]}
            />
          </div>

          <ScrollRevealParagraph 
            text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
          />
        </div>
      </section>

      {/* SECTION 3: FEATURES GRID */}
      <section style={{ backgroundColor: '#000000', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-screen pointer-events-none" />

        <div className="prisma-features-container">
          
          {/* Section Divider Layout */}
          <div style={{ marginBottom: '4.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '4rem' }}>
            <h3 style={{ color: '#E1E0CC', fontSize: '1.65rem', fontWeight: 400, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
              Studio-grade workflows for visionary creators.
            </h3>
            <p style={{ color: '#6b7280', fontSize: '1rem', margin: 0, fontWeight: 400 }}>
              Built for pure vision. Powered by art.
            </p>
          </div>

          {/* Corrected Side-by-Side Widescreen Engine Grid */}
          <div ref={gridRef} className="prisma-grid-engine">
            
            {/* Card 1: Live Cinematic Canvas */}
            <motion.div 
              style={{
                position: 'relative',
                borderRadius: '6px',
                overflow: 'hidden',
                minHeight: '450px',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2.5rem 2rem 2rem 2rem',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                boxSizing: 'border-box'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isGridInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <video 
                src={FEATURES_VIDEO}
                autoPlay loop muted playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', zIndex: 10 }} />
              <span style={{ color: '#E1E0CC', fontSize: '0.9rem', fontWeight: 500, zIndex: 20, position: 'relative', letterSpacing: '-0.01em' }}>
                Your creative canvas.
              </span>
            </motion.div>

            {/* Card 2: Project Storyboard Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isGridInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeatureTextCard 
                number="01"
                imgSrc={FEATURE_CARD_IMG}
                title="Project Storyboard."
                items={[
                  "Structure stories with precision using Source Frameworks",
                  "Visual timelines optimized for artistic assets",
                  "Flexible interactive blend parameters with music track matrices",
                  "Select each shot alignment sequence with explicit design purpose"
                ]}
              />
            </motion.div>

            {/* Card 3: Intelligent Review Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isGridInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeatureTextCard 
                number="02"
                imgSrc={ICON_CARD_2}
                title="Smart Critiques."
                items={[
                  "Instant architectural analysis of core cuts, structural faults, and timeline drift records",
                  "Surface nested creative notes, asset tags, and chronological metadata frames automatically",
                  "Sync with Premiere, Frame.io, DaVinci and native production workflows seamlessly"
                ]}
              />
            </motion.div>

            {/* Card 4: Immersive Telemetry Capsule */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isGridInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <FeatureTextCard 
                number="03"
                imgSrc={ICON_CARD_3}
                title="Immersion Capsule."
                items={[
                  "Silence non-urgent operational network channels and layout alerts completely",
                  "Ambient environmental soundscapes, film scoring filters, and field audio generation feeds",
                  "Sync calendars, tracking milestones, and production edit block states intelligently"
                ]}
              />
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}