import os
from app.db.session import engine
from app.db.base_class import Base
from app.models.models import User
from app.db.session import SessionLocal
from app.core.security import get_password_hash

def init_db():
    # Tabloları oluştur
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    admin_email = os.getenv("ADMIN_EMAIL", "admin@example.com")
    # Admin kullanıcısı var mı kontrol et
    user = db.query(User).filter(User.email == admin_email).first()
    if not user:
        admin_user = User(
            email=admin_email,
            hashed_password=get_password_hash(os.getenv("ADMIN_PASSWORD", "admin123")),
            full_name="Admin",
            is_superuser=True
        )
        db.add(admin_user)
        db.commit()
        print(f"Admin user created: {admin_email}")
    else:
        print("Admin user already exists")
    db.close()

if __name__ == "__main__":
    init_db()
