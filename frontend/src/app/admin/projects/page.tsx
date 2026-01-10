"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Row Component
function SortableRow({ project, formatDate, handleDelete }: { project: any, formatDate: any, handleDelete: any }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        position: isDragging ? 'relative' as 'relative' : undefined,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className={`group transition-colors ${isDragging ? 'bg-admin-surface shadow-xl border-admin-primary' : 'hover:bg-admin-primary/5'}`}
        >
            <td className="px-6 py-4">
                <div {...attributes} {...listeners} className="cursor-grab hover:text-admin-primary text-admin-muted">
                    <span className="material-symbols-outlined">drag_indicator</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div
                    className="h-16 w-16 rounded-xl bg-cover bg-center border border-admin-border shadow-inner bg-admin-surface-light"
                    style={{
                        backgroundImage: project.image_url
                            ? `url(${project.image_url.startsWith('http') ? project.image_url : `http://localhost:8000${project.image_url}`})`
                            : 'none'
                    }}
                >
                    {!project.image_url && <span className="material-symbols-outlined text-admin-muted flex items-center justify-center h-full">image</span>}
                </div>
            </td>
            <td className="px-6 py-4">
                <p className="text-white font-bold text-base line-clamp-1">{project.title}</p>
                <p className="text-xs text-admin-muted mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                    {formatDate(project.created_at)}
                </p>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {project.technologies?.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md bg-admin-surface-light border border-admin-border text-[10px] font-medium text-white/70">
                            {tech}
                        </span>
                    ))}
                    {project.technologies?.length > 3 && (
                        <span className="text-[10px] text-admin-muted pl-1">+{project.technologies.length - 3}</span>
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${project.is_published ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]'}`}></span>
                    <span className="text-gray-300 text-sm font-medium">{project.is_published ? 'Yayında' : 'Taslak'}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <Link
                        href={`/admin/projects/edit/${project.id}`}
                        className="p-2 text-admin-muted hover:text-white hover:bg-admin-surface-light rounded-xl transition-all"
                        title="Düzenle"
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </Link>
                    <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-admin-muted hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                        title="Sil"
                    >
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default function ProjectsManagement() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Projeler yüklenirken hata:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Bilinmiyor';
        return new Date(dateString).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;

        try {
            await api.deleteProject(id);
            setProjects(projects.filter(p => p.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setProjects((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Backend'e yeni sırayı gönder
                const orderedIds = newItems.map(item => item.id);
                api.reorderProjects(orderedIds).catch(err => console.error("Sıralama hatası:", err));

                return newItems;
            });
        }
    };

    return (
        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-admin-border">
                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-4xl font-black tracking-tight font-space">Projeler</h1>
                    <p className="text-admin-muted text-lg">Tüm çalışmalarınızı buradan yönetebilir, yeni projeler ekleyebilirsiniz.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-admin-primary hover:bg-admin-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-admin-primary/20 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>Yeni Proje</span>
                </Link>
            </div>

            {/* Quick Actions & Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md w-full group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-admin-muted group-focus-within:text-admin-primary transition-colors material-symbols-outlined">search</span>
                    <input
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-admin-surface border border-admin-border focus:border-admin-primary focus:ring-1 focus:ring-admin-primary text-white placeholder-gray-500 transition-all outline-none"
                        placeholder="Proje ara..."
                        type="text"
                    />
                </div>
                <div className="flex gap-2 p-1 bg-admin-surface rounded-xl border border-admin-border">
                    <button className="px-4 py-2 rounded-lg bg-admin-primary/10 text-admin-primary text-sm font-bold">Hepsi</button>
                    <button className="px-4 py-2 rounded-lg text-admin-muted hover:text-white text-sm font-medium transition-colors">Yayında</button>
                    <button className="px-4 py-2 rounded-lg text-admin-muted hover:text-white text-sm font-medium transition-colors">Taslak</button>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-admin-surface border border-admin-border rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <span className="material-symbols-outlined animate-spin text-admin-primary text-4xl">progress_activity</span>
                            <p className="text-admin-muted font-medium">Projeler yükleniyor...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4 text-center">
                            <span className="material-symbols-outlined text-admin-muted text-5xl">inventory_2</span>
                            <h3 className="text-white text-xl font-bold">Henüz Proje Yok</h3>
                            <p className="text-admin-muted max-w-xs">İlk projenizi ekleyerek portfolyonuzu canlandırın.</p>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-admin-surface-light/50 border-b border-admin-border">
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-admin-muted w-10"></th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-admin-muted">Görsel</th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-admin-muted">Proje Detayları</th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-admin-muted">Teknolojiler</th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-admin-muted">Durum</th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-admin-muted text-right">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-admin-border">
                                    <SortableContext
                                        items={projects.map(p => p.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {projects.map((project) => (
                                            <SortableRow
                                                key={project.id}
                                                project={project}
                                                formatDate={formatDate}
                                                handleDelete={handleDelete}
                                            />
                                        ))}
                                    </SortableContext>
                                </tbody>
                            </table>
                        </DndContext>
                    )}
                </div>
            </div>

            {/* Pagination Placeholder */}
            {!loading && projects.length > 0 && (
                <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-admin-muted">
                        Toplam <span className="font-bold text-white">{projects.length}</span> proje gösteriliyor
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="size-10 flex items-center justify-center rounded-xl bg-admin-surface border border-admin-border text-admin-muted hover:bg-admin-surface-light transition-colors disabled:opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>
                        <button className="size-10 flex items-center justify-center rounded-xl bg-admin-primary text-white font-bold text-sm shadow-lg shadow-admin-primary/20">1</button>
                        <button className="size-10 flex items-center justify-center rounded-xl bg-admin-surface border border-admin-border text-admin-muted hover:bg-admin-surface-light transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                </div>
            )}
        </div>
    );
}
