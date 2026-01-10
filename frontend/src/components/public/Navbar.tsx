"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [scrollContent, setScrollContent] = useState(0);

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'tr' ? 'en' : 'tr';
        i18n.changeLanguage(nextLang);
    };

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
        <nav className="sticky top-0 z-50 w-full px-4 sm:px-8 py-2 transition-all duration-300">
            {/* Scroll Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-white/10 z-[60]" style={{ width: `${scrollContent}%` }}></div>
            <div
                className="absolute top-0 left-0 h-1 z-[61] transition-all duration-100"
                style={{
                    width: `${scrollContent}%`,
                    background: 'linear-gradient(to right, #06b6d4, #180423ff, #6366f1)',
                    boxShadow: '0 0 15px rgba(217, 70, 239, 0.5)'
                }}
            ></div>
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: `
                    radial-gradient(60% 80% at 85% 40%, rgba(217, 70, 239, 0.08), transparent 70%),
                    radial-gradient(50% 70% at 20% 60%, rgba(6, 182, 212, 0.08), transparent 70%),
                    linear-gradient(135deg, #020617 0%, #060010
 45%, #0b1c2d 100%)
                `,
                }}
            />
            <div className="max-w-6xl max-h-18 mx-auto glass-panel rounded-xl px-6 py-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative flex items-center justify-center w-16 h-16 group"
                    >


                        {/* Floating Logo */}
                        <motion.img
                            src="logo.png"
                            alt="logo"
                            className="relative z-10 w-14 h-14 object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                            animate={{
                                y: [0, -5, 0],
                                rotateZ: [0, 2, 0, -2, 0]
                            }}
                            whileHover={{
                                scale: 1.15,
                                rotateZ: 10,
                                filter: "drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"
                            }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                default: { type: "spring", stiffness: 300 }
                            }}
                        />
                    </motion.div>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] relative group" href="#home" onClick={(e) => handleNavClick(e, 'home')}>
                        {t('nav.home')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-200 to-pink-800 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] relative group" href="#about" onClick={(e) => handleNavClick(e, 'about')}>
                        {t('nav.about')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-800 to-cyan-200 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] relative group" href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>
                        {t('nav.projects')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-200 to-pink-800 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] relative group" href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>
                        {t('nav.blog')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-800 to-cyan-200 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] relative group" href="#services" onClick={(e) => handleNavClick(e, 'services')}>
                        {t('nav.services')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-200 to-pink-800 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] relative group" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                        {t('nav.contact')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-800 to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-white/20"
                    >
                        <span className="text-xs font-bold uppercase">{i18n.language}</span>
                        <span className="material-symbols-outlined text-sm">language</span>
                    </button>
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
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300" href="#home" onClick={(e) => handleNavClick(e, 'home')}>{t('nav.home')}</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300" href="#about" onClick={(e) => handleNavClick(e, 'about')}>{t('nav.about')}</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300" href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>{t('nav.projects')}</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300" href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>{t('nav.blog')}</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300" href="#services" onClick={(e) => handleNavClick(e, 'services')}>{t('nav.services')}</a>
                        <a className="text-m font-medium text-gray-300 hover:text-primary transition-colors duration-300" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>{t('nav.contact')}</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
