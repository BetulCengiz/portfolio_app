from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Project Schemas
class ProjectBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    technologies: List[str] = []
    is_featured: bool = False
    is_published: bool = True
    
class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    technologies: Optional[List[str]] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Service Schemas
class ServiceBase(BaseModel):
    title: str
    description: str
    icon: str
    icon_color: Optional[str] = None
    status: str = "Yayında"
    tags: List[str] = []
    order: int = 0

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int

    class Config:
        from_attributes = True

# Timeline Schemas
class TimelineBase(BaseModel):
    year: str
    title: str
    description: str
    icon: str
    order: int = 0

class TimelineCreate(TimelineBase):
    pass

class Timeline(TimelineBase):
    id: int

    class Config:
        from_attributes = True

# Message Schemas
class MessageBase(BaseModel):
    sender_name: str
    sender_email: str
    subject: str
    content: str

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Blog Schemas
class BlogPostBase(BaseModel):
    title: str
    slug: str
    content: str
    image_url: Optional[str] = None
    external_url: Optional[str] = None
    tags: List[str] = []
    is_published: bool = False

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    external_url: Optional[str] = None
    tags: Optional[List[str]] = None
    is_published: Optional[bool] = None

class BlogPost(BlogPostBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# About Schemas
class AboutBase(BaseModel):
    full_name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    profile_image: Optional[str] = None
    cv_url: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[List[dict]] = []
    experience: Optional[List[dict]] = []
    education: Optional[List[dict]] = []
    social_links: Optional[dict] = {}

class AboutCreate(AboutBase):
    pass

class AboutUpdate(AboutBase):
    pass

class About(AboutBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Settings Schemas
class SettingsBase(BaseModel):
    site_title: Optional[str] = "Portfolio"
    site_description: Optional[str] = None
    site_keywords: Optional[str] = None
    site_author: Optional[str] = None
    site_url: Optional[str] = None
    analytics_id: Optional[str] = None
    contact_email: Optional[str] = None
    social_github: Optional[str] = None
    social_linkedin: Optional[str] = None
    social_twitter: Optional[str] = None
    social_instagram: Optional[str] = None
    theme_primary_color: Optional[str] = "#6366f1"
    theme_secondary_color: Optional[str] = "#8b5cf6"

class SettingsCreate(SettingsBase):
    pass

class SettingsUpdate(SettingsBase):
    pass

class Settings(SettingsBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
