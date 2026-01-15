const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const api = {
    // ... imports ...

    // Generic Image Upload - uploads to Supabase Storage
    async uploadImage(file: File) {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/projects/upload-image`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Görsel yüklenemedi');
        }

        // Supabase Storage returns full public URL, no need to prepend
        return response.json();
    },
    // api.ts içindeki login fonksiyonu
    async login(formData: any) {
        const body = new URLSearchParams();
        body.append('username', formData.email);
        body.append('password', formData.password);

        // DÜZELTME: /api/v1 kısmını sildik çünkü API_URL içinde zaten var
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(), // toString ekledik
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Giriş Hatası Detayı:", error);
            throw new Error(error.detail || 'Giriş yapılamadı');
        }

        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
        }
        return data;
    },

    async createProject(projectData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/projects/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Proje kaydedilemedi');
        }

        return response.json();
    },

    async getProjects() {
        const response = await fetch(`${API_URL}/projects/`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Projeler yüklenemedi');
        return response.json();
    },

    async getProject(projectId: number) {
        const response = await fetch(`${API_URL}/projects/${projectId}`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Proje yüklenemedi');
        return response.json();
    },

    async updateProject(projectId: number, projectData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/projects/${projectId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Proje güncellenemedi');
        }

        return response.json();
    },

    async deleteProject(projectId: number) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/projects/${projectId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Proje silinemedi');
        }

        return response.json();
    },

    async reorderProjects(orderedIds: number[]) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/projects/reorder`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderedIds),
        });

        if (!response.ok) {
            throw new Error('Sıralama güncellenemedi');
        }

        return response.json();
    },

    async uploadProjectImage(file: File) {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/projects/upload-image`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Görsel yüklenemedi');
        }

        return response.json();
        return response.json();
    },

    // Generic Image Upload (reusing project upload for now as it is a general file uploader)


    // Services
    async getServices() {
        const response = await fetch(`${API_URL}/resources/services`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Hizmetler yüklenemedi');
        return response.json();
    },

    async createService(serviceData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/services`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Hizmet oluşturulamadı');
        }

        return response.json();
    },

    // Timeline
    async getTimeline() {
        const response = await fetch(`${API_URL}/resources/timeline`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Zaman çizelgesi yüklenemedi');
        return response.json();
    },

    async createTimeline(timelineData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/timeline`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(timelineData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Timeline öğesi oluşturulamadı');
        }

        return response.json();
    },

    async updateTimeline(id: number, timelineData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/timeline/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(timelineData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Timeline öğesi güncellenemedi');
        }

        return response.json();
    },

    // Messages
    async sendMessage(messageData: any) {
        const response = await fetch(`${API_URL}/resources/messages`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Mesaj gönderilemedi');
        }

        return response.json();
    },

    async getMessages() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/messages`, {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Mesajlar yüklenemedi');
        return response.json();
    },

    async deleteMessage(id: number) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/messages/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Mesaj silinemedi');
        return response.json();
    },

    async updateMessage(id: number, data: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/messages/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Mesaj güncellenemedi');
        return response.json();
    },

    // Blog
    async getBlogPosts() {
        const response = await fetch(`${API_URL}/resources/blog`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Blog yazıları yüklenemedi');
        return response.json();
    },

    async createBlogPost(blogData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/blog`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(blogData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Blog yazısı oluşturulamadı');
        }
        return response.json();
    },

    async updateBlogPost(id: number, blogData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/blog/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(blogData),
        });
        if (!response.ok) throw new Error('Blog güncellenemedi');
        return response.json();
    },

    async deleteBlogPost(id: number) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/blog/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Blog silinemedi');
        return response.json();
    },

    // Resources Delete/Update helpers if missing
    async deleteTimeline(id: number) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/timeline/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Silinemedi');
        return response.json();
    },

    // User
    async getUser() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/auth/me`, {
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Kullanıcı bilgileri yüklenemedi');
        return response.json();
    },

    async updateUser(userData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Kullanıcı güncellenemedi');
        }
        return response.json();
    },

    // About
    async getAbout() {
        const response = await fetch(`${API_URL}/resources/about`, { credentials: 'include' });
        if (!response.ok) return null; // Handle 404 or empty gracefully
        return response.json();
    },

    async updateAbout(aboutData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/about`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(aboutData),
        });
        if (!response.ok) throw new Error('Hakkımda güncellenemedi');
        return response.json();
    },
    // --- Dosya Yükleme (Avatar ve CV için) ---
    async uploadFile(formData: FormData) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
                // ÖNEMLİ: FormData gönderirken Content-Type başlığı eklemiyoruz, 
                // tarayıcı otomatik olarak 'multipart/form-data' olarak ayarlar.
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Dosya yüklenemedi');
        }

        return response.json();
    },

    // Settings
    async getSettings() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/settings`, {
            credentials: 'include',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) return null;
        return response.json();
    },

    async updateSettings(settingsData: any) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/resources/settings`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(settingsData),
        });
        if (!response.ok) throw new Error('Ayarlar güncellenemedi');
        return response.json();
    },

    // Dashboard Stats Helper
    async getDashboardStats() {
        const token = localStorage.getItem('token');
        try {
            const [projects, messages, blogPosts] = await Promise.all([
                fetch(`${API_URL}/projects/`, { credentials: 'include' }).then(res => res.json()),
                fetch(`${API_URL}/resources/messages`, { headers: { 'Authorization': `Bearer ${token}` }, credentials: 'include' }).then(res => res.json()),
                fetch(`${API_URL}/resources/blog`, { credentials: 'include' }).then(res => res.json())
            ]);

            return {
                projectsCount: Array.isArray(projects) ? projects.length : 0,
                messagesCount: Array.isArray(messages) ? messages.length : 0,
                blogCount: Array.isArray(blogPosts) ? blogPosts.length : 0
            };
        } catch (error) {
            console.error("Stats fetch error", error);
            return { projectsCount: 0, messagesCount: 0, blogCount: 0 };
        }
    }
};
