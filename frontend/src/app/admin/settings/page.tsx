"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        site_title: '',
        site_description: '',
        site_url: '',
        contact_email: '',
        site_keywords: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await api.getSettings();
                if (data) {
                    setSettings({
                        site_title: data.site_title || '',
                        site_description: data.site_description || '',
                        site_url: data.site_url || '',
                        contact_email: data.contact_email || '',
                        site_keywords: data.site_keywords || ''
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async () => {
        try {
            await api.updateSettings(settings);
            setMessage('Site ayarları güncellendi!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Hata:', error);
            setMessage('Hata oluştu.');
        }
    };

    if (loading) return <div className="p-10 text-white">Yükleniyor...</div>;

    return (
        <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
            <h1 className="text-white text-4xl font-black tracking-tight font-space border-b border-admin-border pb-6">Site Ayarları</h1>

            <div className="bg-admin-surface border border-admin-border rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">Site Başlığı</label>
                        <input
                            value={settings.site_title}
                            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                            className="bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none"
                            placeholder="Örn: Ahmet Yılmaz Portfolio"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">Site URL</label>
                        <input
                            value={settings.site_url}
                            onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
                            className="bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none"
                            placeholder="https://example.com"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white font-bold">Site Açıklaması (Meta Description)</label>
                    <textarea
                        rows={3}
                        value={settings.site_description}
                        onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                        className="bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none resize-none"
                        placeholder="Site hakkında kısa açıklama..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">İletişim E-posta</label>
                        <input
                            value={settings.contact_email}
                            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                            className="bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold">Anahtar Kelimeler (SEO)</label>
                        <input
                            value={settings.site_keywords}
                            onChange={(e) => setSettings({ ...settings, site_keywords: e.target.value })}
                            className="bg-admin-surface-light border border-admin-border rounded-xl px-4 py-3 text-white focus:border-admin-primary focus:outline-none"
                            placeholder="portfolio, developer, react..."
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button onClick={handleSubmit} className="bg-admin-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-admin-primary-hover transition-all shadow-lg shadow-admin-primary/20">
                        Ayarları Kaydet
                    </button>
                    {message && <p className="text-emerald-400 font-bold mt-4 animate-pulse">{message}</p>}
                </div>
            </div>
        </div>
    );
}
