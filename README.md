# Professional Admin Portfolio

Bu proje, bir kişisel portfolyo ve bu portfolyoyu yönetmek için bir admin paneli içeren full-stack bir uygulamadır.

## Teknolojiler

- **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript
- **Backend:** FastAPI (Python), SQLAlchemy, PostgreSQL
- **Auth:** JWT (JSON Web Tokens)
- **Deployment:** Docker & Docker Compose

## Klasör Yapısı

- `frontend/`: Next.js uygulama kodları
- `backend/`: FastAPI API servisleri
- `docker-compose.yml`: Yerel geliştirme ortamı konteynerları

## Kurulum

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
