"use client";

import React, { useRef } from "react";
import { Linkedin, Github, Instagram, Youtube } from "lucide-react";
import TextType from "../animations/TextType";
import GradientText from "../animations/GradientText";
import ScrollVelocity from "../ScrollVelocity";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* ================= BACKGROUND ================= */}

      {/* Ana gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(60% 80% at 85% 40%, rgba(59, 131, 246, 0.2), transparent 70%),
            radial-gradient(50% 70% at 20% 60%, rgba(12, 41, 79, 0.32), transparent 70%),
            linear-gradient(135deg, #020617 0%, #0b1c2d 35%, #1e383bff 70%, #020617 1000%)
          `,
        }}
      />

      {/* ================= CONTENT ================= */}

      <main className="relative z-10 flex-grow flex items-center px-4 sm:px-8 py-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 text-center lg:text-left">

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gradient focus:outline-none">
                Merhaba, ben <br />

                <span className="relative inline-block mt-2 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1]">
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

              <h2 className="animate-fade-in-up animation-delay-200 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300 text-white">
                <span className="text-gradient">Full Stack Geliştiriciyim</span>
              </h2>
            </div>

            <ScrollVelocity texts={["Modern web teknolojileri ile kullanıcı dostu, ölçeklenebilir ve hızlı dijital çözümler üretiyorum.", "Tasarımın estetiğini kodun gücüyle birleştirerek fikirleri hayata geçiriyorum."]} />

            <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white hover:text-primary text-base font-bold px-8 py-4 rounded-xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"              >
                Projelerimi Gör
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>

            </div>

            <div className="animate-fade-in-up animation-delay-500 flex gap-8 pt-2 px-4 justify-center lg:justify-start">
              <a href="https://www.linkedin.com/in/betulcengiz" className="text-white hover:text-white transition-transform hover:scale-110"><Linkedin size={28} /></a>
              <a href="https://github.com/BetulCengiz" className="text-white hover:text-white transition-transform hover:scale-110"><Github size={28} /></a>
              <a href="https://www.instagram.com/betul_cengiz" className="text-white hover:text-white transition-transform hover:scale-110"><Instagram size={28} /></a>
              <a href="https://www.youtube.com/c/BetülCengiz" className="text-white hover:text-white transition-transform hover:scale-110"><Youtube size={28} /></a>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative animate-fade-in-up animation-delay-300">
            {/* Glow halo */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-[100px] opacity-60"></div>

            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-2 border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden ring-1 ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
              <div
                className="w-full h-full rounded-full bg-cover bg-center transition-transform duration-700 hover:scale-110 z-20"
                style={{ backgroundImage: 'url("/profil.png")' }}
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Hero;