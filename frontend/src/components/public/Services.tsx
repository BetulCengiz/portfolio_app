"use client";

import React from 'react';

const services = [
    {
        title: "Frontend Geliştirme",
        description: "Duyarlı, erişilebilir ve kusursuz kullanıcı arayüzleri tasarlıyorum. Modern bileşen tabanlı mimariler ile akıcı deneyimler oluşturuyorum.",
        icon: "desktop_windows",
        bgIcon: "devices",
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
        title: "Backend Geliştirme",
        description: "Sağlam RESTful ve GraphQL API'leri tasarlıyorum. Ölçeklenebilir sunucu mantığı kuruyor ve veritabanı sorgularını optimize ediyorum.",
        icon: "database",
        bgIcon: "dns",
        skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
    },
    {
        title: "Yapay Zeka Entegrasyonu",
        description: "Büyük Dil Modelleri (LLM) ve akıllı ajanları uygulamalara entegre ederek otomasyon ve akıllı özellikler geliştiriyorum.",
        icon: "smart_toy",
        bgIcon: "psychology",
        skills: ["OpenAI API", "LangChain", "Vector DBs", "RAG"],
    },
    {
        title: "DevOps & Bulut Mimari",
        description: "CI/CD süreçleri ve konteynerizasyon ile dağıtım döngüsünü hızlandırıyorum. Uygulamaların bulutta ölçeklenmesini sağlıyorum.",
        icon: "construction",
        bgIcon: "cloud_upload",
        skills: ["Docker", "AWS", "GitHub Actions", "Vercel", "Linux"],
    }
];

const techRow1 = [
    { name: "Python", icon: "terminal", color: "text-yellow-400" },
    { name: "JavaScript", icon: "javascript", color: "text-yellow-300" },
    { name: "React", icon: "code_blocks", color: "text-blue-400" },
    { name: "Next.js", icon: "layers", color: "text-white" },
    { name: "TypeScript", icon: "data_object", color: "text-blue-500" },
    { name: "HTML5", icon: "html", color: "text-orange-500" },
    { name: "Tailwind CSS", icon: "palette", color: "text-sky-400" },
];

const techRow2 = [
    { name: "FastAPI", icon: "bolt", color: "text-teal-400", highlight: true },
    { name: "Node.js", icon: "eco", color: "text-green-500" },
    { name: "TensorFlow", icon: "neurology", color: "text-orange-400" },
    { name: "Docker", icon: "deployed_code", color: "text-blue-400" },
    { name: "Git", icon: "commit", color: "text-red-500" },
    { name: "PostgreSQL", icon: "database", color: "text-blue-300" },
    { name: "MongoDB", icon: "forest", color: "text-green-400" },
    { name: "AWS", icon: "cloud", color: "text-yellow-600" },
];

const Services = () => {
    return (
        <section id="services" className="animate-section py-24 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Uzmanlık Alanlarım
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        Servisler & <span className="text-gradient">Yetenekler</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                        Modern bir teknoloji yığını ile sağlam, ölçeklenebilir ve duyarlı uygulamalar inşa ediyorum.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="animate-card glass-panel rounded-3xl p-8 md:p-10 flex flex-col gap-6 group relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                                <span className="material-symbols-outlined !text-[160px] text-primary select-none">
                                    {service.bgIcon}
                                </span>
                            </div>
                            <div className="z-10 relative">
                                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
                                    <span className="material-symbols-outlined !text-4xl text-primary">{service.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-8 font-light">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.skills.map((skill) => (
                                        <span key={skill} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech Stack Horizontal Scroll */}
                <div className="relative py-16 overflow-hidden">
                    {/* Vertical Gradients for fading edges */}
                    <div className="absolute top-0 left-0 w-32 h-full z-20 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-32 h-full z-20 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

                    <div className="flex flex-col gap-8 relative z-10">
                        {/* Row 1: Left Scroll */}
                        <div className="group flex overflow-hidden select-none w-full mask-gradient">
                            <div className="flex gap-4 md:gap-6 animate-scroll-left group-hover:[animation-play-state:paused] min-w-full">
                                {[...techRow1, ...techRow1].map((tech, i) => (
                                    <div key={i} className="flex h-12 md:h-14 shrink-0 items-center justify-center gap-x-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 transition-all duration-300 px-6 backdrop-blur-sm">
                                        <span className={`material-symbols-outlined ${tech.color} !text-2xl md:!text-3xl`}>{tech.icon}</span>
                                        <p className="text-white text-base md:text-lg font-medium tracking-wide">{tech.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Row 2: Right Scroll */}
                        <div className="group flex overflow-hidden select-none w-full mask-gradient">
                            <div className="flex gap-4 md:gap-6 animate-scroll-right group-hover:[animation-play-state:paused] min-w-full">
                                {[...techRow2, ...techRow2].map((tech, i) => (
                                    <div key={i} className={`flex h-12 md:h-14 shrink-0 items-center justify-center gap-x-3 rounded-xl ${tech.highlight ? 'bg-primary/20 border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10'} hover:border-primary hover:bg-primary/10 transition-all duration-300 px-6 backdrop-blur-sm`}>
                                        <span className={`material-symbols-outlined ${tech.color} !text-2xl md:!text-3xl`}>{tech.icon}</span>
                                        <p className="text-white text-base md:text-lg font-medium tracking-wide">{tech.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expertise Highlights (NeoFin & DataStream) */}

            </div>
        </section>
    );
};

export default Services;
