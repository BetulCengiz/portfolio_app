"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

export default function NewProject() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [formData, setFormData] = useState({
        title: '',
        title_en: '',
        description: '',
        description_en: '',
        content: '',
        image_url: '',
        github_url: '',
        live_url: '',
        is_featured: false,
        is_published: true
    });
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    const [uploading, setUploading] = useState(false);

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError('');

        try {
            const res = await api.uploadProjectImage(file);
            setFormData({ ...formData, image_url: res.image_url });
        } catch (err: any) {
            setError('Görsel yüklenirken bir hata oluştu.');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title || !formData.description) {
            setError('Lütfen proje adı ve kısa açıklamayı doldurun.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const projectToSave = {
                ...formData,
                technologies: tags
            };
            await api.createProject(projectToSave);
            router.push('/admin/projects');
        } catch (err: any) {
            setError(err.message || 'Proje kaydedilirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            {/* Top Glow */}
            <div className="absolute top-0 left-0 w-full h-64 bg-admin-primary/5 blur-[120px] -z-10 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto p-6 md:p-10 lg:p-14 space-y-8">
                {/* Page Header */}
                <div className="flex flex-wrap justify-between items-end gap-6 border-b border-admin-border pb-8">
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/admin/projects"
                            className="flex items-center gap-2 text-admin-muted hover:text-admin-primary transition-colors text-sm font-medium w-fit"
                        >
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Projelere Dön
                        </Link>
                        <h2 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight font-space">Yeni Proje Ekle</h2>
                        <p className="text-admin-muted text-lg max-w-xl">Portfolyonuz için yeni bir çalışma ekleyin.</p>
                        {error && (
                            <p className="text-red-400 text-sm font-medium bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-lg animate-shake">
                                {error}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-3 rounded-xl border border-admin-border text-white hover:bg-admin-surface-light transition-all font-bold active:scale-95"
                        >
                            İptal
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-8 py-3 rounded-xl bg-admin-primary text-white hover:bg-admin-primary-hover shadow-xl shadow-admin-primary/25 transition-all font-bold flex items-center gap-2 active:scale-95 disabled:opacity-70"
                        >
                            {loading ? (
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[20px]">save</span>
                                    <span>Projeyi Yayınla</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
                    {/* Main Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-3">
                                <label className="text-white text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-admin-primary">title</span>
                                    Proje Adı (TR)
                                </label>
                                <input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-admin-surface border border-admin-border rounded-2xl px-5 py-4 text-white placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary transition-all text-lg font-medium shadow-inner"
                                    placeholder="Örn: Modern E-ticaret Platformu"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-admin-primary">title</span>
                                    Project Title (EN)
                                </label>
                                <input
                                    value={formData.title_en || ''}
                                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                    className="w-full bg-admin-surface border border-admin-border rounded-2xl px-5 py-4 text-white placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary transition-all text-lg font-medium shadow-inner"
                                    placeholder="Ex: Modern E-commerce Platform"
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-white text-lg font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-admin-primary">description</span>
                                        Kısa Açıklama (TR)
                                    </label>
                                    <span className="text-xs text-admin-muted font-mono tracking-tighter">{formData.description.length} / 250</span>
                                </div>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    maxLength={250}
                                    className="w-full bg-admin-surface border border-admin-border rounded-2xl px-5 py-4 text-white placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary transition-all h-64 resize-none shadow-inner"
                                    placeholder="Projenin ana fikrini kısaca özetleyin..."
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-white text-lg font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-admin-primary">description</span>
                                        Short Description (EN)
                                    </label>
                                    <span className="text-xs text-admin-muted font-mono tracking-tighter">{(formData.description_en || '').length} / 250</span>
                                </div>
                                <textarea
                                    value={formData.description_en || ''}
                                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                    maxLength={250}
                                    className="w-full bg-admin-surface border border-admin-border rounded-2xl px-5 py-4 text-white placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/50 focus:border-admin-primary transition-all h-64 resize-none shadow-inner"
                                    placeholder="Briefly summarize the main idea of the project..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-col gap-3">
                            <label className="text-white text-lg font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-admin-primary">terminal</span>
                                Teknolojiler
                            </label>
                            <div className="w-full bg-admin-surface border border-admin-border rounded-2xl p-3 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-admin-primary/50 focus-within:border-admin-primary transition-all min-h-[64px] shadow-inner">
                                {tags.map((tag) => (
                                    <div key={tag} className="bg-admin-primary/10 border border-admin-primary/20 text-white text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                                        <span>{tag}</span>
                                        <button onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                        </button>
                                    </div>
                                ))}
                                <input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    className="bg-transparent border-none outline-none text-white placeholder:text-admin-muted flex-1 min-w-[150px] px-3 py-2 shadow-none focus:ring-0"
                                    placeholder="Teknoloji ekle (Enter)"
                                    type="text"
                                />
                            </div>
                            <p className="text-xs text-admin-muted ml-2">İpucu: Eklemek istediğiniz teknolojiyi yazıp Enter tuşuna basın.</p>
                        </div>

                        {/* Editor Placeholder */}

                    </div>

                    {/* Sidebar / Meta info */}
                    <div className="space-y-8">
                        {/* Status/Featured Card */}
                        <div className="bg-admin-surface rounded-2xl p-6 border border-admin-border space-y-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-white font-bold">Öne Çıkar</span>
                                    <span className="text-xs text-admin-muted">Ana sayfada vitrine ekle</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.is_featured}
                                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                    />
                                    <div className="w-12 h-6 bg-admin-surface-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[1.25rem] after:w-[1.25rem] after:transition-all peer-checked:bg-admin-primary"></div>
                                </label>
                            </div>
                            <div className="pt-4 border-t border-admin-border">
                                <label className="text-white font-bold block mb-3">Görünürlük</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFormData({ ...formData, is_published: true })}
                                        className={`flex-1 py-2 px-3 rounded-lg border transition-all font-bold text-sm ${formData.is_published ? 'bg-admin-primary/10 border-admin-primary/30 text-admin-primary' : 'bg-admin-surface-light border-admin-border text-admin-muted'}`}
                                    >
                                        Yayında
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, is_published: false })}
                                        className={`flex-1 py-2 px-3 rounded-lg border transition-all font-bold text-sm ${!formData.is_published ? 'bg-admin-primary/10 border-admin-primary/30 text-admin-primary' : 'bg-admin-surface-light border-admin-border text-admin-muted'}`}
                                    >
                                        Taslak
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="bg-admin-surface rounded-2xl p-6 border border-admin-border space-y-4 shadow-xl">
                            <label className="text-white font-bold block">Kapak Görseli</label>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        className="flex-1 bg-admin-surface-light border border-admin-border rounded-xl px-4 py-2 text-xs text-white focus:ring-1 focus:ring-admin-primary outline-none"
                                        placeholder="Görsel URL veya dosya seçin"
                                    />
                                    <label className="cursor-pointer bg-admin-primary/10 hover:bg-admin-primary/20 border border-admin-primary/30 text-admin-primary px-3 py-2 rounded-xl transition-all">
                                        <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                                <div className="group relative w-full aspect-[4/3] rounded-xl border-2 border-dashed border-admin-border bg-admin-surface-light hover:bg-admin-surface transition-all duration-300 flex flex-col items-center justify-center overflow-hidden">
                                    {uploading ? (
                                        <span className="material-symbols-outlined animate-spin text-admin-primary">progress_activity</span>
                                    ) : formData.image_url ? (
                                        <img
                                            src={formData.image_url.startsWith('http') ? formData.image_url : `http://localhost:8000${formData.image_url}`}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                                            <span className="material-symbols-outlined text-admin-primary text-3xl">add_photo_alternate</span>
                                            <p className="text-admin-muted text-xs">Görsel Seçin</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Links Card */}
                        <div className="bg-admin-surface rounded-2xl p-6 border border-admin-border space-y-5 shadow-xl">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-admin-primary">link</span>
                                Linkler
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] text-admin-muted uppercase font-black tracking-widest pl-1">GitHub Deposu</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-muted group-focus-within:text-admin-primary transition-colors material-symbols-outlined text-[20px]">code</span>
                                        <input
                                            value={formData.github_url}
                                            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                            className="w-full bg-admin-surface-light border border-admin-border rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:ring-1 focus:ring-admin-primary focus:border-admin-primary transition-all placeholder:text-gray-600 outline-none"
                                            placeholder="https://github.com/..."
                                            type="url"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] text-admin-muted uppercase font-black tracking-widest pl-1">Canlı Demo</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-muted group-focus-within:text-admin-primary transition-colors material-symbols-outlined text-[20px]">public</span>
                                        <input
                                            value={formData.live_url}
                                            onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                                            className="w-full bg-admin-surface-light border border-admin-border rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:ring-1 focus:ring-admin-primary focus:border-admin-primary transition-all placeholder:text-gray-600 outline-none"
                                            placeholder="https://proje.com"
                                            type="url"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Audit info */}
                        <div className="px-4 py-2 space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-admin-muted">Oluşturma:</span>
                                <span className="text-white font-medium">-- / -- / ----</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-admin-muted">Son Güncelleme:</span>
                                <span className="text-white font-medium">Henüz Kaydedilmedi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
