from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.models import Project, Service, TimelineItem, Message, BlogPost
from app.schemas.schemas import ProjectCreate, ServiceCreate, TimelineCreate, MessageCreate, BlogPostCreate

class BaseCRUD:
    def __init__(self, model):
        self.model = model

    def get(self, db: Session, id: int):
        return db.query(self.model).filter(self.model.id == id).first()

    def get_multi(self, db: Session, *, skip: int = 0, limit: int = 100):
        return db.query(self.model).offset(skip).limit(limit).all()

    def remove(self, db: Session, *, id: int):
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj

    def update(self, db: Session, *, db_obj, obj_in):
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        
        for field in update_data:
            if hasattr(db_obj, field):
                setattr(db_obj, field, update_data[field])
        
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

class CRUDProject(BaseCRUD):
    def create(self, db: Session, *, obj_in: ProjectCreate):
        db_obj = Project(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

class CRUDService(BaseCRUD):
    def create(self, db: Session, *, obj_in: ServiceCreate):
        db_obj = Service(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

class CRUDTimeline(BaseCRUD):
    def create(self, db: Session, *, obj_in: TimelineCreate):
        db_obj = TimelineItem(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

class CRUDMessage(BaseCRUD):
    def create(self, db: Session, *, obj_in: MessageCreate):
        db_obj = Message(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

class CRUDBlogPost(BaseCRUD):
    def create(self, db: Session, *, obj_in: BlogPostCreate):
        db_obj = BlogPost(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

project = CRUDProject(Project)
service = CRUDService(Service)
timeline = CRUDTimeline(TimelineItem)
message = CRUDMessage(Message)
blog = CRUDBlogPost(BlogPost)

class CRUDAbout(BaseCRUD):
    def get_first(self, db: Session):
        return db.query(self.model).first()

    def create(self, db: Session, *, obj_in):
        db_obj = self.model(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

class CRUDSettings(BaseCRUD):
    def get_first(self, db: Session):
        return db.query(self.model).first()

    def create(self, db: Session, *, obj_in):
        db_obj = self.model(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

from app.models.models import About, Settings
about = CRUDAbout(About)
settings = CRUDSettings(Settings)
