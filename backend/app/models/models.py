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
    title_en = Column(String, index=True, nullable=True)
    description = Column(Text)
    description_en = Column(Text, nullable=True)
    image_url = Column(String)
    github_url = Column(String)
    live_url = Column(String)
    technologies = Column(JSON) # List of tags
    is_featured = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    

class Service(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    title_en = Column(String, index=True, nullable=True)
    description = Column(Text)
    description_en = Column(Text, nullable=True)
    icon = Column(String)
    icon_color = Column(String)
    status = Column(String, default="Yayında") # Yayında, Taslak
    tags = Column(JSON)
    order = Column(Integer, default=0)

class TimelineItem(Base):
    id = Column(Integer, primary_key=True, index=True)
    year = Column(String)
    year_en = Column(String, nullable=True)
    title = Column(String)
    title_en = Column(String, nullable=True)
    company = Column(String, nullable=True)
    company_en = Column(String, nullable=True)
    description = Column(Text)
    description_en = Column(Text, nullable=True)
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
    title_en = Column(String, index=True, nullable=True)
    slug = Column(String, unique=True, index=True)
    content = Column(Text)
    content_en = Column(Text, nullable=True)
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
    title_en = Column(String, nullable=True)
    bio = Column(Text)
    bio_en = Column(Text, nullable=True)
    profile_image = Column(String)
    cv_url = Column(String)
    cv_url_en = Column(String, nullable=True)
    email = Column(String)
    phone = Column(String)
    location = Column(String)
    skills = Column(JSON)  # List of skills with proficiency
    experience = Column(JSON)  # List of work experiences
    experience_en = Column(JSON, nullable=True)
    education = Column(JSON)  # List of education
    education_en = Column(JSON, nullable=True)
    social_links = Column(JSON)  # GitHub, LinkedIn, Twitter, etc.
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

class Settings(Base):
    __tablename__ = "settings"
    id = Column(Integer, primary_key=True, index=True)
    site_title = Column(String, default="Portfolio")
    site_title_en = Column(String, nullable=True)
    site_description = Column(Text)
    site_description_en = Column(Text, nullable=True)
    site_keywords = Column(String)
    site_author = Column(String)
    site_url = Column(String)
    analytics_id = Column(String)  # Umami Website ID
    analytics_url = Column(String, default="https://cloud.umami.is/script.js")  # Umami Script URL
    analytics_share_url = Column(String) # Umami Share URL for dashboard
    contact_email = Column(String)
    social_github = Column(String)
    social_linkedin = Column(String)
    social_twitter = Column(String)
    social_instagram = Column(String)
    theme_primary_color = Column(String, default="#6366f1")
    theme_secondary_color = Column(String, default="#8b5cf6")
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
