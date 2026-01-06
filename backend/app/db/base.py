# app/db/base.py
# SQLAlchemy'nin modelleri tanıması için hepsini burada topluyoruz
from app.db.base_class import Base  # Miras alınan ana Base
from app.models.models import User, Project, Service, TimelineItem, Message, BlogPost, About, Settings # Tüm modeller