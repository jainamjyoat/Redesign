'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { gsap } from 'gsap';

const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";
const SPOTLIGHT_R = 260;

const layerPromotionStyles: React.CSSProperties = {
  transform: 'translate3d(0, 0, 0)',
  WebkitTransform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

interface RevealLayerProps {
  image: string;
  active: boolean;
}

const RevealLayer: React.FC<RevealLayerProps> = ({ image, active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealDivRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);

  const mouse = useRef({ x: -9999, y: -9999 });
  const smooth = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const hasMovedYet = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !active) return;

    const handleResize = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
    };
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMovedYet.current) {
        smooth.current = { x: e.clientX, y: e.clientY };
        hasMovedYet.current = true;
        setMouseMoved(true);
      }
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const revealDiv = revealDivRef.current;
    if (!canvas || !revealDiv || dims.w === 0 || dims.h === 0 || !active) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dims.w;
    canvas.height = dims.h;

    const updateSpotlight = () => {
      if (!hasMovedYet.current) {
        rafRef.current = requestAnimationFrame(updateSpotlight);
        return;
      }

      const dx = mouse.current.x - smooth.current.x;
      const dy = mouse.current.y - smooth.current.y;

      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
        smooth.current.x += dx * 0.1;
        smooth.current.y += dy * 0.1;

        ctx.clearRect(0, 0, dims.w, dims.h);

        const gradient = ctx.createRadialGradient(
          smooth.current.x, smooth.current.y, 0, 
          smooth.current.x, smooth.current.y, SPOTLIGHT_R
        );
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
        gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.arc(smooth.current.x, smooth.current.y, SPOTLIGHT_R, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        try {
          const dataUrl = canvas.toDataURL();
          revealDiv.style.maskImage = `url(${dataUrl})`;
          revealDiv.style.webkitMaskImage = `url(${dataUrl})`;
          revealDiv.style.maskSize = '100% 100%';
          revealDiv.style.webkitMaskSize = '100% 100%';
        } catch (e) {
          console.error(e);
        }
      }
      rafRef.current = requestAnimationFrame(updateSpotlight);
    };

    rafRef.current = requestAnimationFrame(updateSpotlight);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dims, active]);

  if (!active) return null;

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <div
        ref={revealDivRef}
        style={{ 
          backgroundImage: `url(${image})`,
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 30,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          opacity: mouseMoved ? 1 : 0,
          transition: 'opacity 0.4s ease'
        }}
      />
    </>
  );
};

export default function LithosHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const textLine1Ref = useRef<HTMLSpanElement | null>(null);
  const textLine2Ref = useRef<HTMLSpanElement | null>(null);
  const descLeftRef = useRef<HTMLDivElement | null>(null);
  const descRightRef = useRef<HTMLDivElement | null>(null);
  
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });

      tl.fromTo(imageFrameRef.current, 
        { 
          scale: 0.45, 
          opacity: 0, 
          borderRadius: '32px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)'
        },
        { 
          scale: 1.00, 
          opacity: 1, 
          borderRadius: '0px',
          duration: 2.2,
          onComplete: () => setIntroFinished(true)
        }
      );

      tl.fromTo(navbarRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' },
        "-=0.3"
      );

      tl.fromTo([textLine1Ref.current, textLine2Ref.current],
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power4.out' },
        "-=0.8"
      );

      tl.fromTo([descLeftRef.current, descRightRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.1, ease: 'power4.out' },
        "-=0.7"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '100vh', backgroundColor: '#000000', letterSpacing: '-0.02em', fontFamily: "'Inter', sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');
        
        html {
          scroll-behavior: smooth;
        }

        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          background-color: #000000 !important;
          overflow-x: hidden !important; /* Restores vertical travel */
        }

        /* Premium ChatGPT Dark Scrollbar UI */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #000000 !important;
        }
        ::-webkit-scrollbar-thumb {
          background: #2a2a2a !important;
          border-radius: 9999px !important;
          border: 2px solid #000000 !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #424242 !important;
        }

        .font-playfair-italic {
          font-family: 'Playfair Display', serif !important;
          font-style: italic !important;
          font-weight: normal !important;
        }

        .responsive-heading { font-size: 3.2rem; }
        .nav-pill { display: none !important; }
        .nav-cta { display: none !important; }
        .nav-burger { display: block !important; }
        .bottom-left-txt { display: none !important; }
        .bottom-right-container { left: 1.25rem; right: 1.25rem; width: auto; bottom: 1.5rem; }

        @media (min-width: 640px) {
          .responsive-heading { font-size: 4.8rem; }
          .bottom-left-txt { display: block !important; }
          .bottom-right-container { left: auto !important; right: 2.5rem !important; width: 260px !important; bottom: 3.5rem !important; }
        }
        @media (min-width: 768px) {
          .responsive-heading { font-size: 6rem; }
          .nav-pill { display: flex !important; }
          .nav-cta { display: block !important; }
          .nav-burger { display: none !important; }
        }
      `}} />

      {/* Navigation Overlay */}
      <nav 
        ref={navbarRef}
        style={{ 
          ...layerPromotionStyles, 
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
          display: 'flex', alignItems: 'center', padding: '1.25rem',
          opacity: 0,
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg style={{ width: '26px', height: '26px' }} viewBox="0 0 256 256" fill="#ffffff">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="font-playfair-italic" style={{ color: '#ffffff', fontSize: '1.5rem', userSelect: 'none' }}>Calyx</span>
        </div>

        <div className="nav-pill" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '9999px', padding: '0.5rem', alignItems: 'center', gap: '0.25rem' }}>
          <button style={{ color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
            Home
          </button>
          {['Field Guides', 'Geology', 'Plans', 'Live Tour'].map((item) => (
            <button key={item} style={{ color: 'rgba(255, 255, 255, 0.8)', padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500, border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
              {item}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="nav-cta" style={{ backgroundColor: '#ffffff', color: '#111827', fontSize: '0.875rem', fontWeight: 600, padding: '0.625rem 1.5rem', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
            LIVE MAP
          </button>
          <button className="nav-burger" style={{ color: '#ffffff', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem' }} aria-label="Toggle Menu">
            <Menu style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
      </nav>

      {/* Hero Box Container */}
      <section style={{ height: '100dvh', width: '100vw', position: 'relative', overflow: 'hidden', backgroundColor: '#000000' }}>
        
        <div 
          ref={imageFrameRef}
          style={{ 
            backgroundImage: `url(${BG_IMAGE_1})`,
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 10,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0,
            transformOrigin: 'center center'
          }} 
        />

        <RevealLayer image={BG_IMAGE_2} active={introFinished} />

        <div style={{ ...layerPromotionStyles, position: 'absolute', top: '21%', left: 0, right: 0, zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingLeft: '1.25rem', paddingRight: '1.25rem', pointerEvents: 'none' }}>
          <h1 style={{ color: '#ffffff', margin: 0, padding: 0, lineHeight: 0.95, fontWeight: 'normal' }}>
            <span 
              ref={textLine1Ref}
              className="font-playfair-italic" 
              style={{ 
                display: 'block', 
                letterSpacing: '-0.05em',
                opacity: 0
              }}
            >
              Layers hold
            </span>
            <span 
              ref={textLine2Ref}
              className="responsive-heading" 
              style={{ 
                display: 'block', 
                letterSpacing: '-0.08em', 
                marginTop: '-0.25rem',
                opacity: 0,
                fontWeight: 'normal'
              }}
            >
              tales of time
            </span>
          </h1>
        </div>

        <div 
          ref={descLeftRef}
          className="bottom-left-txt" 
          style={{ 
            ...layerPromotionStyles,
            position: 'absolute', 
            bottom: '3.5rem', 
            left: '2.5rem', 
            zIndex: 50, 
            maxWidth: '260px',
            opacity: 0
          }}
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        <div 
          ref={descRightRef}
          className="bottom-right-container" 
          style={{ 
            ...layerPromotionStyles,
            position: 'absolute', 
            zIndex: 50, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.25rem',
            opacity: 0
          }} 
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
          </p>
          <button style={{ 
            backgroundColor: '#e8702a', 
            color: '#ffffff', 
            fontSize: '0.875rem', 
            fontWeight: 500, 
            padding: '0.75rem 1.75rem', 
            borderRadius: '9999px', 
            border: 'none', 
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#d2611f';
            e.currentTarget.style.transform = 'scale(1.03) translate3d(0,0,0)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(232, 112, 42, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#e8702a';
            e.currentTarget.style.transform = 'scale(1) translate3d(0,0,0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            Start Digging
          </button>
        </div>

      </section>
    </div>
  );
}