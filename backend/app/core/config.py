import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Portfolio Backend"
    API_V1_STR: str = "/api/v1"
    
    # Veritabanı
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    
    # Güvenlik - Production'da varsayılan değer KULLANILMAMALI
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 120))
    
    # Deployment
    BACKEND_URL: str = os.getenv("BACKEND_URL", "http://localhost:8000")
    ALLOWED_ORIGINS: str = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Supabase Storage
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_BUCKET: str = os.getenv("SUPABASE_BUCKET", "uploads")
    
    class Config:
        case_sensitive = True

settings = Settings()

# Production güvenlik kontrolü
if settings.ENVIRONMENT == "production":
    if settings.SECRET_KEY == "dev-secret-key-change-in-production":
        raise ValueError("🚨 CRITICAL: SECRET_KEY must be changed in production! Generate a new one with: python -c 'import secrets; print(secrets.token_urlsafe(32))'")
    if len(settings.SECRET_KEY) < 32:
        raise ValueError("🚨 CRITICAL: SECRET_KEY must be at least 32 characters long for production!")
