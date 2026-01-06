"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { api } from '@/utils/api';

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    const menuItems = [
        { label: 'Dashboard', icon: 'dashboard', href: '/admin' },
        { label: 'Projeler', icon: 'view_kanban', href: '/admin/projects' },
        { label: 'Blog', icon: 'edit_note', href: '/admin/blog' },
        { label: 'Timeline', icon: 'history_edu', href: '/admin/timeline' },
        { label: 'Hakkımda', icon: 'person', href: '/admin/about' },
    ];

    const [messageCount, setMessageCount] = React.useState(0);

    React.useEffect(() => {
        const fetchCount = async () => {
            try {
                const messages = await api.getMessages();
                if (Array.isArray(messages)) {
                    setMessageCount(messages.filter((m: any) => !m.is_read).length);
                }
            } catch (error) {
                console.error('Sidebar count error:', error);
            }
        };
        fetchCount();
        const interval = setInterval(fetchCount, 60000); // Poll every minute
        return () => clearInterval(interval);
    }, []);

    const isActive = (href: string) => pathname === href;

    return (
        <aside className="w-64 hidden md:flex flex-col border-r border-admin-border bg-admin-bg h-full sticky top-0">
            <div className="p-6 flex flex-col gap-8 h-full" suppressHydrationWarning>
                {/* User Profile */}
                <div className="flex items-center gap-3">
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-lg ring-2 ring-admin-primary/20"
                        style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff')` }}
                    ></div>
                    <div className="flex flex-col">
                        <h1 className="text-white text-base font-bold leading-tight">Admin Paneli</h1>
                        <p className="text-admin-muted text-xs font-normal">Süper Yönetici</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 flex-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive(item.href)
                                ? 'bg-admin-primary text-white shadow-lg shadow-admin-primary/20'
                                : 'text-admin-muted hover:bg-admin-surface-light hover:text-white'
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive(item.href) ? 'fill-1' : 'group-hover:scale-110 transition-transform'}`}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}

                    <div className="mt-4 px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">İletişim</div>
                    <Link
                        href="/admin/messages"
                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${isActive('/admin/messages')
                            ? 'bg-admin-primary text-white shadow-lg shadow-admin-primary/20'
                            : 'text-admin-muted hover:bg-admin-surface-light hover:text-white'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">mail</span>
                            <span className="font-medium text-sm">Mesajlar</span>
                        </div>
                        {messageCount > 0 && (
                            <span className="flex items-center justify-center w-5 h-5 bg-admin-primary text-[10px] font-bold text-white rounded-full animate-pulse">
                                {messageCount}
                            </span>
                        )}
                    </Link>
                </nav>

                {/* Bottom Settings */}
                <div className="mt-auto">
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-admin-muted hover:bg-admin-surface-light hover:text-white transition-colors group"
                    >
                        <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">settings</span>
                        <span className="text-sm font-medium">Ayarlar</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors group mt-2"
                    >
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">logout</span>
                        <span className="text-sm font-medium">Çıkış Yap</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
