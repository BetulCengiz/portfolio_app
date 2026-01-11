from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api.v1.api import api_router # Endpointlerin toplandığı yer
from app.db.session import engine     # Supabase bağlantısı
from app.models.models import Base    # Modellerinin merkezi
from app.core.config import settings  # Ayarlar

# Tabloları Supabase üzerinde otomatik oluştur
# Not: Modellerin Base'e kayıtlı olduğundan emin ol (from app.db.base_class import Base)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Portfolio API",
    description="Backend API for Portfolio and Admin Panel",
    version="1.0.0"
)

# CORS ayarları - Environment variable'dan al
allowed_origins_str = settings.ALLOWED_ORIGINS
origins = [origin.strip().rstrip("/") for origin in allowed_origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.router.redirect_slashes = False

# Resim yüklemeleri için klasör yönetimi
if not os.path.exists("uploads"):
    os.makedirs("uploads")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Tüm route'ları (projects, blog, user vb.) buraya bağlar
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "message": "Portfolio API is running",
        "status": "connected",
        "docs": "/docs"
    }