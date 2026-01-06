"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-admin-bg font-noto text-white flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
                {/* Dekoratif Arka Plan (Admin İçi) */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-admin-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-admin-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Mobile Header (Hidden on MD+) */}
                <header className="md:hidden flex items-center justify-between p-4 bg-admin-surface border-b border-admin-border relative z-20">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-admin-primary rounded-md flex items-center justify-center text-white font-bold">A</div>
                        <span className="font-bold text-white">Admin Panel</span>
                    </div>
                    <button className="text-white p-2">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                <main className="flex-1 relative z-10 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
