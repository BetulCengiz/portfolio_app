"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

export default function AdminLogin() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await api.login(formData);
            localStorage.setItem('token', data.access_token);
            router.push('/admin');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-admin-bg font-space min-h-screen flex flex-col relative overflow-hidden text-white selection:bg-admin-primary selection:text-white">
            {/* Abstract Background with Mesh Gradient */}
            <div className="absolute inset-0 z-0">
                <img
                    alt="Abstract dark purple mesh gradient background"
                    className="w-full h-full object-cover opacity-30 pointer-events-none mix-blend-overlay"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJxN1Dy4G5iCva358KDUtcXV8dv5Fw2QgD2KcCYLHKqiFlllOMTXQycyHu2jb8Qo0LL-6wWj8X7CsN3z7JYRLqmfhofZcw78-pct9FQpzfTRcMjmwPdGeqRKXiFTraeEHNLNEE_HbmZtYf_jhg411vTDElkK8d1tz-QJy3YnZvT3yxj8OIZyI6pt1MEB4n3G-7q4cUFdCuHzYGnfQfMlV2YkP6JghpMwY1jdpTUkCUMDvOUvY2_C3bTYtirma75DAMnJe5N3USgpM"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-admin-bg via-admin-bg/80 to-transparent"></div>
            </div>

            {/* Main Layout */}
            <main className="flex-1 flex items-center justify-center p-4 relative z-10 w-full">
                <div className="w-full max-w-[480px] flex flex-col gap-6">
                    {/* Logo */}
                    <div className="flex justify-center mb-2">
                        <div className="h-14 w-14 rounded-2xl bg-admin-primary flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)] animate-fade-in-up">
                            <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className="bg-admin-surface/60 backdrop-blur-2xl border border-admin-border/50 rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col gap-6 animate-fade-in-up [animation-delay:100ms]">
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-white">
                                Admin Girişi
                            </h1>
                            <p className="text-admin-muted text-sm sm:text-base font-light">
                                Portfolyonuzu yönetmek için kimlik bilgilerinizi girin.
                            </p>
                            {error && (
                                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-shake">
                                    {error}
                                </div>
                            )}
                        </div>

                        <form className="flex flex-col gap-5 mt-2" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <label className="flex flex-col w-full group">
                                <span className="text-white/90 text-sm font-medium pb-2 ml-1 group-focus-within:text-admin-primary transition-colors">E-posta Adresi</span>
                                <div className="flex w-full items-stretch rounded-xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-admin-primary/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="flex w-full min-w-0 flex-1 rounded-l-xl border border-r-0 border-admin-border bg-admin-bg/50 h-14 placeholder:text-admin-muted/40 text-white px-4 text-base font-light focus:outline-0 focus:border-admin-primary transition-colors"
                                        placeholder="admin@example.com"
                                    />
                                    <div className="flex items-center justify-center pr-4 pl-2 rounded-r-xl border border-l-0 border-admin-border bg-admin-bg/50 text-admin-muted/60 group-focus-within:text-admin-primary transition-colors">
                                        <span className="material-symbols-outlined text-[24px]">mail</span>
                                    </div>
                                </div>
                            </label>

                            {/* Password Field */}
                            <label className="flex flex-col w-full group">
                                <span className="text-white/90 text-sm font-medium pb-2 ml-1 group-focus-within:text-admin-primary transition-colors">Şifre</span>
                                <div className="flex w-full items-stretch rounded-xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-admin-primary/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="flex w-full min-w-0 flex-1 rounded-l-xl border border-r-0 border-admin-border bg-admin-bg/50 h-14 placeholder:text-admin-muted/40 text-white px-4 text-base font-light focus:outline-0 focus:border-admin-primary transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="flex items-center justify-center pr-4 pl-2 rounded-r-xl border border-l-0 border-admin-border bg-admin-bg/50 text-admin-muted/60 hover:text-admin-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[24px]">
                                            {showPassword ? 'visibility' : 'visibility_off'}
                                        </span>
                                    </button>
                                </div>
                            </label>

                            {/* Forgot Password */}
                            <div className="flex justify-end -mt-2">
                                <button type="button" className="text-admin-muted text-sm font-light hover:text-admin-primary hover:underline transition-all decoration-1 underline-offset-4">
                                    Şifremi Unuttum?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={loading}
                                className={`mt-2 flex w-full items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-admin-primary hover:bg-admin-primary-hover text-white text-base font-bold shadow-lg shadow-admin-primary/40 hover:shadow-admin-primary/60 transition-all duration-300 transform active:scale-[0.98] group ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {loading ? (
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                ) : (
                                    <>
                                        <span className="truncate mr-2">Giriş Yap</span>
                                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer Action */}
                    <div className="text-center animate-fade-in-up [animation-delay:200ms]">
                        <Link href="/" className="inline-flex items-center gap-2 text-admin-muted/70 hover:text-white text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Portfolyoya Dön
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
