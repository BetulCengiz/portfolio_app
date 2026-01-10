"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';

export default function TimelineManagement() {
    const [timelineItems, setTimelineItems] = useState<any[]>([]);
    const [formData, setFormData] = useState({ year: '', year_en: '', title: '', title_en: '', company: '', company_en: '', description: '', description_en: '', icon: 'work' });
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const data = await api.getTimeline();
                setTimelineItems(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTimeline();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedId) {
                const updatedItem = await api.updateTimeline(selectedId, formData);
                setTimelineItems(timelineItems.map(item => item.id === selectedId ? updatedItem : item));
                setSelectedId(null);
            } else {
                const newItem = await api.createTimeline({ ...formData, order: timelineItems.length });
                setTimelineItems([...timelineItems, newItem]);
            }
            setFormData({ year: '', year_en: '', title: '', title_en: '', company: '', company_en: '', description: '', description_en: '', icon: 'work' });
        } catch (error) {
            console.error(error);
            alert('İşlem başarısız oldu.');
        }
    };

    const handleEdit = (item: any) => {
        setSelectedId(item.id);
        setFormData({
            year: item.year || '',
            year_en: item.year_en || '',
            title: item.title || '',
            title_en: item.title_en || '',
            company: item.company || '',
            company_en: item.company_en || '',
            description: item.description || '',
            description_en: item.description_en || '',
            icon: item.icon || 'work'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Emin misiniz?')) return;
        try {
            await api.deleteTimeline(id);
            setTimelineItems(timelineItems.filter(i => i.id !== id));
            if (selectedId === id) {
                setSelectedId(null);
                setFormData({ year: '', year_en: '', title: '', title_en: '', company: '', company_en: '', description: '', description_en: '', icon: 'work' });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                {/* Page Heading & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-admin-border">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight font-space">Timeline Yönetimi</h2>
                        <p className="text-admin-muted max-w-lg text-lg">Kariyer yolculuğunuzu düzenleyin, yeni deneyimler ekleyin.</p>
                    </div>
                </div>

                {/* Split View: List & Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: Timeline List */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="bg-admin-surface border border-admin-border rounded-2xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-admin-primary">history_edu</span>
                                Mevcut Kayıtlar
                            </h3>
                            <div className="relative pl-2">
                                {timelineItems.map((item, index) => (
                                    <div key={item.id} className="grid grid-cols-[40px_1fr] gap-x-4 pb-8 group">
                                        {/* Line & Icon */}
                                        <div className="flex flex-col items-center pt-1 h-full relative">
                                            <div className="h-10 w-10 rounded-full bg-admin-primary/20 border border-admin-primary text-admin-primary flex items-center justify-center shadow-[0_0_15px_rgba(182,19,236,0.3)] z-10 transition-transform group-hover:scale-110">
                                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                            </div>
                                            {index !== timelineItems.length - 1 && (
                                                <div className="w-[2px] bg-admin-border h-full absolute top-10 left-1/2 -translate-x-1/2"></div>
                                            )}
                                            {index === timelineItems.length - 1 && (
                                                <div className="w-[2px] bg-gradient-to-b from-admin-border to-transparent h-16 absolute top-10 left-1/2 -translate-x-1/2"></div>
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-admin-bg/50 hover:bg-admin-surface-light/30 p-4 rounded-xl border border-admin-border transition-all hover:border-admin-primary/50">
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-admin-primary font-bold text-sm tracking-wider">{item.year}</span>
                                                        {item.year_en && <span className="text-admin-muted text-xs italic">{item.year_en}</span>}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleEdit(item)} className="h-8 w-8 flex items-center justify-center rounded-lg bg-admin-surface-light border border-admin-border hover:bg-admin-primary/20 hover:text-admin-primary text-admin-muted transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>
                                                        <button onClick={() => handleDelete(item.id)} className="h-8 w-8 flex items-center justify-center rounded-lg bg-admin-surface-light border border-admin-border hover:bg-red-500/20 hover:text-red-400 text-admin-muted transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                    <div>
                                                        <h4 className="text-white text-md font-bold">{item.title}</h4>
                                                        {item.company && <p className="text-admin-primary text-sm font-medium">{item.company}</p>}
                                                        <p className="text-admin-muted text-xs line-clamp-2">{item.description}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white/70 text-md font-bold italic">{item.title_en || 'N/A'}</h4>
                                                        {item.company_en && <p className="text-admin-primary/70 text-sm font-medium italic">{item.company_en}</p>}
                                                        <p className="text-admin-muted text-xs line-clamp-2 italic">{item.description_en || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Editor Form */}
                    <div className="lg:col-span-5 lg:sticky lg:top-8">
                        <div className="bg-admin-surface border border-admin-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">{selectedId ? 'Kaydı Düzenle' : 'Yeni Kayıt Ekle'}</h3>
                                    {selectedId && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedId(null);
                                                setFormData({ year: '', year_en: '', title: '', title_en: '', company: '', company_en: '', description: '', description_en: '', icon: 'work' });
                                            }}
                                            className="text-xs text-admin-muted hover:text-white"
                                        >
                                            İptal Et
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-admin-muted ml-1">Yıl / Dönem (TR)</label>
                                        <input
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            required
                                            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                            placeholder="Örn: 2024 - Günümüz"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-admin-muted ml-1">Year / Period (EN)</label>
                                        <input
                                            value={formData.year_en}
                                            onChange={(e) => setFormData({ ...formData, year_en: e.target.value })}
                                            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                            placeholder="Ex: 2024 - Present"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-admin-muted ml-1">Başlık (TR)</label>
                                        <input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                            placeholder="Pozisyon veya Okul"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-admin-muted ml-1">Title (EN)</label>
                                        <input
                                            value={formData.title_en}
                                            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                            placeholder="Position or School"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-admin-muted ml-1">Kurum/Şirket (TR)</label>
                                        <input
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                            placeholder="Örn: Google / Boğaziçi Üniversitesi"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-admin-muted ml-1">Company (EN)</label>
                                        <input
                                            value={formData.company_en}
                                            onChange={(e) => setFormData({ ...formData, company_en: e.target.value })}
                                            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                            placeholder="Ex: Google / Bogazici University"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-admin-muted ml-1">Açıklama (TR)</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary resize-none"
                                            placeholder="Detaylar..."
                                            rows={4}
                                        ></textarea>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-admin-muted ml-1">Description (EN)</label>
                                        <textarea
                                            value={formData.description_en}
                                            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary resize-none"
                                            placeholder="Details..."
                                            rows={4}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-admin-muted ml-1">İkon</label>
                                    <div className="flex gap-3">
                                        {['work', 'school', 'laptop_mac', 'star'].map((icon) => (
                                            <label key={icon} className="cursor-pointer">
                                                <input
                                                    className="peer sr-only"
                                                    name="icon"
                                                    type="radio"
                                                    value={icon}
                                                    checked={formData.icon === icon}
                                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                                />
                                                <div className="w-10 h-10 rounded-lg bg-admin-bg border border-admin-border flex items-center justify-center text-admin-muted/60 peer-checked:bg-admin-primary peer-checked:text-white peer-checked:border-admin-primary transition-all">
                                                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <button className="mt-4 px-4 py-3 rounded-xl bg-admin-primary text-white font-bold hover:bg-admin-primary-hover transition-all" type="submit">
                                    {selectedId ? 'Güncelle' : 'Kaydet'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
