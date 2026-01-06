import React from 'react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100" suppressHydrationWarning>
            <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav className="space-y-4">
                    <a href="/admin" className="block p-2 hover:bg-slate-800 rounded">Dashboard</a>
                    <a href="/admin/projects" className="block p-2 hover:bg-slate-800 rounded">Projeler</a>
                    <a href="/admin/messages" className="block p-2 hover:bg-slate-800 rounded">Mesajlar</a>
                </nav>
            </aside>
            <main className="flex-1 overflow-auto p-8">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
