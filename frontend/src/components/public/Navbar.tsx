"use client";

import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [scrollContent, setScrollContent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollContent(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const navbarHeight = 100; // Approximate navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full px-4 sm:px-8 py-4 transition-all duration-300">
            {/* Scroll Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-primary/40 z-[60]" style={{ width: `${scrollContent}%` }}></div>
            <div className="absolute top-0 left-0 h-1 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)] z-[61] transition-all duration-100" style={{ width: `${scrollContent}%` }}></div>
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: `
                    radial-gradient(60% 80% at 85% 40%, rgba(59, 131, 246, 0.2), transparent 70%),
                    radial-gradient(50% 70% at 20% 60%, rgba(12, 41, 79, 0.32), transparent 70%),
                    linear-gradient(135deg, #020617 0%, #0b1c2d 45%, #1e383bff 70%, #020617 1000%)
                `,
                }}
            />
            <div className="max-w-9xl max-h-20 mx-auto glass-panel rounded-xl px-6 py-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-4">
                    <div className="items-center justify-center w-22">
                        <img src="logo.png" alt="logo" />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#home" onClick={(e) => handleNavClick(e, 'home')}>Ana Sayfa</a>
                    <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#about" onClick={(e) => handleNavClick(e, 'about')}>Hakkımda</a>
                    <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projelerim</a>
                    <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a>
                    <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#services" onClick={(e) => handleNavClick(e, 'services')}>Yetenekler</a>
                    <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>İletişim</a>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hidden md:flex bg-primary hover:bg-#020617-400 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-0.5">
                        İletişime Geç
                    </a>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">
                            {mobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-4 glass-panel rounded-xl px-6 py-4 shadow-[0_0_20px_rgba(0,0,0,0.2)] animate-fade-in">
                    <div className="flex flex-col gap-4">
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#home" onClick={(e) => handleNavClick(e, 'home')}>Ana Sayfa</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#about" onClick={(e) => handleNavClick(e, 'about')}>Hakkımda</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projelerim</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>Blog</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#services" onClick={(e) => handleNavClick(e, 'services')}>Yetenekler</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>İletişim</a>
                        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-primary hover:bg-#020617-400 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] text-center">
                            İletişime Geç
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
