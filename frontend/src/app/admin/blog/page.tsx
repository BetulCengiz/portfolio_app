"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';

export default function BlogManagement() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<any>(null); // For editing
    const [formData, setFormData] = useState({ title: '', slug: '', content: '', image_url: '', external_url: '', is_published: false });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await api.getBlogPosts();
            setPosts(data);
        } catch (error) {
            console.error('Blog yazıları yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (post: any = null) => {
        if (post) {
            setCurrentPost(post);
            setFormData({
                title: post.title,
                slug: post.slug,
                content: post.content,
                image_url: post.image_url || '',
                external_url: post.external_url || '',
                is_published: post.is_published
            });
        } else {
            setCurrentPost(null);
            setFormData({ title: '', slug: '', content: '', image_url: '', external_url: '', is_published: false });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Silmek istediğinize emin misiniz?")) return;
        try {
            await api.deleteBlogPost(id);
            setPosts(posts.filter(p => p.id !== id));
        } catch (error) {
            alert("Silme başarısız.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentPost) {
                // Update
                const updated = await api.updateBlogPost(currentPost.id, formData);
                setPosts(posts.map(p => p.id === currentPost.id ? updated : p));
            } else {
                // Create
                const created = await api.createBlogPost(formData);
                setPosts([created, ...posts]);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            alert("Kaydedilemedi.");
        }
    };

    return (
        <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8 relative">
            <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-admin-border">
                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-4xl font-black tracking-tight font-space">Blog Yönetimi</h1>
                    <p className="text-admin-muted text-lg">Makalelerinizi ve düşüncelerinizi buradan paylaşın.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-admin-primary hover:bg-admin-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-admin-primary/20 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">add_notes</span>
                    <span>Yeni Yazı</span>
                </button>
            </div>

            {loading ? (
                <div className="text-white text-center">Yükleniyor...</div>
            ) : posts.length === 0 ? (
                <div className="bg-admin-surface border border-admin-border rounded-2xl p-20 flex flex-col items-center justify-center text-center gap-4">
                    <div className="size-20 rounded-full bg-admin-primary/10 flex items-center justify-center text-admin-primary mb-2">
                        <span className="material-symbols-outlined text-[40px]">edit_note</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Henüz Blog Yazısı Yok</h2>
                    <p className="text-admin-muted max-w-md">İlk blog yazınızı ekleyerek deneyimlerinizi paylaşmaya başlayın.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-admin-surface p-6 rounded-xl border border-admin-border flex justify-between items-center hover:bg-white/5 transition-colors group">
                            <div>
                                <h3 className="text-white text-xl font-bold group-hover:text-admin-primary transition-colors flex items-center gap-2">
                                    {post.title}
                                    {post.external_url && <span className="material-symbols-outlined text-sm text-admin-muted" title="Dış Bağlantı">open_in_new</span>}
                                </h3>
                                <p className="text-admin-muted text-sm mt-1">{post.slug}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.is_published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                    {post.is_published ? 'Yayında' : 'Taslak'}
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleOpenModal(post)} className="p-2 rounded-lg bg-admin-bg hover:bg-admin-primary hover:text-white text-admin-muted transition-colors">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg bg-admin-bg hover:bg-red-500/20 hover:text-red-400 text-admin-muted transition-colors">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-admin-surface border border-admin-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-admin-border flex justify-between items-center sticky top-0 bg-admin-surface z-10">
                            <h2 className="text-2xl font-bold text-white">{currentPost ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-admin-muted hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-white font-bold">Başlık</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white font-bold">Slug (URL)</label>
                                <input
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white font-bold">Resim</label>
                                <div className="flex flex-col gap-4">
                                    {/* Tabs for Image Source */}
                                    <div className="flex gap-4 border-b border-admin-border pb-2">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, image_url: formData.image_url.startsWith('http') ? formData.image_url : '' })} // Reset if switching modes? No, let's keep it simple.
                                            className="text-admin-primary font-bold text-sm border-b-2 border-admin-primary pb-1"
                                        >
                                            Görsel Yükle / URL
                                        </button>
                                    </div>

                                    {/* URL Input */}
                                    <div className="flex flex-col gap-2">
                                        <span className="text-admin-muted text-xs uppercase font-bold">Resim Linki (URL)</span>
                                        <input
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                            placeholder="https://example.com/image.jpg"
                                            className="bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div className="flex flex-col gap-2">
                                        <span className="text-admin-muted text-xs uppercase font-bold">Veya Bilgisayardan Yükle</span>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        try {
                                                            const res = await api.uploadImage(file);
                                                            // Backend returns { image_url: "..." }
                                                            setFormData({ ...formData, image_url: res.image_url || '' });
                                                        } catch (err) {
                                                            console.error(err);
                                                            alert("Resim yüklenirken hata oluştu.");
                                                        }
                                                    }
                                                }}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="bg-admin-bg border border-dashed border-admin-border rounded-xl px-4 py-6 text-center hover:border-admin-primary transition-colors flex flex-col items-center justify-center gap-2">
                                                <span className="material-symbols-outlined text-admin-muted text-3xl">cloud_upload</span>
                                                <span className="text-admin-muted text-sm font-medium">Dosya seçmek için tıklayın</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preview */}
                                    {formData.image_url && (
                                        <div className="mt-2 relative h-40 rounded-xl overflow-hidden border border-admin-border bg-black/50">
                                            <img src={formData.image_url} alt="Önizleme" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image_url: '' })}
                                                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-sm">close</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white font-bold">Harici Link (Medium vb.)</label>
                                <input
                                    value={formData.external_url}
                                    onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                                    placeholder="https://medium.com/..."
                                    className="bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary"
                                />
                                <p className="text-xs text-admin-muted">Eğer burayı doldurursanız, içerik yerine bu linke yönlendirilir.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white font-bold">İçerik (Markdown)</label>
                                <textarea
                                    rows={10}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="bg-admin-bg border border-admin-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-primary font-mono text-sm"
                                ></textarea>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_published}
                                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                                    className="w-5 h-5 rounded border-admin-border bg-admin-bg text-admin-primary focus:ring-admin-primary"
                                />
                                <span className="text-white font-bold">Yayında (Taslak değil)</span>
                            </label>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl border border-admin-border text-white hover:bg-white/5">
                                    İptal
                                </button>
                                <button type="submit" className="px-6 py-3 rounded-xl bg-admin-primary text-white font-bold hover:bg-admin-primary-hover shadow-lg shadow-admin-primary/20">
                                    {currentPost ? 'Güncelle' : 'Yayınla'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
