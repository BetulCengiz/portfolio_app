"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';

export default function AboutManagement() {
    const [userData, setUserData] = useState({
        full_name: '',
        title: '',
        title_en: '',
        bio: '',
        bio_en: '',
        avatar_url: '',
        cv_url: '',
        cv_url_en: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await api.getAbout();
                if (data) {
                    setUserData({
                        full_name: data.full_name || '',
                        title: data.title || '',
                        title_en: data.title_en || '',
                        bio: data.bio || '',
                        bio_en: data.bio_en || '',
                        avatar_url: data.profile_image || '',
                        cv_url: data.cv_url || '',
                        cv_url_en: data.cv_url_en || '',
                    });
                }
            } catch (error) {
                console.error(error);
                setMessage('Veriler yüklenemedi.');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // --- DOSYA YÜKLEME MANTIĞI ---
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatar_url' | 'cv_url' | 'cv_url_en') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading({ ...uploading, [field]: true });
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.uploadFile(formData);
            setUserData(prev => ({ ...prev, [field]: response.url }));
            setMessage('Dosya başarıyla yüklendi!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error("Yükleme hatası:", error);
            alert("Dosya yüklenirken bir hata oluştu.");
        } finally {
            setUploading({ ...uploading, [field]: false });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                full_name: userData.full_name,
                title: userData.title,
                title_en: userData.title_en,
                bio: userData.bio,
                bio_en: userData.bio_en,
                profile_image: userData.avatar_url,
                cv_url: userData.cv_url,
                cv_url_en: userData.cv_url_en,
            };

            await api.updateAbout(payload);
            setMessage('Profil başarıyla güncellendi!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Hata oluştu.');
        }
    };

    if (loading) return <div className="p-10 text-white">Yükleniyor...</div>;

    return (
        <div className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full flex flex-col gap-8">
            <h1 className="text-white text-4xl font-black tracking-tight font-space border-b border-admin-border pb-6">Hakkımda Düzenle</h1>

            <form onSubmit={handleSubmit} className="bg-admin-surface border border-admin-border rounded-2xl p-8 space-y-6">

                <h3 className="text-xl font-bold text-white mb-4">Kişisel Bilgiler</h3>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">Biyografi (TR)</label>
                        <textarea
                            rows={6}
                            placeholder="Kendinizden bahsedin..."
                            value={userData.bio}
                            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                            className="bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none resize-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">Biography (EN)</label>
                        <textarea
                            rows={6}
                            placeholder="Tell about yourself..."
                            value={userData.bio_en || ''}
                            onChange={(e) => setUserData({ ...userData, bio_en: e.target.value })}
                            className="bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none resize-none"
                        />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 pt-4 border-t border-admin-border">Bağlantılar & Medya</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Avatar Yükleme Alanı */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">Avatar (Resim Yükle)</label>
                        <div className="flex gap-2">
                            <input
                                placeholder="URL buraya gelecek..."
                                value={userData.avatar_url}
                                onChange={(e) => setUserData({ ...userData, avatar_url: e.target.value })}
                                className="flex-1 bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none"
                            />
                            <label className="bg-admin-border hover:bg-admin-primary transition-colors px-4 py-3 rounded-xl cursor-pointer text-white text-sm flex items-center justify-center">
                                {uploading['avatar_url'] ? '...' : 'Yükle'}
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar_url')} />
                            </label>
                        </div>
                    </div>

                    {/* CV (TR) Yükleme Alanı */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">CV (Türkçe PDF Yükle)</label>
                        <div className="flex gap-2">
                            <input
                                placeholder="URL buraya gelecek..."
                                value={userData.cv_url}
                                onChange={(e) => setUserData({ ...userData, cv_url: e.target.value })}
                                className="flex-1 bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none"
                            />
                            <label className="bg-admin-border hover:bg-admin-primary transition-colors px-4 py-3 rounded-xl cursor-pointer text-white text-sm flex items-center justify-center min-w-[80px]">
                                {uploading['cv_url'] ? '...' : 'Seç'}
                                <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'cv_url')} />
                            </label>
                        </div>
                    </div>

                    {/* CV (EN) Yükleme Alanı */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">CV (English PDF Upload)</label>
                        <div className="flex gap-2">
                            <input
                                placeholder="URL here..."
                                value={userData.cv_url_en}
                                onChange={(e) => setUserData({ ...userData, cv_url_en: e.target.value })}
                                className="flex-1 bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none"
                            />
                            <label className="bg-admin-border hover:bg-admin-primary transition-colors px-4 py-3 rounded-xl cursor-pointer text-white text-sm flex items-center justify-center min-w-[80px]">
                                {uploading['cv_url_en'] ? '...' : 'Select'}
                                <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'cv_url_en')} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                </div>

                <div className="pt-6">
                    <button type="submit" className="bg-admin-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-admin-primary-hover transition-all w-full md:w-auto shadow-lg shadow-admin-primary/25">
                        Değişiklikleri Kaydet
                    </button>
                    {message && <span className="ml-4 text-emerald-400 font-bold animate-pulse">{message}</span>}
                </div>
            </form>
        </div>
    );
}