"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';

export default function AdminDashboard() {
    const [statsData, setStatsData] = useState({
        projectsCount: 0,
        messagesCount: 0,
        blogCount: 0,
    });
    const [recentProjects, setRecentProjects] = useState<any[]>([]);
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    const [analyticsShareUrl, setAnalyticsShareUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch stats
                const stats = await api.getDashboardStats();
                setStatsData(stats);

                // Fetch recent projects
                const projects = await api.getProjects();
                if (Array.isArray(projects)) {
                    setRecentProjects(projects.slice(0, 3));
                }

                // Fetch recent messages
                const messages = await api.getMessages();
                if (Array.isArray(messages)) {
                    setRecentMessages(messages.slice(0, 2));
                }

                // Fetch analytics share url
                const settings = await api.getSettings();
                if (settings?.analytics_share_url) {
                    setAnalyticsShareUrl(settings.analytics_share_url);
                }

            } catch (error) {
                console.error('Veri çekme hatası:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Bilinmiyor';
        return new Date(dateString).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const stats = [
        { label: 'Blog Yazıları', value: statsData.blogCount.toString(), trend: '+Yeni', icon: 'edit_note', color: 'text-purple-400' },
        { label: 'Yeni Mesajlar', value: statsData.messagesCount.toString(), trend: 'Okunmamış', icon: 'mail', color: 'text-blue-400' },
        { label: 'Aktif Projeler', value: statsData.projectsCount.toString(), trend: 'Yayında', icon: 'folder_special', color: 'text-yellow-400' },
        { label: 'CV İndirme', value: '----', trend: '+0%', icon: 'download', color: 'text-pink-400' },
    ];

    return (
        <div className="p-4 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-admin-surface min-h-[180px] flex flex-col justify-end group border border-admin-border">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdVERx5ytYkYyHjuVZxCrdn-nWWIwbFiNlYZPE2I0Lmk3HBEZxalcGAO4hpYXDxAHwiSFmBYWy9Naaxr31MZ0tITYXlX3JdpTyBCPJI4QvKIe7PL3AhFnKtgvJbQxgcpzFZ-W2VOL4skSfMISkCJqcoRBbXsEsD1-ELFQ9g8P6m3J0cvkN04suOvAVkVGtNn2S3DuuKIaEZE-ClXUUNTDYNxeXc__PL9z3rCEmPWUo19x7YtkKueLdmRjBIpgxyg7ky1DDZp2ZT64')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-admin-surface via-admin-surface/60 to-transparent"></div>
                    <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <p className="text-admin-primary font-medium mb-1">Pazartesi, 23 Ekim</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Hoşgeldin, Admin 👋</h2>
                            <p className="text-admin-muted mt-2 max-w-lg">Portfolio performans özetin ve son aktivitelerin burada.</p>
                        </div>
                        <Link
                            href="/admin/projects/new"
                            className="flex items-center gap-2 bg-admin-primary hover:bg-admin-primary-hover text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-admin-primary/20 shrink-0"
                        >
                            <span className="material-symbols-outlined text-xl">add</span>
                            <span>Yeni Proje Ekle</span>
                        </Link>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-admin-surface border border-admin-border rounded-xl p-5 hover:border-admin-primary/50 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 bg-admin-bg rounded-lg ${stat.color}`}>
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                </div>
                                <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'text-emerald-400 bg-emerald-400/10' : 'text-gray-400 bg-white/5'}`}>
                                    {stat.trend.includes('+') && <span className="material-symbols-outlined text-sm mr-1">trending_up</span>}
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-admin-muted text-sm font-medium">{stat.label}</h3>
                            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Analytics Section */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white text-xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-admin-primary">monitoring</span>
                        Ziyaretçi Analizi
                    </h3>
                    <div className="bg-admin-surface border border-admin-border rounded-xl p-1 shadow-lg shadow-black/20 overflow-hidden min-h-[500px] flex items-center justify-center relative">
                        {analyticsShareUrl ? (
                            <iframe
                                src={analyticsShareUrl + (analyticsShareUrl.includes('?') ? '&' : '?') + 'embed=true'}
                                width="100%"
                                height="800"
                                frameBorder="0"
                                className="rounded-lg bg-transparent"
                            ></iframe>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-12 text-center w-full">
                                <div className="p-4 bg-admin-bg rounded-2xl mb-4 text-admin-primary inline-flex">
                                    <span className="material-symbols-outlined text-5xl">bar_chart</span>
                                </div>
                                <h4 className="text-white text-lg font-bold">Analiz Sistemi Aktif Değil</h4>
                                <p className="text-admin-muted text-sm mt-2 max-w-md mx-auto">
                                    Umami Cloud Dashboard'u burada görebilmek için ayarlar sayfasından "Share URL" bilginizi eklemelisiniz.
                                </p>
                                <Link href="/admin/settings" className="mt-6 text-admin-primary hover:text-white flex items-center justify-center gap-2 group transition-all font-medium">
                                    Ayarlara Git <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Projects Column */}
                    <div className="xl:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-white text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-admin-primary">layers</span>
                                Son Projeler
                            </h3>
                            <Link href="/admin/projects" className="text-sm text-admin-primary hover:text-admin-primary-hover font-medium flex items-center">
                                Tümünü Gör <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="bg-admin-surface border border-admin-border rounded-xl overflow-hidden shadow-lg shadow-black/20">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-admin-surface-light border-b border-admin-border text-xs uppercase tracking-wider text-admin-muted">
                                            <th className="px-6 py-4 font-semibold w-16">Görsel</th>
                                            <th className="px-6 py-4 font-semibold">Proje Adı</th>
                                            <th className="px-6 py-4 font-semibold">Durum</th>
                                            <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-admin-border">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-10 text-center">
                                                    <span className="material-symbols-outlined animate-spin text-admin-primary">progress_activity</span>
                                                </td>
                                            </tr>
                                        ) : recentProjects.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-10 text-center text-admin-muted text-sm">
                                                    Henüz proje eklenmemiş.
                                                </td>
                                            </tr>
                                        ) : recentProjects.map((project, i) => (
                                            <tr key={project.id || i} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div
                                                        className="h-10 w-10 rounded-lg bg-cover bg-center bg-gray-700"
                                                        style={{
                                                            backgroundImage: project.image_url
                                                                ? `url(${project.image_url.startsWith('http') ? project.image_url : `http://localhost:8000${project.image_url}`})`
                                                                : 'none'
                                                        }}
                                                    >
                                                        {!project.image_url && <span className="material-symbols-outlined text-xs flex items-center justify-center h-full text-gray-500">image</span>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-white font-medium text-sm line-clamp-1">{project.title}</p>
                                                    <p className="text-xs text-admin-muted">{formatDate(project.created_at)}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`h-2 w-2 rounded-full ${project.is_published ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-yellow-500'}`}></span>
                                                        <span className="text-gray-300 text-sm">{project.is_published ? 'Yayında' : 'Taslak'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Link
                                                            href={`/admin/projects/edit/${project.id}`}
                                                            className="p-1.5 text-admin-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </Link>
                                                        <button className="p-1.5 text-admin-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-white text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-admin-primary">mark_chat_unread</span>
                                Son Mesajlar
                            </h3>
                            <div className="bg-admin-surface border border-admin-border rounded-xl p-4 flex flex-col gap-4">
                                {recentMessages.length === 0 ? (
                                    <p className="text-admin-muted text-sm text-center py-4">Henüz mesaj yok.</p>
                                ) : (
                                    recentMessages.map((msg, i) => (
                                        <div key={i} className="flex gap-3 items-start pb-4 border-b border-admin-border last:border-0 last:pb-0">
                                            <div className="h-10 w-10 rounded-full bg-admin-primary/20 flex items-center justify-center text-admin-primary font-bold flex-shrink-0">
                                                {msg.sender_name ? msg.sender_name.charAt(0).toUpperCase() : '?'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h4 className="text-white text-sm font-semibold truncate">{msg.sender_name}</h4>
                                                    <span className="text-xs text-admin-muted">{formatDate(msg.created_at)}</span>
                                                </div>
                                                <p className="text-admin-muted text-xs line-clamp-2">{msg.subject} - {msg.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
