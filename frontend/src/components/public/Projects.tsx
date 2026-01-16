"use client";

import React, { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { api } from '@/utils/api';
import { useTranslation } from 'react-i18next';

interface ProjectProps {
    initialData?: any[];
}

const Projects = ({ initialData }: ProjectProps) => {
    const { t, i18n } = useTranslation();
    const [projects, setProjects] = useState<any[]>(initialData || []);
    const [loading, setLoading] = useState(!initialData);

    const isEn = i18n.language === 'en';
    const [filter, setFilter] = useState("Tümü");

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            setLoading(false);
            return;
        }

        const fetchProjects = async () => {
            setLoading(true);
            try {
                const data = await api.getProjects();
                // Sadece yayınlanmış olanları göster
                const publishedProjects = data.filter((p: any) => p.is_published);
                setProjects(publishedProjects);
            } catch (error) {
                console.error('Projeler yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [initialData]);


    const filteredProjects = filter === "Tümü"
        ? projects
        : projects.filter(p => {
            // Backend'den gelen technologies listesinde arama yap
            return p.technologies?.some((tech: string) =>
                tech.toLowerCase().includes(filter.toLowerCase())
            );
        });

    return (
        <section id="projects" className="animate-section py-20 px-6 relative overflow-hidden bg-background">
            <div className="container mx-auto max-w-[1200px]">
                {/* Header Section */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-8 bg-primary"></div>
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                            {t('projects.badge')}
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight py-4">
                            {t('projects.title')} <span className="text-gradient">{t('projects.title_highlight')}</span>
                        </h1>
                        <p className="text-gray-400 max-w-md font-light leading-relaxed">
                            {t('projects.description')}
                        </p>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4">
                            <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
                            <p className="text-gray-400">{t('common.loading')}</p>
                        </div>
                    ) : filteredProjects.map((project, index: number) => (
                        <div
                            key={project.id || index}
                            className={`animate-card group relative flex flex-col h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:-translate-y-2`}
                        >
                            {/* Image Container */}
                            <div className="relative h-48 w-full overflow-hidden bg-white/5">
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 z-10"></div>
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: project.image_url
                                            ? `url(${project.image_url.startsWith('http') ? project.image_url : `http://localhost:8000${project.image_url}`})`
                                            : 'none'
                                    }}
                                >
                                    {!project.image_url && (
                                        <div className="flex items-center justify-center h-full text-gray-600">
                                            <span className="material-symbols-outlined text-5xl">image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 ">
                                    {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105">
                                        <span>{isEn ? 'Live Demo' : 'Canlı Demo'}</span>
                                        <span className="material-symbols-outlined !text-[16px]">arrow_outward</span>
                                    </a>}
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="flex flex-col flex-grow p-6 relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                        {(isEn && project.title_en) ? project.title_en : project.title}
                                    </h3>
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full" title="Github Repo">
                                        <Github size={20} />
                                    </a>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 relative z-10 group-hover:text-gray-300 transition-colors font-light">
                                    {(isEn && project.description_en) ? project.description_en : project.description}
                                </p>

                                <div className="mt-auto relative z-10">
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.map((tag: string) => (
                                            <span key={tag} className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-medium text-primary group-hover:border-primary/40 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Projects;
