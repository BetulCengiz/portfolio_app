import shutil
import os
import uuid
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Body
from sqlalchemy.orm import Session

# Import yollarını sadeleştirelim
from app import crud, schemas, models
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Project])
def read_projects(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    # return crud.project.get_multi(db, skip=skip, limit=limit)
    # Order by 'order' column ascending
    return db.query(models.models.Project).order_by(models.models.Project.order.asc()).offset(skip).limit(limit).all()

@router.post("/reorder", response_model=List[schemas.Project])
def reorder_projects(
    *,
    db: Session = Depends(deps.get_db),
    ordered_ids: List[int] = Body(...),
    current_user: models.models.User = Depends(deps.get_current_active_user),
) -> Any:
    """Updates the order of projects based on the provided list of IDs."""
    projects = []
    for index, project_id in enumerate(ordered_ids):
        project = db.query(models.models.Project).filter(models.models.Project.id == project_id).first()
        if project:
            project.order = index
            projects.append(project)
    db.commit()
    return projects

@router.get("/{id}", response_model=schemas.Project)
def read_project(id: int, db: Session = Depends(deps.get_db)) -> Any:
    project = crud.project.get(db=db, id=id)
    if not project:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    return project

@router.post("/", response_model=schemas.Project)
def create_project(
    *,
    db: Session = Depends(deps.get_db),
    project_in: schemas.ProjectCreate,
    current_user: models.models.User = Depends(deps.get_current_active_user),
) -> Any:
    """Proje oluşturur ve otomatik yayınlar."""
    return crud.project.create(db, obj_in=project_in)

@router.put("/{id}", response_model=schemas.Project)
def update_project(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    project_in: schemas.ProjectUpdate,
    current_user: models.models.User = Depends(deps.get_current_active_user),
) -> Any:
    project = crud.project.get(db=db, id=id)
    if not project:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    return crud.project.update(db=db, db_obj=project, obj_in=project_in)

@router.delete("/{id}", response_model=schemas.Project)
def delete_project(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.models.User = Depends(deps.get_current_active_user),
) -> Any:
    project = crud.project.get(db=db, id=id)
    if not project:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    return crud.project.remove(db=db, id=id)

@router.post("/upload-image")
async def upload_project_image(
    file: UploadFile = File(...),
    current_user: models.models.User = Depends(deps.get_current_active_user),
):
    # 1. Klasör kontrolü
    upload_dir = "uploads"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    # 2. Uzantı kontrolü
    extension = file.filename.split(".")[-1].lower()
    if extension not in ["jpg", "jpeg", "png", "webp"]:
        raise HTTPException(status_code=400, detail="Sadece görsel dosyaları yüklenebilir.")

    # 3. Benzersiz isim ve kayıt
    file_name = f"{uuid.uuid4()}.{extension}"
    file_path = os.path.join(upload_dir, file_name)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Dosya kaydedilemedi: {str(e)}")

    # 4. URL döndür (Base URL eklemek frontend için daha kolay olabilir)
    return {"image_url": f"/uploads/{file_name}"}