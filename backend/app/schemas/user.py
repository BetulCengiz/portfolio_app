from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    title: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    cv_url: Optional[str] = None
    social_github: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_twitter: Optional[str] = None

class UserCreate(UserBase):
    email: EmailStr
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class User(UserBase):
    id: int

    class Config:
        from_attributes = True
