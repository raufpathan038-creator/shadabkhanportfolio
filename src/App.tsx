import { useState, useEffect, useRef, FormEvent, CSSProperties } from 'react';
import { 
  ArrowUpRight, 
  Linkedin, 
  Github, 
  Instagram, 
  Check, 
  Copy, 
  Mail, 
  Phone,
  Briefcase, 
  Code, 
  Sparkles, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  Compass,
  Monitor,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
const shadabAvatar = "https://lh3.googleusercontent.com/d/1RElCf_Ma-EPqg-MSJF81ZdycpNoBDl3u";

// Design Tokens & Static Case Studies Data
interface Project {
  id: string;
  name: string;
  category: 'Real Project' | 'Exploration';
  type: string;
  tech: string[];
  desc: string;
  fullDesc: string;
  colorClass: string;
  emoji: string;
  link: string;
  features: string[];
  duration: string;
  status: string;
  image?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'dermacare',
    name: 'DermaCare — Skin Clinic Website',
    category: 'Real Project',
    type: 'Landing Page & Booking System',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    desc: 'Professional website for a skin clinic with appointment booking, dynamic service menus, and Google Maps integration.',
    fullDesc: 'DermaCare is a highly customized design project created for a high-end skin clinic. It streamlines scheduling through a clean client booking system while showcasing practitioner credentials, custom cosmetic menus, and integrated patient reviews. The goal of this release was to improve clinic appointment conversion rates by 48% with a pristine aesthetic.',
    colorClass: 'from-purple-950 to-indigo-900',
    emoji: '🏥',
    link: 'https://darmacare.vercel.app/',
    features: [
      'Interactive service menus with pricing calculators',
      'Real-time appointment scheduler with calendar visualizer',
      'Fully responsive layouts engineered with beautiful grids',
      'Optimized performance achieving straight 100 Lighthouse scores'
    ],
    duration: '3 Weeks',
    status: 'Completed & Live',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg'
  },
  {
    id: 'theolivetable',
    name: 'Theolivetable — Restaurant Website',
    category: 'Real Project',
    type: 'Fine-Dining Restaurant Website',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Reservation Engine'],
    desc: 'Sophisticated web presence for an upscale restaurant, featuring dynamic reservation booking, interactive seasonal menus, and elegant curation.',
    fullDesc: 'Theolivetable is a premium fine-dining website designed with gorgeous layout typography. It elevates the reservation process, showcases exquisite menus with real-time seasonal updates, and integrates directly with frictionless table-planning booking tools.',
    colorClass: 'from-emerald-950 to-slate-900',
    emoji: '🍽️',
    link: 'https://theolivetable.vercel.app/',
    features: [
      'Exquisite responsive menus detailing interactive ingredients and culinary stories',
      'Seamless online table booking flow with live seating requests',
      'Stunning fluid image presentations matching upscale gastronomic aesthetics',
      'Custom styled Google Maps integration and localized contact badges'
    ],
    duration: '4 Weeks',
    status: 'Completed & Live',
    image: 'https://images.pexels.com/photos/31071253/pexels-photo-31071253.jpeg'
  },
  {
    id: 'theroastedbean',
    name: 'The Roasted Bean — Cafe Website',
    category: 'Real Project',
    type: 'Cafe Experience & Menu System',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'SEO Suite'],
    desc: 'Artisanal coffee roastery & cafe web app featuring interactive beverage menus, rich visual branding, and smooth animations.',
    fullDesc: 'The Roasted Bean is an elegant, bespoke digital experience crafted for a modern third-wave coffee roastery. It features beautiful typography pairings, interactive sensory flavor profiles, automated business details schema, and smooth transitions that showcase artisanal coffee roasting heritage.',
    colorClass: 'from-amber-950 to-amber-900',
    emoji: '☕',
    link: 'https://theroastedbean.vercel.app/',
    features: [
      'Interactive drink menus with customizable visual add-on selections',
      'Fluid storytelling scrolling sections highlighting bean farm sources',
      'Completely responsive layouts leveraging warm organic earth-tones',
      'Optimized lightweight asset delivery with lightning fast speed'
    ],
    duration: '2 Weeks',
    status: 'Completed & Live',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
  },
  {
    id: 'taskflow',
    name: 'Alpha Forge Fitness — Gym Website',
    category: 'Exploration',
    type: 'Fitness Brand & Gym Platform',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Class Scheduler'],
    desc: 'Bespoke high-performance gym website showcasing interactive weekly timetables, dynamic pricing tiers, and modern trainer profiles.',
    fullDesc: 'Alpha Forge Fitness is a high-energy premium gym showcase engineered to drive client enrollment. It features immersive vertical layouts, dynamic class schedules filterable by workout intensity, sleek interactive pricing structures, and beautiful athletic photography highlights.',
    colorClass: 'from-orange-950 to-stone-900',
    emoji: '💪',
    link: 'https://alphaforge-chi.vercel.app/',
    features: [
      'Interactive weekly class schedule and intensity filter panels',
      'Real-time flexible membership calculator detailing individual benefits',
      'Polished high-energy kinetic typography paired with smooth scroll flows',
      'Custom dark aesthetic utilizing bold warnings of high-performance accents'
    ],
    duration: '1 Week',
    status: 'Concept Exploration',
    image: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg'
  }
];

const GlitchImage = ({ 
  src, 
  alt, 
  className, 
  style 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  style?: CSSProperties;
}) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchStyle, setGlitchStyle] = useState<{ clipPath?: string; transform?: string; filter?: string }>({});

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    let isMounted = true;
    
    const triggerGlitchBurst = (duration = 200) => {
      if (!isMounted) return;
      setGlitchActive(true);
      const interval = setInterval(() => {
        if (!isMounted) {
          clearInterval(interval);
          return;
        }
        const top = Math.floor(Math.random() * 85);
        const bottom = Math.floor(Math.random() * 15) + top;
        const shift = Math.floor(Math.random() * 16) - 8;
        setGlitchStyle({
          clipPath: `inset(${top}% 0% ${100 - bottom}% 0%)`,
          transform: `translate(${shift}px, ${Math.floor(Math.random() * 6) - 3}px) scale(${1 + Math.random() * 0.03})`,
          filter: `hue-rotate(${Math.random() * 360}deg) contrast(${1.1 + Math.random() * 0.3}) saturate(${1.3 + Math.random()})`
        });
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        if (isMounted) {
          setGlitchActive(false);
          setGlitchStyle({});
        }
      }, duration);
    };

    // Trigger high-frequent bursts on page load
    timeouts.push(setTimeout(() => triggerGlitchBurst(350), 300));
    timeouts.push(setTimeout(() => triggerGlitchBurst(250), 900));
    timeouts.push(setTimeout(() => triggerGlitchBurst(450), 1600));

    // Background intermittent brief glitch loop
    const periodicInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        triggerGlitchBurst(200);
      }
    }, 5000);

    return () => {
      isMounted = false;
      timeouts.forEach(t => clearTimeout(t));
      clearInterval(periodicInterval);
    };
  }, []);

  const handleMouseEnter = () => {
    setGlitchActive(true);
    let count = 0;
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 90);
      const bottom = Math.min(100, Math.floor(Math.random() * 20) + top);
      const shift = Math.floor(Math.random() * 24) - 12;
      setGlitchStyle({
        clipPath: `inset(${top}% 0% ${100 - bottom}% 0%)`,
        transform: `translate(${shift}px, ${Math.floor(Math.random() * 8) - 4}px) scale(${1.01 + Math.random() * 0.03})`,
        filter: `hue-rotate(${Math.random() * 360}deg) sepia(0.2) saturate(${1.8 + Math.random()})`
      });
      count++;
      if (count > 10) {
        clearInterval(interval);
        setGlitchActive(false);
        setGlitchStyle({});
      }
    }, 45);
  };

  return (
    <div 
      className="relative select-none w-full h-auto cursor-none group/glitch-container"
      onMouseEnter={handleMouseEnter}
    >
      {/* Red Aberration Copy */}
      {glitchActive && (
        <img 
          src={src} 
          alt={alt}
          referrerPolicy="no-referrer"
          className={`${className} absolute left-[-6px] top-0 opacity-80 mix-blend-screen z-0 filter saturate-[5] hue-rotate-[320deg]`}
          style={{
            ...style,
            ...glitchStyle,
            transform: `${glitchStyle.transform || ''} translate(-6px, ${Math.random() * 4 - 2}px)`
          }}
        />
      )}

      {/* Blue/Cyan Aberration Copy */}
      {glitchActive && (
        <img 
          src={src} 
          alt={alt}
          referrerPolicy="no-referrer"
          className={`${className} absolute left-[6px] top-0 opacity-80 mix-blend-screen z-0 filter saturate-[5] hue-rotate-[180deg]`}
          style={{
            ...style,
            ...glitchStyle,
            transform: `${glitchStyle.transform || ''} translate(6px, ${Math.random() * 4 - 2}px)`
          }}
        />
      )}

      {/* Main Base Image */}
      <img 
        src={src} 
        alt={alt}
        referrerPolicy="no-referrer"
        className={`${className} relative z-10 transition-all duration-300`}
        style={{
          ...style,
          ...(glitchActive ? glitchStyle : {})
        }}
      />
    </div>
  );
};

export default function App() {
  // Navigation & Scroll Progress States
  const [activeSection, setActiveSection] = useState('hero');
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // Custom Interactive Mouse Cursor States
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Parallax Hero Mouse Tracking States
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Filtering System for Projects
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Real Project' | 'Exploration'>('All');

  // Slide-over case study drawer state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formPending, setFormPending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Layout element references
  const heroRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Pointer & Device Detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Direct Coordinates
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Parallax text calculations
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setParallaxOffset({ x: dx * -25, y: dy * -15 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic Hover Element Sniffing using Lightweight Event Delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        target.closest('.service-row') ||
        target.closest('[role="button"]') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Active Section Intersection Tracker
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const refs = [
        { id: 'hero', element: heroRef.current },
        { id: 'work', element: workRef.current },
        { id: 'service', element: serviceRef.current },
        { id: 'experience', element: experienceRef.current },
        { id: 'contact', element: contactRef.current }
      ];

      for (const section of refs) {
        if (section.element) {
          const top = section.element.offsetTop;
          const height = section.element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Set desktop cursor active class for global overrides (hide systems cursor)
  useEffect(() => {
    if (!isMobile) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  // Copy Email Helper Integration
  const copyToClipboard = () => {
    navigator.clipboard.writeText('khanshadabkhan4671@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  // Submit Contact Form simulation
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    
    setFormPending(true);
    setTimeout(() => {
      setFormPending(false);
      setFormSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 1500);
  };

  // Filter projects based on React category state
  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <div id="_app_root" className="min-h-screen font-sans bg-brand-bg text-brand-black selection:bg-brand-black selection:text-brand-bg transition-colors duration-300">
      
      {/* ── CUSTOM INTERACTIVE CURSOR ── */}
      {!isMobile && (
        <div id="tracked-cursor" className="pointer-events-none fixed top-0 left-0 z-[1000] mix-blend-difference hidden md:block">
          {/* Inner dot */}
          <div 
            className="w-2 h-2 rounded-full bg-brand-bg fixed -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          />
          {/* Outer Ring */}
          <div 
            className="rounded-full border border-brand-bg fixed -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out"
            style={{ 
              left: `${cursorPos.x}px`, 
              top: `${cursorPos.y}px`,
              width: isHovered ? '64px' : '36px',
              height: isHovered ? '64px' : '36px',
              backgroundColor: isHovered ? 'rgba(255, 255, 240, 0.15)' : 'transparent',
              borderColor: isHovered ? '#FFFFFF' : 'rgba(255, 255, 240, 0.5)'
            }}
          />
        </div>
      )}

      {/* ── FIXED NAV ── */}
      <motion.nav 
        id="nav-container"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 md:px-12 h-20 bg-brand-bg/95 backdrop-blur-md border-b border-brand-black/5"
      >
        {/* Brand / Status Light combo on Left */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 select-none">
          <span className="font-syne font-extrabold text-sm sm:text-base md:text-lg text-brand-black tracking-tight uppercase">
            Shadab
          </span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>

        {/* Dynamic Nav Anchors */}
        <ul className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-5 md:gap-8 mx-auto sm:mx-0">
          {[
            { id: 'work', label: 'Work' },
            { id: 'service', label: 'Service' },
            { id: 'experience', label: 'Experience' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-[9px] min-[360px]:text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase transition-colors duration-200 relative py-1 ${
                  activeSection === item.id ? 'text-brand-black font-extrabold' : 'text-brand-gray hover:text-brand-black'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-black rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>


      </motion.nav>

      {/* ── HERO SECTION ── */}
      <section 
        ref={heroRef}
        id="hero" 
        className="min-h-screen relative flex items-start md:items-end overflow-hidden pt-28 pb-16 px-6 md:px-12 bg-wrap"
      >
        {/* Parallax Background Big Typography */}
        <div 
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden"
          style={{
            transform: `translate3d(${isMobile ? 0 : parallaxOffset.x}px, ${isMobile ? 0 : parallaxOffset.y}px, 0)`,
            transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <span className="font-syne font-extrabold text-[12vw] tracking-[-0.04em] leading-none text-transparent stroke-text opacity-40 select-none uppercase">
            SHADAB
          </span>
        </div>

        {/* Absolute Centered Portrait Frame on Desktop ONLY */}
        <div className="hidden md:flex absolute inset-x-0 bottom-0 top-1/4 justify-center items-end z-10 pointer-events-none">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-64 sm:w-72 md:w-[420px] max-h-[76%] md:max-h-[85%] overflow-hidden pointer-events-auto filter grayscale contrast-115 hover:grayscale-0 transition-all duration-700 ease-in-out cursor-none"
          >
            <GlitchImage 
              src={shadabAvatar} 
              alt="Shadab - Modern Developer" 
              className="w-full h-auto object-cover select-none block origin-bottom scale-100 hover:scale-[1.03] transition-transform duration-700 ease-in-out"
              style={{
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%)'
              }}
            />
          </motion.div>
        </div>

        {/* Combined Layout Wrapper: Absolute centered on Desktop, stacked flex sequence on Mobile */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between z-20 relative pointer-events-none gap-8 md:gap-0 mt-8 md:mt-0">
          
          {/* Floating Left Manifesto Panel */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="max-w-xs md:max-w-sm ml-0 md:mb-12 text-left pointer-events-auto shrink-0"
          >
            <h1 className="font-syne font-bold text-lg md:text-2xl text-brand-black tracking-tight mb-2">
              Web Developer
            </h1>
            <p className="text-sm text-brand-gray leading-relaxed mb-6 font-medium">
              Building fast, ultra-clean, and conversion-focused websites for ambitious brands looking to scale their digital experience.
            </p>
            <button
              onClick={() => window.open('https://wa.me/917891772709', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-black text-brand-bg text-sm font-semibold hover:bg-neutral-800 transition-all duration-300 font-syne group shadow-sm"
            >
              Let's collaborate
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Portrait Frame - Relative on Mobile ONLY, positioned below Manifesto */}
          <div className="flex md:hidden flex-col items-center justify-end z-10 pointer-events-none w-full h-auto">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-64 sm:w-72 overflow-hidden pointer-events-auto filter grayscale contrast-115 hover:grayscale-0 transition-all duration-700 ease-in-out cursor-none"
            >
              <GlitchImage 
                src={shadabAvatar} 
                alt="Shadab - Modern Developer" 
                className="w-full h-auto object-cover select-none block origin-bottom scale-100 hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                style={{
                  maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%)',
                  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%)'
                }}
              />
            </motion.div>
          </div>

          {/* Social Media Anchors - Float/Right on Desktop, Centered block below Image on Mobile */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start gap-2 md:gap-3 pointer-events-auto flex-wrap w-full md:w-auto z-25 md:mb-12"
          >
            {[
              { label: 'WhatsApp', icon: <MessageSquare className="w-4 h-4 text-green-500" />, url: 'https://wa.me/917891772709' },
              { label: 'Instagram', icon: <Instagram className="w-4 h-4 text-rose-500" />, url: 'https://www.instagram.com/ykm.shadab?igsh=MWFyZmxmcGJmNWVieA==&utm_source=ig_contact_invit' },
              { label: 'Email', icon: <Mail className="w-4 h-4" />, url: 'mailto:khanshadabkhan4671@gmail.com' }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-brand-black/10 rounded-full bg-brand-bg/80 backdrop-blur-sm text-[11px] md:text-xs font-semibold text-brand-black hover:bg-brand-black hover:text-brand-bg hover:border-brand-black transition-all duration-300"
              >
                {social.icon}
                <span>{social.label}</span>
              </a>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── INFINITE INDUSTRIAL MARQUEE RUNNER ── */}
      <div id="tech-marquee-bar" className="bg-brand-black py-4 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee min-w-full shrink-0">
            {[
              'HTML & CSS', 'JavaScript', 'React.js', 'Vite', 'Responsive Design', 
              'UX Optimization', 'SaaS Branding', 'Tailwind CSS', 'High Conversions', 'Seo Strategy'
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-4 px-6 font-syne text-xs font-bold tracking-widest text-[#F5F5F0]/60 uppercase whitespace-nowrap">
                <span className="text-white/30 text-xs">✦</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee min-w-full shrink-0" aria-hidden="true">
            {[
              'HTML & CSS', 'JavaScript', 'React.js', 'Vite', 'Responsive Design', 
              'UX Optimization', 'SaaS Branding', 'Tailwind CSS', 'High Conversions', 'Seo Strategy'
            ].map((skill, index) => (
              <div key={index} className="flex items-center gap-4 px-6 font-syne text-xs font-bold tracking-widest text-[#F5F5F0]/60 uppercase whitespace-nowrap">
                <span className="text-white/30 text-xs">✦</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SELECTED WORK PORTFOLIO SECTION ── */}
      <section 
        ref={workRef}
        id="work" 
        className="relative py-28 px-6 md:px-12 bg-brand-bg overflow-hidden"
      >
        {/* Absolute section background labels */}
        <div className="absolute top-8 left-0 right-0 select-none pointer-events-none z-0 px-6 md:px-12">
          <span className="font-syne font-extrabold text-[10vw] tracking-tighter text-transparent stroke-text opacity-4 select-none uppercase leading-none block">
            PORTFOLIO
          </span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Work Header with dynamic categories */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-2">/Selected Work</p>
              <h2 className="font-syne font-extrabold text-3xl md:text-5xl text-brand-black tracking-tight leading-none uppercase">
                /Selected Work
              </h2>
            </div>

            {/* Premium Sorting Tabs Controls */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex gap-1 bg-brand-light/70 p-1 rounded-full border border-brand-black/5">
                {(['All', 'Real Project', 'Exploration'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 relative ${
                      selectedCategory === cat 
                        ? 'text-brand-bg bg-brand-black shadow-sm' 
                        : 'text-brand-gray hover:text-brand-black hover:bg-brand-black/5 bg-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2 hover:bg-brand-black hover:text-brand-bg transition-colors duration-300 border border-brand-black/10 rounded-full text-xs font-bold font-syne"
              >
                Hire Me ↗
              </button>
            </div>
          </div>

          {/* Dynamic Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id}
                  className="project-card group rounded-2xl border border-brand-black/5 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full cursor-none"
                >
                  {/* Aspect Thumbnail banner */}
                  <div className={`aspect-video w-full flex items-center justify-center text-6xl relative bg-gradient-to-br ${project.colorClass} overflow-hidden`}>
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.name}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-[1.05] transition-transform duration-700 ease-in-out"
                      />
                    ) : (
                      <span className="transform transition-transform duration-500 group-hover:scale-125 select-none filter drop-shadow-md">
                        {project.emoji}
                      </span>
                    )}
                    <span className="absolute top-4 left-4 text-[10px] font-extrabold tracking-widest uppercase bg-brand-bg px-2.5 py-1 rounded-full text-brand-black shadow-sm z-10">
                      {project.category}
                    </span>
                  </div>

                  {/* Info details */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {project.tech.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold text-brand-gray px-2 py-0.5 border border-brand-black/5 rounded-full bg-brand-bg uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-syne font-bold text-lg md:text-xl text-brand-black mb-2 leading-tight">
                      {project.name}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-brand-gray leading-relaxed mb-6 flex-grow">
                      {project.desc}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-black/5">
                      {project.id === 'theolivetable' || project.id === 'theroastedbean' || project.id === 'dermacare' || project.id === 'taskflow' ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-extrabold text-brand-black border-b border-brand-black/30 pb-0.5 hover:border-brand-black transition-colors flex items-center gap-1 font-syne pointer-events-auto"
                        >
                          Explore Website ↗
                        </a>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs font-extrabold text-brand-black border-b border-brand-black/30 pb-0.5 hover:border-brand-black transition-colors flex items-center gap-1 font-syne"
                        >
                          Explore Case Study ↗
                        </button>
                      )}
                      <span className="text-[10px] font-bold text-brand-gray/60 uppercase">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── PRO SERVICES SECTOR ── */}
      <section 
        ref={serviceRef}
        id="service" 
        className="relative py-28 px-6 md:px-12 bg-white border-t border-brand-black/5 overflow-hidden"
      >
        <div className="absolute top-8 left-0 right-0 select-none pointer-events-none z-0 px-6 md:px-12">
          <span className="font-syne font-extrabold text-[10vw] tracking-tighter text-transparent stroke-text opacity-4 select-none uppercase leading-none block">
            SERVICE
          </span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-1">/Services Portfolio</p>
            <h2 className="font-syne font-extrabold text-3xl md:text-5xl text-brand-black tracking-tight mb-16 uppercase">
              /Service Specialties
            </h2>
          </div>

          <div className="flex flex-col border-t border-brand-black/10">
            {[
              { id: 'dev', title: 'Web Design & Dev', desc: 'Crafting responsive, secure, semantic hand-coded Web Experiences utilizing state of the art React configurations.' },
              { id: 'landing', title: 'Landing Pages', desc: 'Highly interactive landing experiences crafted specifically to drive action, signups, booking volume or sales referrals.' },
              { id: 'stores', title: 'Good Work Under Budget', desc: "Don't run everywhere and negotiate for dead website just get your website in 5K-10K" },
              { id: 'seo', title: 'SEO & Performance Speed', desc: 'Optimizing sites for high-speed metrics, accessibility scores, custom structured search data and ranking performance.' }
            ].map((srv, idx) => (
              <motion.div 
                key={srv.id}
                whileHover="hover"
                className="service-row group border-b border-brand-black/10 py-8 relative overflow-hidden transition-all duration-500 cursor-none"
                onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                {/* Background sliding ink panel */}
                <span className="absolute top-0 bottom-0 -left-full w-full bg-brand-black group-hover:left-0 transition-all duration-500 ease-out z-0 pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10 gap-4 px-2">
                  <div className="max-w-md">
                    <h3 className="font-syne font-extrabold text-xl md:text-3xl text-brand-black group-hover:text-white transition-colors duration-400 uppercase">
                      {srv.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-gray group-hover:text-neutral-300 mt-2 transition-colors duration-400">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-wide font-extrabold text-[#888] group-hover:text-white/40 transition-colors uppercase">
                      Inquire now
                    </span>
                    <ArrowUpRight className="w-6 h-6 text-brand-gray group-hover:text-white transition-all duration-400 group-hover:rotate-45" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE SECTION ── */}
      <section 
        ref={experienceRef}
        id="experience"
        className="relative py-28 px-6 md:px-12 bg-brand-dark-section text-brand-bg overflow-hidden"
      >
        <div className="absolute top-8 left-0 right-0 select-none pointer-events-none z-0 px-6 md:px-12">
          <span className="font-syne font-extrabold text-[8vw] sm:text-[10vw] tracking-tighter text-transparent stroke-text-light opacity-3 select-none uppercase leading-none block">
            EXPERIENCE
          </span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#888888] mb-1">/Professional Milestones</p>
              <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none uppercase">
                /Experience
              </h2>
            </div>
            
            <div></div>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {[
              {
                role: 'Independent Web Developer & Designer',
                company: 'Freelance Workspace',
                duration: '2024 – Present',
                details: 'Specialize in building performance-oriented, structured conversion landing pages for medical practitioners, boutique local businesses, and specialized startups. Hand-coded responsive styling delivering top mobile performance scores.'
              },
              {
                role: 'Self-Taught Engineering Foundations',
                company: 'Open-Source Learning & Project Development',
                duration: '2023 – 2024',
                details: 'Committed to in-depth research of progressive rendering principles, component modularity strategies, layout mechanics, state synchronizations, and advanced CSS integrations. Constructed numerous concepts and custom user components.'
              },
              {
                role: 'Aesthetic Interface Design Practitioner',
                company: 'Creative Layout Research',
                duration: '2022 – 2023',
                details: 'Explored core digital illustration principles, typographic hierarchy combinations, spatial grid systems, color harmonies, vector graphic creations, and accessibility (WCAG) compliance layout strategies.'
              }
            ].map((exp, idx) => (
              <div 
                key={idx} 
                className="py-10 border-b border-white/10 flex flex-col md:flex-row justify-between gap-6 hover:bg-white/5 px-2 transition-all duration-300"
              >
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full">
                      {exp.company}
                    </span>
                    <span className="text-xs font-medium text-neutral-400">
                      {exp.duration}
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-lg md:text-xl text-white">
                    {exp.role}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mt-3">
                    {exp.details}
                  </p>
                </div>
                
                <div className="flex items-start md:justify-end shrink-0 md:pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400">
                    <Briefcase className="w-3.5 h-3.5 text-[#888]" />
                    <span>Project-focused</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CONTACT AND CTA FORM ── */}
      <section 
        ref={contactRef}
        id="contact" 
        className="relative py-28 px-6 md:px-12 bg-brand-bg overflow-hidden border-t border-brand-black/5"
      >
        <div className="absolute top-8 left-0 right-0 select-none pointer-events-none z-0 px-6 md:px-12">
          <span className="font-syne font-extrabold text-[10vw] tracking-tighter text-transparent stroke-text opacity-4 select-none uppercase leading-none block">
            CONTACT ME
          </span>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left info column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full border-brand-black/10 bg-white shadow-xs mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-blink"></span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-black">Available for work</span>
              </div>
              
              <h2 className="font-syne font-extrabold text-3.5xl md:text-5.5.5xl text-brand-black tracking-tight leading-none uppercase mb-6">
                Let's form a<br />partnership.
              </h2>
              
              <p className="text-xs md:text-sm text-brand-gray leading-relaxed mb-8 max-w-sm">
                Have a vision, an active branding project, or a clinic waiting to reach more local physical traffic? Let's consult and set up a state-of-the-art site.
              </p>

              {/* Direct Touch Info links */}
              <div className="flex flex-col gap-3 font-semibold text-md mb-8">
                <a 
                  href="mailto:khanshadabkhan4671@gmail.com" 
                  className="flex items-center gap-3 hover:text-brand-gray transition-colors text-brand-black font-syne group text-sm md:text-base border-b border-brand-black/10 pb-2 max-w-sm"
                >
                  <Mail className="w-4 h-4 text-brand-gray group-hover:scale-110 transition-transform" />
                  <span>khanshadabkhan4671@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-brand-black font-syne text-sm md:text-base max-w-sm justify-between">
                  <a 
                    href="https://wa.me/917891772709"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:text-brand-gray transition-colors"
                  >
                    <Phone className="w-4 h-4 text-brand-gray" />
                    <span>+91 78917 72709</span>
                  </a>
                  <span className="text-[10px] font-bold text-green-600 bg-green-100/50 px-2 py-0.5 rounded-full">WA Preferred</span>
                </div>
              </div>
            </div>

            {/* Quick action triggers */}
            <div className="flex items-center gap-4 flex-wrap mt-auto">
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-brand-black hover:text-brand-bg transition-all duration-300 border border-brand-black/10 rounded-full text-xs font-bold"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
              </button>
            </div>
          </div>

          {/* Right interactive form card column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-brand-black/5 shadow-md flex flex-col justify-between h-full relative overflow-hidden group">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:scale-150 duration-700" />
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-700 rounded-full text-[10px] font-bold tracking-wider uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Fast Track Connection
                </div>
                
                <h3 className="font-syne font-extrabold text-2xl text-brand-black mb-4 uppercase tracking-normal leading-tight">
                  Start Your Project<br />On WhatsApp
                </h3>
                
                <p className="text-xs md:text-sm text-brand-gray leading-relaxed mb-6 font-medium">
                  Skip the long forms and cold emails. Tap below to launch a direct, secure conversation with me on WhatsApp. Let's discuss your web design or landing page goals instantly.
                </p>

                {/* Simulated Chat Interface Decor */}
                <div className="bg-brand-bg/50 border border-brand-black/5 p-4 rounded-xl mb-6 space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <div className="w-8 h-8 rounded-full bg-brand-black text-brand-bg flex items-center justify-center text-xs font-bold font-syne shrink-0">
                      S
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-brand-black/5 shadow-xs max-w-[85%]">
                      <p className="text-xs font-semibold text-brand-black">
                        Hey there! ✦ What kind of website or landing page are we building today?
                      </p>
                      <span className="text-[9px] font-bold text-brand-gray/50 block mt-1 text-right">Just now</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2.5 items-start justify-end">
                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-sm shadow-xs max-w-[85%] text-left">
                      <p className="text-xs font-semibold">
                        Hi Shadab, I saw your portfolio and would love to discuss a project!
                      </p>
                      <span className="text-[9px] text-white/75 block mt-1 text-right">Template Message</span>
                    </div>
                  </div>
                </div>

                {/* Value Props */}
                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-brand-gray mb-8">
                  <div className="flex items-center gap-2 bg-brand-bg/30 p-2.5 rounded-lg border border-brand-black/5">
                    <span className="text-green-500 text-sm">✓</span>
                    <span>15-Min Response</span>
                  </div>
                  <div className="flex items-center gap-2 bg-brand-bg/30 p-2.5 rounded-lg border border-brand-black/5">
                    <span className="text-green-500 text-sm">✓</span>
                    <span>Direct Chat</span>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/917891772709?text=Hi%20Shadab,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-syne font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 pointer-events-auto cursor-none group"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </div>
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMMERSIVE DRAWER MODAL Showcase ── */}
      <AnimatePresence>
        {selectedProject && (
          <div key="modal-overlay" className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
            {/* Backdrop cover blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-black/45 backdrop-blur-xs cursor-none"
            />

            {/* Slide-over catalog cabinet */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 33, stiffness: 220 }}
              className="w-full max-w-xl bg-brand-bg text-brand-black h-full shadow-2xl overflow-y-auto px-6 py-28 relative z-10 flex flex-col justify-between border-l border-brand-black/10"
            >
              <div>
                {/* Header elements */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-black/10">
                  <span className="text-[10px] font-extrabold tracking-widest uppercase bg-brand-black text-brand-bg px-3 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                  
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-1 px-3 border border-brand-black/10 hover:bg-brand-black hover:text-brand-bg rounded-full text-xs font-bold font-syne flex items-center gap-1 transition-all"
                  >
                    <X className="w-3 h-3" />
                    <span>Close</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl filter drop-shadow-sm select-none">{selectedProject.emoji}</span>
                  <div>
                    <p className="text-xs font-extrabold text-[#888] uppercase tracking-wider">{selectedProject.type}</p>
                    <h3 className="font-syne font-extrabold text-xl md:text-2xl text-brand-black leading-tight uppercase">
                      {selectedProject.name}
                    </h3>
                  </div>
                </div>

                {selectedProject.image && (
                  <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 border border-brand-black/5">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Grid attributes */}
                <div className="grid grid-cols-2 gap-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-brand-black/5 my-6 text-xs font-semibold">
                  <div>
                    <span className="block text-brand-gray text-[10px] font-extrabold uppercase tracking-wide mb-0.5">Duration:</span>
                    <span className="text-brand-black font-syne">{selectedProject.duration}</span>
                  </div>
                  <div>
                    <span className="block text-brand-gray text-[10px] font-extrabold uppercase tracking-wide mb-0.5">Status:</span>
                    <span className="text-brand-black font-syne flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-syne font-bold text-sm text-brand-black mb-2 uppercase tracking-wide">
                    The Design Philosophy
                  </h4>
                  <p className="text-xs md:text-sm text-brand-gray leading-relaxed font-medium">
                    {selectedProject.fullDesc}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-syne font-bold text-sm text-brand-black mb-3 uppercase tracking-wide">
                    Features Implemented
                  </h4>
                  <ul className="space-y-2.5 text-xs font-medium text-brand-gray">
                    {selectedProject.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="font-syne font-bold text-sm text-brand-black mb-3 uppercase tracking-wide">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tag, idx) => (
                      <span key={idx} className="bg-white border border-brand-black/10 px-2.5 py-1 text-[10px] font-bold uppercase rounded-full text-brand-black">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="border-t border-brand-black/10 pt-4 mt-auto flex items-center justify-between">
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => {
                    if (selectedProject.id === 'theolivetable' || selectedProject.id === 'theroastedbean' || selectedProject.id === 'dermacare' || selectedProject.id === 'taskflow') {
                      return; // Bypass the simulated alert to navigate directly
                    }
                    e.preventDefault();
                    alert("This is a simulated high-fidelity preview built within the portfolio sandbox!");
                  }}
                  className="px-6 py-3 bg-brand-black hover:bg-neutral-800 text-brand-bg rounded-xl text-xs font-bold tracking-wider font-syne uppercase inline-flex items-center gap-2 transition-colors pointer-events-auto"
                >
                  <span>Launch Live Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setTimeout(() => {
                      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 350);
                  }}
                  className="px-5 py-3 border border-brand-black/10 hover:border-brand-black text-xs font-bold rounded-xl text-brand-black font-syne uppercase transition-all"
                >
                  Inquire project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="bg-brand-black py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-white/20 bg-neutral-900 flex items-center justify-center text-xl select-none">
            👨‍💻
          </div>
          <div>
            <span className="block font-syne font-extrabold text-lg text-white tracking-tight uppercase leading-none mb-1">
              Shadab
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#888888]">
              Portfolio Edition 2023
            </span>
          </div>
        </div>

        {/* Short footer nav links */}
        <div className="flex gap-4 flex-wrap justify-center text-[#888888] font-semibold text-xs">
          <a href="#work" className="hover:text-white transition-colors">Portfolios</a>
          <span className="text-white/10">|</span>
          <a href="#service" className="hover:text-white transition-colors">Services</a>
          <span className="text-white/10">|</span>
          <a href="#experience" className="hover:text-white transition-colors">Milestones</a>
          <span className="text-white/10">|</span>
          <a href="#contact" className="hover:text-white transition-colors">Let's talk</a>
        </div>

        {/* Micro copy and social handles */}
        <div className="flex items-center gap-3 flex-wrap">
          <a 
            href="https://wa.me/917891772709" 
            target="_blank" 
            rel="noreferrer"
            className="w-10 h-10 border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-full flex items-center justify-center text-white transition-all text-green-500"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <a 
            href="https://www.instagram.com/ykm.shadab?igsh=MWFyZmxmcGJmNWVieA==&utm_source=ig_contact_invit" 
            target="_blank" 
            rel="noreferrer"
            className="w-10 h-10 border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-full flex items-center justify-center text-white transition-all text-rose-500"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </footer>

    </div>
  );
}
