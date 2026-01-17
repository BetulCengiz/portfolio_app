from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app import crud, schemas
from app.api import deps
from fastapi import File, UploadFile
import shutil
import os
import uuid # Dosya isimlerinin çakışmaması için
# Modelleri doğrudan dosyadan import ederek 'models.models' hatasını çözüyoruz
from app.models.models import About, TimelineItem, User, BlogPost
from app.core.config import settings 

router = APIRouter()


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_user: User = Depends(deps.get_current_active_user)
):
    """Upload a file to Supabase Storage (for avatars, CVs, etc.)."""
    from app.core.storage import storage
    
    # Determine folder based on file type
    extension = file.filename.split(".")[-1].lower() if file.filename else ""
    
    if extension == "pdf":
        folder = "documents"
        allowed_extensions = ["pdf"]
    else:
        folder = "images"
        allowed_extensions = ["jpg", "jpeg", "png", "webp", "gif"]
    
    # Upload to Supabase Storage
    public_url, file_path = await storage.upload_file(
        file=file,
        folder=folder,
        allowed_extensions=allowed_extensions + ["pdf"]  # Allow both
    )
    
    return {"url": public_url}
    
# --- Services ---
@router.get("/services", response_model=List[schemas.schemas.Service])
def read_services(db: Session = Depends(deps.get_db)) -> Any:
    return crud.service.get_multi(db)

@router.post("/services", response_model=schemas.schemas.Service)
def create_service(
    db: Session = Depends(deps.get_db), 
    *, 
    obj_in: schemas.schemas.ServiceCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    return crud.service.create(db, obj_in=obj_in)

# --- Timeline ---
@router.get("/timeline", response_model=List[schemas.Timeline])
def read_timeline(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    return db.query(TimelineItem).order_by(TimelineItem.order.asc()).all()

@router.post("/timeline", response_model=schemas.Timeline)
def create_timeline_item(
    *,
    db: Session = Depends(deps.get_db),
    item_in: schemas.TimelineCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    item = TimelineItem(**item_in.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/timeline/{id}", response_model=schemas.Timeline)
def delete_timeline_item(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    item = db.query(TimelineItem).filter(TimelineItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Öğe bulunamadı")
    db.delete(item)
    db.commit()
    return item

@router.put("/timeline/{id}", response_model=schemas.Timeline)
def update_timeline_item(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    item_in: schemas.TimelineUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    item = db.query(TimelineItem).filter(TimelineItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Öğe bulunamadı")
    update_data = item_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item

# --- Messages ---
@router.get("/messages", response_model=List[schemas.schemas.Message])
def read_messages(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    return crud.message.get_multi(db)

@router.post("/messages", response_model=schemas.schemas.Message)
def create_message(db: Session = Depends(deps.get_db), *, obj_in: schemas.schemas.MessageCreate) -> Any:
    return crud.message.create(db, obj_in=obj_in)

@router.delete("/messages/{id}", response_model=schemas.schemas.Message)
def delete_message(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    message = crud.message.get(db=db, id=id)
    if not message:
        raise HTTPException(status_code=404, detail="Mesaj bulunamadı")
    message = crud.message.remove(db=db, id=id)
    return message

@router.put("/messages/{id}", response_model=schemas.schemas.Message)
def update_message(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    obj_in: dict, # Using dict for partial updates like {"is_read": True}
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    message = crud.message.get(db=db, id=id)
    if not message:
        raise HTTPException(status_code=404, detail="Mesaj bulunamadı")
    
    # Simple update wrapper since schema might not have an unexpected update class
    message = crud.message.update(db=db, db_obj=message, obj_in=obj_in)
    return message

# --- Blog ---
@router.get("/blog", response_model=List[schemas.schemas.BlogPost])
def read_blog_posts(db: Session = Depends(deps.get_db)) -> Any:
    return db.query(BlogPost).order_by(BlogPost.order.asc()).all()

@router.post("/blog/reorder", response_model=List[schemas.schemas.BlogPost])
def reorder_blog_posts(
    *,
    db: Session = Depends(deps.get_db),
    ordered_ids: List[int] = Body(...),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """Updates the order of blog posts based on the provided list of IDs."""
    posts = []
    for index, post_id in enumerate(ordered_ids):
        post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
        if post:
            post.order = index
            posts.append(post)
    db.commit()
    return posts

@router.post("/blog", response_model=schemas.schemas.BlogPost)
def create_blog_post(
    db: Session = Depends(deps.get_db), 
    *, 
    obj_in: schemas.schemas.BlogPostCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    return crud.blog.create(db, obj_in=obj_in)

@router.put("/blog/{id}", response_model=schemas.schemas.BlogPost)
def update_blog_post(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    obj_in: schemas.schemas.BlogPostUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    post = crud.blog.get(db=db, id=id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    post = crud.blog.update(db=db, db_obj=post, obj_in=obj_in)
    return post

@router.delete("/blog/{id}", response_model=schemas.schemas.BlogPost)
def delete_blog_post(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    post = crud.blog.get(db=db, id=id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    post = crud.blog.remove(db=db, id=id)
    return post

# --- About ---
@router.get("/about", response_model=schemas.About)
def get_about(db: Session = Depends(deps.get_db)):
    about = db.query(About).first()
    if not about:
        about = About(
            full_name="Ad Soyad", 
            title="Full Stack Developer", 
            bio="Henüz bio eklenmedi.",
            skills=[],
            experience=[],
            education=[],
            social_links={}
        )
        db.add(about)
        db.commit()
        db.refresh(about)
    return about

@router.post("/about", response_model=schemas.About)
def update_about(
    *,
    db: Session = Depends(deps.get_db),
    about_in: schemas.AboutUpdate,
    current_user: User = Depends(deps.get_current_active_user),
):
    about = db.query(About).first()
    if not about:
        about = About(**about_in.dict())
        db.add(about)
    else:
        update_data = about_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(about, field, value)
    db.commit()
    db.refresh(about)
    return about

# --- Settings ---
@router.get("/settings", response_model=schemas.schemas.Settings)
def read_settings(db: Session = Depends(deps.get_db)) -> Any:
    settings = crud.settings.get_first(db)
    if not settings:
        return schemas.schemas.Settings(id=0, site_title="Portfolio")
    return settings

@router.post("/settings", response_model=schemas.schemas.Settings)
def create_or_update_settings(
    db: Session = Depends(deps.get_db),
    *,
    obj_in: schemas.schemas.SettingsCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    settings = crud.settings.get_first(db)
    if settings:
        return crud.settings.update(db, db_obj=settings, obj_in=obj_in)
    return crud.settings.create(db, obj_in=obj_in)