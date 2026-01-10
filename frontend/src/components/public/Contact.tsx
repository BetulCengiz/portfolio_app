"use client";

import React, { useState } from 'react';
import { api } from '@/utils/api';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: t('contact.subject_general'),
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await api.sendMessage({
                sender_name: formData.name,
                sender_email: formData.email,
                subject: formData.subject,
                content: formData.message
            });

            setStatus('success');
            setFormData({ name: '', email: '', subject: t('contact.subject_general'), message: '' });
            alert(t('contact.success'));
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Mesaj gönderilemedi:', error);
            setStatus('error');
            alert(t('contact.error'));
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section id="contact" className="animate-section relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E14] via-[#0f1623] to-[#052e33] z-0"></div>
            <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-6xl">
                <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-[#0B0E14]/40 backdrop-blur-xl">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Contact Info (Left Side) */}
                        <div className="p-8 lg:p-12 flex flex-col justify-between bg-[#0B0E14]/30 border-b lg:border-b-0 lg:border-r border-white/5 slide-in-left">
                            <div>
                                <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg mb-6 border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>mark_email_unread</span>
                                </div>
                                <h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-4">
                                    {t('contact.title')} <span className="text-gradient">{t('contact.title_highlight')}</span>
                                </h2>
                                <p className="text-gray-400 text-lg font-light leading-relaxed mb-8 max-w-md">
                                    {t('contact.description')}
                                </p>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center gap-4 text-gray-300 group cursor-pointer hover:text-white transition-all">
                                        <div className="size-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                                            <span className="material-symbols-outlined !text-[20px]">mail</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 group-hover:text-primary transition-colors">{t('contact.email')}</p>
                                            <span className="text-lg font-medium">iletisim@ornek.com</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-gray-300 group cursor-pointer hover:text-white transition-all">
                                        <div className="size-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                                            <span className="material-symbols-outlined !text-[20px]">location_on</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 group-hover:text-primary transition-colors">{t('contact.location')}</p>
                                            <span className="text-lg font-medium">{t('contact.location_val')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">{t('contact.social')}</p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: 'code', label: 'GitHub' },
                                        { icon: 'group', label: 'LinkedIn' },
                                        { icon: 'photo_camera', label: 'Instagram' }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                        >
                                            <span className="material-symbols-outlined text-white transition-transform group-hover:scale-110 group-hover:text-black" style={{ fontSize: '24px' }}>
                                                {social.icon}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form (Right Side) */}
                        <div className="p-8 lg:p-12 bg-white/[0.02] backdrop-blur-sm slide-in-right">
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2 group">
                                        <span className="text-gray-300 text-sm font-medium ml-1 group-focus-within:text-primary transition-colors">{t('contact.name')}</span>
                                        <div className="relative">
                                            <input
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="flex w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 h-14 px-4 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-light"
                                                placeholder={t('contact.name_placeholder')}
                                                type="text"
                                            />
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors !text-[20px]">person</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 group">
                                        <span className="text-gray-300 text-sm font-medium ml-1 group-focus-within:text-primary transition-colors">{t('contact.email_label')}</span>
                                        <div className="relative">
                                            <input
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="flex w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 h-14 px-4 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-light"
                                                placeholder={t('contact.email_placeholder')}
                                                type="email"
                                            />
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors !text-[20px]">alternate_email</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 group">
                                    <span className="text-gray-300 text-sm font-medium ml-1 group-focus-within:text-primary transition-colors">{t('contact.subject')}</span>
                                    <div className="relative">
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="flex w-full rounded-xl bg-white/5 border border-white/10 text-white h-14 px-4 pl-11 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-light appearance-none cursor-pointer"
                                        >
                                            <option className="bg-[#0B0E14]">{t('contact.subject_general')}</option>
                                            <option className="bg-[#0B0E14]">{t('contact.subject_proposal')}</option>
                                            <option className="bg-[#0B0E14]">{t('contact.subject_interview')}</option>
                                            <option className="bg-[#0B0E14]">{t('contact.subject_other')}</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors !text-[20px]">chat_bubble_outline</span>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none !text-[20px]">expand_more</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 group">
                                    <span className="text-gray-300 text-sm font-medium ml-1 group-focus-within:text-primary transition-colors">{t('contact.message')}</span>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="flex w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-light min-h-[160px] resize-none"
                                        placeholder={t('contact.message_placeholder')}
                                    ></textarea>
                                </div>
                                <div className="pt-2">
                                    <button
                                        disabled={status === 'sending'}
                                        className="group w-full md:w-auto relative overflow-hidden rounded-xl bg-primary text-white font-bold h-14 px-8 flex items-center justify-center gap-3 hover:bg-blue-400 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                                        <span className={`material-symbols-outlined transition-transform ${status === 'sending' ? 'animate-spin' : 'group-hover:rotate-45'} !text-[24px]`}>
                                            {status === 'sending' ? 'sync' : 'send'}
                                        </span>
                                        <span>{status === 'sending' ? t('contact.sending') : t('contact.send')}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center animate-card">
                    <p className="text-gray-500 text-sm">
                        {t('contact.footer')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
