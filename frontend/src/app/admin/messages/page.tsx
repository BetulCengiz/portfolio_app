"use client";

import React from 'react';
import { api } from '@/utils/api';

export default function MessagesManagement() {
    const [messages, setMessages] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);


    const [selectedMessage, setSelectedMessage] = React.useState<any>(null);

    React.useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const data = await api.getMessages();
            // Sort by date desc
            data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setMessages(data);
        } catch (error) {
            console.error('Mesajlar yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
        try {
            await api.deleteMessage(id);
            setMessages(messages.filter(m => m.id !== id));
        } catch (error) {
            alert('Mesaj silinemedi.');
        }
    };

    const handleView = async (message: any) => {
        setSelectedMessage(message);
        if (!message.is_read) {
            try {
                await api.updateMessage(message.id, { is_read: true });
                setMessages(messages.map(m => m.id === message.id ? { ...m, is_read: true } : m));
            } catch (error) {
                console.error("Okundu olarak işaretlenemedi");
            }
        }
    };

    const handleMarkAllRead = async () => {
        // This could be an optimized batch endpoint, but for now we loop or just refresh
        // For simplicity in this iteration without batch endpoint:
        alert("Toplu işlem henüz aktif değil, lütfen mesajları tek tek açınız.");
    };

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            {/* Top Gradient Glow */}
            <div className="absolute top-0 left-0 w-full h-64 bg-admin-primary/5 blur-3xl -z-10 pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
                {/* Page Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-admin-border">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white font-space">Gelen Kutusu</h2>
                        <p className="text-admin-muted text-base md:text-lg">İletişim formundan gelen mesajları yönetin ve yanıtlayın.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={fetchMessages} className="flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-admin-primary text-white shadow-lg shadow-admin-primary/20 hover:bg-admin-primary-hover transition-all font-bold text-sm">
                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                            <span>Yenile</span>
                        </button>
                    </div>
                </header>

                {/* Data Table */}
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-admin-border shadow-sm bg-admin-surface">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-admin-bg/50 border-b border-admin-border">
                                    <th className="p-4 md:pl-6 text-xs font-bold uppercase tracking-wider text-admin-muted w-32">Durum</th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-admin-muted">Gönderen</th>
                                    <th className="hidden md:table-cell p-4 text-xs font-bold uppercase tracking-wider text-admin-muted">Konu</th>
                                    <th className="hidden lg:table-cell p-4 text-xs font-bold uppercase tracking-wider text-admin-muted">Tarih</th>
                                    <th className="p-4 md:pr-6 text-xs font-bold uppercase tracking-wider text-admin-muted text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-admin-border">
                                {loading ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-admin-muted">Yükleniyor...</td></tr>
                                ) : messages.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-admin-muted">Mesaj bulunamadı.</td></tr>
                                ) : messages.map((msg) => (
                                    <tr 
                                        key={msg.id} 
                                        onClick={() => handleView(msg)}
                                        className="group hover:bg-admin-primary/5 transition-colors cursor-pointer relative"
                                    >
                                        <td className="p-4 md:pl-6">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-admin-primary scale-y-0 group-hover:scale-y-100 transition-transform"></div>
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${!msg.is_read ? 'bg-admin-primary text-white border-admin-primary/20' : 'bg-white/5 text-admin-muted border-white/10'}`}>
                                                {msg.is_read ? 'Okundu' : 'Okunmadı'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full bg-admin-primary/10 text-admin-primary flex items-center justify-center font-bold text-sm border border-admin-primary/20 shadow-inner">
                                                    {msg.sender_name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className={`text-sm font-bold truncate ${!msg.is_read ? 'text-white' : 'text-gray-400'}`}>{msg.sender_name}</span>
                                                    <span className="text-xs text-admin-muted truncate">{msg.sender_email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell p-4">
                                            <span className={`text-sm truncate max-w-[200px] block ${!msg.is_read ? 'text-white font-bold' : 'text-gray-400 font-normal'}`}>{msg.subject}</span>
                                            <p className="text-xs text-admin-muted truncate max-w-[200px]">{msg.content}</p>
                                        </td>
                                        <td className="hidden lg:table-cell p-4">
                                            <span className="text-sm font-medium text-admin-muted">{new Date(msg.created_at).toLocaleDateString()}</span>
                                        </td>
                                        <td className="p-4 md:pr-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); handleView(msg); }} className="size-8 flex items-center justify-center rounded-lg text-admin-muted hover:text-admin-primary hover:bg-admin-primary/10 transition-colors" title="Görüntüle">
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <button onClick={(e) => handleDelete(msg.id, e)} className="size-8 flex items-center justify-center rounded-lg text-admin-muted hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Sil">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Message Modal */}
                {selectedMessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedMessage(null)}>
                        <div className="bg-admin-surface border border-admin-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <div className="p-6 border-b border-admin-border flex justify-between items-center sticky top-0 bg-admin-surface z-10">
                                <h2 className="text-2xl font-bold text-white">Mesaj Detayı</h2>
                                <button onClick={() => setSelectedMessage(null)} className="text-admin-muted hover:text-white">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="p-6 flex flex-col gap-6">
                                <div className="flex items-center gap-4 pb-4 border-b border-admin-border">
                                    <div className="size-16 rounded-full bg-admin-primary/10 text-admin-primary flex items-center justify-center font-bold text-2xl border border-admin-primary/20">
                                        {selectedMessage.sender_name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedMessage.sender_name}</h3>
                                        <p className="text-admin-muted">{selectedMessage.sender_email}</p>
                                        <p className="text-xs text-admin-muted mt-1">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-admin-muted font-bold mb-2">Konu</h4>
                                    <p className="text-white text-lg font-medium">{selectedMessage.subject}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-admin-muted font-bold mb-2">Mesaj</h4>
                                    <div className="bg-admin-bg p-4 rounded-xl border border-admin-border text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.content}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 gap-3">
                                    <a href={`mailto:${selectedMessage.sender_email}`} className="px-6 py-3 rounded-xl bg-admin-primary text-white font-bold hover:bg-admin-primary-hover shadow-lg shadow-admin-primary/20 flex items-center gap-2">
                                        <span className="material-symbols-outlined">reply</span>
                                        Yanıtla
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
