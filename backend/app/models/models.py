from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from sqlalchemy.sql import func
from app.db.base_class import Base

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)
    # Profile Fields
    title = Column(String, nullable=True) # e.g. "Full Stack Developer"
    bio = Column(Text, nullable=True)
    avatar_url = Column(String, nullable=True)
    cv_url = Column(String, nullable=True)
    social_github = Column(String, nullable=True)
    social_linkedin = Column(String, nullable=True)
    social_twitter = Column(String, nullable=True)

class Project(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    image_url = Column(String)
    github_url = Column(String)
    live_url = Column(String)
    technologies = Column(JSON) # List of tags
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    

class Service(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    icon = Column(String)
    icon_color = Column(String)
    status = Column(String, default="Yayında") # Yayında, Taslak
    tags = Column(JSON)
    order = Column(Integer, default=0)

class TimelineItem(Base):
    id = Column(Integer, primary_key=True, index=True)
    year = Column(String)
    title = Column(String)
    description = Column(Text)
    icon = Column(String) # work, school, laptop_mac, star
    order = Column(Integer, default=0)

class Message(Base):
    id = Column(Integer, primary_key=True, index=True)
    sender_name = Column(String)
    sender_email = Column(String)
    subject = Column(String)
    content = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class BlogPost(Base):
    __tablename__ = "blog_posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    content = Column(Text)
    image_url = Column(String)
    external_url = Column(String, nullable=True)
    tags = Column(JSON) # List of tags
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class About(Base):
    __tablename__ = "about"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    title = Column(String)  # e.g., "Full Stack Developer"
    bio = Column(Text)
    profile_image = Column(String)
    cv_url = Column(String)
    email = Column(String)
    phone = Column(String)
    location = Column(String)
    skills = Column(JSON)  # List of skills with proficiency
    experience = Column(JSON)  # List of work experiences
    education = Column(JSON)  # List of education
    social_links = Column(JSON)  # GitHub, LinkedIn, Twitter, etc.
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

class Settings(Base):
    __tablename__ = "settings"
    id = Column(Integer, primary_key=True, index=True)
    site_title = Column(String, default="Portfolio")
    site_description = Column(Text)
    site_keywords = Column(String)
    site_author = Column(String)
    site_url = Column(String)
    analytics_id = Column(String)  # Google Analytics
    contact_email = Column(String)
    social_github = Column(String)
    social_linkedin = Column(String)
    social_twitter = Column(String)
    social_instagram = Column(String)
    theme_primary_color = Column(String, default="#6366f1")
    theme_secondary_color = Column(String, default="#8b5cf6")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
