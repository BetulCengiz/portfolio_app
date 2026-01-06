"use client";
import React, { useEffect, useState } from 'react';
import { api } from '@/utils/api';

interface TimelineItem {
    id: number;
    title: string;
    description: string;
    year: string;
    icon: string;
    order: number;
}

interface AboutData {
    full_name: string;
    title: string;
    bio: string;
    profile_image: string;
    email: string;
    cv_url: string;
}

interface AboutProps {
    initialData?: AboutData | null;
    initialTimeline?: TimelineItem[];
}

const About = ({ initialData, initialTimeline }: AboutProps) => {
    const [timeline, setTimeline] = useState<TimelineItem[]>(initialTimeline || []);
    const [aboutData, setAboutData] = useState<AboutData | null>(initialData || null);
    const [loading, setLoading] = useState(!initialData);



    // About.tsx içindeki useEffect kısmını bu şekilde güncelle:

    useEffect(() => {
        if (initialData && initialTimeline && initialTimeline.length > 0) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);

            // 1. Timeline Verisini Çek
            try {
                const timelineData = await api.getTimeline();
                if (timelineData && Array.isArray(timelineData)) {
                    setTimeline(timelineData.sort((a, b) => a.order - b.order));
                }
            } catch (error) {
                console.error("Timeline çekilemedi:", error);
            }

            // 2. About Verisini Çek
            try {
                const about = await api.getAbout();
                if (about) {
                    setAboutData(about);
                }
            } catch (error) {
                console.error("About verisi çekilemedi:", error);
            }

            setLoading(false);
        };

        fetchData();
    }, [initialData, initialTimeline]);


    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Yükleniyor...</div>;
    }

    return (
        <section id="about" className="animate-section relative z-10 w-full min-h-screen py-20 px-6 md:px-20 lg:px-40 flex justify-center overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-30 pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen opacity-20 pointer-events-none"></div>

            <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                {/* SOL KOLON: Hikayem & Bilgiler (Dinamik) */}
                <div className="lg:col-span-5 flex flex-col gap-8 h-fit lg:sticky lg:top-32 slide-in-left">
                    <div className="flex flex-col gap-6">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                            <img
                                className="w-full h-full object-cover"
                                src={aboutData?.profile_image || '/photo.png'}
                                alt="Profil"
                            />
                        </div>
                        <div>
                            <h3 className="text-primary font-bold tracking-wider text-sm uppercase mb-2">Hikayem</h3>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                                {aboutData?.full_name || 'İsim Yüklenemedi'} <br />
                                <span className="text-gradient">{aboutData?.title}</span>
                            </h1>
                            <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-xl text-white/80 leading-relaxed text-lg">
                        <p className="font-light whitespace-pre-wrap">
                            {aboutData?.bio}
                        </p>
                    </div>

                    {/* İstatistikler (Şu an statik, About modeline eklenebilir) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-panel p-4 rounded-lg flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors duration-300">
                            <span className="text-3xl font-bold text-white group-hover:text-primary transition-colors">5+</span>
                            <span className="text-sm text-primary/80 font-medium">Yıl Deneyim</span>
                        </div>
                        <div className="glass-panel p-4 rounded-lg flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors duration-300">
                            <span className="text-3xl font-bold text-white group-hover:text-primary transition-colors">40+</span>
                            <span className="text-sm text-primary/80 font-medium">Tamamlanan Proje</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <a href={`mailto:${aboutData?.email}`} className="flex items-center gap-2 bg-white text-background px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            <span className="material-symbols-outlined">mail</span>
                            İletişime Geç
                        </a>
                        {aboutData?.cv_url && (
                            <a href={aboutData.cv_url} target="_blank" className="flex items-center gap-2 glass-panel hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-white/20">
                                <span className="material-symbols-outlined">description</span>
                                CV İndir
                            </a>
                        )}
                    </div>
                </div>

                {/* SAĞ KOLON: Zaman Çizelgesi (Dinamik) */}
                <div className="lg:col-span-7 slide-in-right">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">history_edu</span>
                        Deneyim & Eğitim
                    </h2>

                    <div className="stagger-list relative pl-4 md:pl-8">
                        <div className="absolute left-[27px] md:left-[43px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-primary to-transparent opacity-30"></div>

                        {timeline.map((item, index) => (
                            <div key={item.id || index} className="stagger-item relative mb-12 group">
                                <div className="absolute left-0 md:left-2 top-0 p-2 bg-background border-2 border-primary rounded-full z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-primary text-xl md:text-2xl">
                                        {item.icon || 'work'}
                                    </span>
                                </div>

                                <div className="ml-12 md:ml-20">
                                    <div className="glass-panel p-6 md:p-8 rounded-xl hover:border-primary/40 transition-all duration-300 hover:translate-x-2">
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-primary/20">
                                                {item.year}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-white/70 text-sm leading-relaxed mb-4 font-light">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;