"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { useTranslation } from 'react-i18next';

interface BlogPost {
    id: string | number;
    title: string;
    title_en?: string;
    description?: string;
    content?: string;
    content_en?: string;
    image_url?: string;
    link?: string; // External link
    pubDate?: string;
    source: 'internal' | 'medium';
    slug?: string;
}

interface BlogProps {
    initialData?: BlogPost[];
}

const Blog = ({ initialData }: BlogProps) => {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(!initialData);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const isEn = i18n.language === 'en';

    // Initial formatting if initialData is provided
    useEffect(() => {
        const formatPosts = (data: any[]) => {
            return data
                .filter((p: any) => p.is_published)
                .map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    title_en: p.title_en,
                    description: p.content ? p.content.substring(0, 150) + "..." : "",
                    content: p.content,
                    content_en: p.content_en,
                    image_url: p.image_url,
                    link: p.external_url,
                    pubDate: p.created_at,
                    source: (p.external_url ? 'medium' : 'internal') as 'internal' | 'medium',
                    slug: p.slug
                }));
        };

        if (initialData && initialData.length > 0) {
            setPosts(formatPosts(initialData));
            setLoading(false);
            return;
        }

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const data = await api.getBlogPosts();
                if (data && Array.isArray(data)) {
                    setPosts(formatPosts(data));
                }
            } catch (error) {
                console.error("Blog verileri yüklenirken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [initialData]);



    const handleCardClick = (post: BlogPost) => {
        if (post.link) {
            window.open(post.link, '_blank');
        } else {
            setSelectedPost(post);
        }
    };

    return (
        <section id="blog" className="animate-section py-20 px-6 relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E14] via-[#0f1623] to-[#052e33] z-0"></div>
            <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="container mx-auto max-w-[1200px]">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-in-up">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                            <span className="w-8 h-[2px] bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                            <span>{t('blog.badge')}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                            {t('blog.title')} <span className="text-gradient">{t('blog.title_highlight')}</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-xl text-sm md:text-base font-light">
                            {t('blog.description')}
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
                    ) : posts.length === 0 ? (
                        <div className="col-span-full py-10 text-center text-gray-500">
                            {t('blog.no_posts')}
                        </div>
                    ) : (
                        posts.map((post, index) => {
                            const currentTitle = (isEn && post.title_en) ? post.title_en : post.title;
                            const currentContent = (isEn && post.content_en) ? post.content_en : post.content;
                            const currentDesc = currentContent ? currentContent.substring(0, 150) + "..." : "";

                            return (
                                <div
                                    key={post.id}
                                    onClick={() => handleCardClick(post)}
                                    className={`animate-card group relative flex flex-col h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:-translate-y-2 cursor-pointer`}
                                >
                                    {/* Image Container */}
                                    <div className="relative h-48 w-full overflow-hidden bg-white/5">
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 z-10"></div>
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{
                                                backgroundImage: post.image_url
                                                    ? `url(${post.image_url})`
                                                    : 'none'
                                            }}
                                        >
                                            {!post.image_url && (
                                                <div className="flex items-center justify-center h-full text-gray-600">
                                                    <span className="material-symbols-outlined text-4xl">article</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Source Badge */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${post.source === 'medium' ? 'bg-black/50 text-white border border-white/20' : 'bg-primary/80 text-white shadow-lg'
                                                }`}>
                                                {post.source === 'medium' ? t('blog.external') : 'Blog'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="flex flex-col flex-grow p-6 relative">
                                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
                                            {currentTitle}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 relative z-10 font-light flex-grow">
                                            {currentDesc}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs text-primary font-medium mt-auto group-hover:translate-x-1 transition-transform">
                                            <span>{post.link ? t('blog.go_to_site') : t('blog.read_more')}</span>
                                            <span className="material-symbols-outlined !text-[16px]">
                                                {post.link ? 'open_in_new' : 'arrow_forward'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Modal for Internal Posts */}
                {selectedPost && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
                        <div
                            className="bg-[#0B0E14] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-10"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="relative h-64 w-full">
                                {selectedPost.image_url ? (
                                    <img src={selectedPost.image_url} alt={(isEn && selectedPost.title_en) ? selectedPost.title_en : selectedPost.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                        <span className="material-symbols-outlined text-6xl text-white/20">article</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] to-transparent"></div>
                            </div>

                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-white mb-6">{(isEn && selectedPost.title_en) ? selectedPost.title_en : selectedPost.title}</h2>
                                <div className="prose prose-invert max-w-none text-gray-300">
                                    <p className="whitespace-pre-wrap leading-relaxed">
                                        {(isEn && selectedPost.content_en) ? selectedPost.content_en : selectedPost.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;
