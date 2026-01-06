from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings

router = APIRouter()

@router.post("/login", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    # Bu basit bir login, crud tarafında user kontrolü yapılacak
    user = crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Hatalı e-posta veya şifre")
    elif not crud.user.is_active(user):
        raise HTTPException(status_code=400, detail="Pasif kullanıcı")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.get("/me", response_model=schemas.User)
def read_users_me(
    current_user: models.models.User = Depends(deps.get_current_active_user),
) -> Any:
    return current_user

@router.put("/me", response_model=schemas.User)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = None,
    full_name: str = None,
    email: str = None,
    current_user: models.models.User = Depends(deps.get_current_active_user),
) -> Any:
    current_user_data = schemas.UserUpdate(
        full_name=full_name if full_name else current_user.full_name,
        email=email if email else current_user.email,
        password=password if password else None,
        is_active=current_user.is_active,
        is_superuser=current_user.is_superuser
    )
    user = crud.user.update(db, db_obj=current_user, obj_in=current_user_data)
    return user
