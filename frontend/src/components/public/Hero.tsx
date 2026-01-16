"use client";

import React, { useRef, useState, useEffect } from "react";
import { Linkedin, Github, Instagram, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from 'react-i18next';
import TextType from "../animations/TextType";
import GradientText from "../animations/GradientText";
import ScrollVelocity from "../ScrollVelocity";


import Prism from "../Prism";

const techIcons = [
  // --- Üst Bölüm (Web & Frontend) ---
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', top: '-17%', left: '56%' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', top: '4%', right: '1%' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', top: '-27%', right: '45%', isDark: true },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', top: '35%', right: '-12%' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', top: '55%', right: '-10%' },

  // --- Sağ & Alt Bölüm (Python & AI / ML / NLP) ---
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', top: '-10%', left: '35%' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', top: '-15%', right: '-12%' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', bottom: '75%', right: '-19%' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', bottom: '5%', right: '-6%' },
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', bottom: '-22%', left: '60%' },

  // --- Sol Bölüm (Mühendislik Dilleri) ---
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', top: '95%', right: '4%' },
  { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', top: '110%', left: '95%' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', top: '-20%', right: '5%' },

  // --- İç Çember & Alt Araçlar (Veri Görselleştirme & Veritabanı) ---
  { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg', bottom: '-10%', right: '-16%' },
  { name: 'Seaborn', icon: 'https://seaborn.pydata.org/_images/logo-mark-lightbg.svg', bottom: '17%', right: '-18%' },
  { name: 'PostgreSQL/SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', bottom: '-14%', right: '18%' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', top: '-12%', right: '18%' },
];

const Hero = ({ initialData }: { initialData?: any }) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const cvUrl = (isEn && initialData?.cv_url_en) ? initialData.cv_url_en : initialData?.cv_url;
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLogos, setShowLogos] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleProfileHover = () => {
    setShowLogos(true);

    // Reset existing timer if any
    if (timerRef.current) clearTimeout(timerRef.current);

    // Set timer to hide logos after 3 seconds
    timerRef.current = setTimeout(() => {
      setShowLogos(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#020617]" ref={containerRef}>
      {/* ================= BACKGROUND ================= */}

      {/* Prism Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Prism
          colorFrequency={1.8}
        />
      </div>

      {/* Ana gradient Layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(60% 80% at 85% 40%, rgba(59, 130, 246, 0.15), transparent 70%),
            radial-gradient(50% 70% at 20% 60%, rgba(15, 23, 42, 0.3), transparent 70%)
          `,
        }}
      />

      {/* ================= CONTENT ================= */}

      <main className="relative z-10 flex-grow flex items-center px-4 sm:px-8 py-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 text-center lg:text-left">

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gradient focus:outline-none ">
                {t('hero.greeting')} <br />

                <span className="relative inline-block mt-2 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.7]">
                  <GradientText>
                    <TextType
                      text={"Betül Cengiz"}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                    ></TextType>
                  </GradientText>
                </span>
              </h1>

              <h2 className="animate-fade-in-up animation-delay-200 text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] text-gray-300 text-white">
                <span className="text-white   ">{t('hero.role')}</span>
              </h2>
            </div>

            <p className="animate-fade-in-up animation-delay-200 text-sm sm:text-base lg:text-xl font-bold leading-[1.1] text-gray-300 text-white">{t('hero.description')}</p>

            <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white hover:text-primary text-base font-bold px-8 py-4 rounded-xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"              >
                {t('hero.view_projects')}
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>

              {cvUrl && (
                <a
                  href={cvUrl}
                  target="_blank"
                  className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white hover:text-primary text-base font-bold px-8 py-4 rounded-xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    description
                  </span>
                  {t('hero.download_cv')}
                </a>
              )}
            </div>

            <div className="animate-fade-in-up animation-delay-500 flex gap-8 pt-2 px-4 justify-center lg:justify-start">
              <a href="https://www.linkedin.com/in/betulcengiz" className="text-white hover:text-pink-800 transition-transform hover:scale-115 "><Linkedin size={28} /></a>
              <a href="https://github.com/BetulCengiz" className="text-white hover:text-pink-800 transition-transform hover:scale-115"><Github size={28} /></a>
              <a href="https://www.instagram.com/betul_cengiz" className="text-white hover:text-pink-800 transition-transform hover:scale-115"><Instagram size={28} /></a>
              <a href="https://www.youtube.com/c/BetülCengiz" className="text-white hover:text-pink-800 transition-transform hover:scale-115"><Youtube size={28} /></a>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative animate-fade-in-up animation-delay-300">
            {/* Tech Logos */}
            <AnimatePresence>
              {showLogos && techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, scale: 0, y: 10 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 15,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 0 13px rgba(206, 220, 243, 0.4)"
                  }}
                  className="absolute z-30 w-10 h-10 sm:w-12 sm:h-12 p-2.5 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer group"
                  style={{
                    top: tech.top,
                    left: tech.left,
                    right: tech.right,
                    bottom: tech.bottom,
                    backgroundColor: "rgba(4, 22, 46, 0.29)"
                  }}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className={`w-full h-full object-contain ${tech.isDark ? 'brightness-200 grayscale-0' : ''}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'; // Fallback
                    }}
                  />

                  {/* Tooltip on hover */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/20 whitespace-nowrap pointer-events-none scale-50 group-hover:scale-100 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-50">
                    {tech.name}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Glow halo */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-[100px] opacity-40"></div>

            <div
              onMouseEnter={handleProfileHover}
              className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-2 border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden ring-1 ring-white/10 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 transition-opacity duration-500 group-hover:opacity-40 "></div>
              <div
                className="w-full h-full rounded-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 z-20"
                style={{ backgroundImage: `url("${initialData?.profile_image || "/profil.png"}")` }}
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;