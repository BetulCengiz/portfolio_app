"""
Supabase Storage utility for handling file uploads.
"""
import uuid
import httpx
from typing import Optional, Tuple
from fastapi import UploadFile, HTTPException
from app.core.config import settings


class SupabaseStorage:
    """Handle file uploads to Supabase Storage."""
    
    def __init__(self):
        self.url = settings.SUPABASE_URL
        self.key = settings.SUPABASE_KEY
        self.bucket = settings.SUPABASE_BUCKET
        
    def _get_headers(self) -> dict:
        """Get headers for Supabase API requests."""
        return {
            "Authorization": f"Bearer {self.key}",
            "apikey": self.key,
        }
    
    def _get_public_url(self, file_path: str) -> str:
        """Generate public URL for uploaded file."""
        return f"{self.url}/storage/v1/object/public/{self.bucket}/{file_path}"
    
    async def upload_file(
        self, 
        file: UploadFile, 
        folder: str = "images",
        allowed_extensions: list = None
    ) -> Tuple[str, str]:
        """
        Upload a file to Supabase Storage.
        
        Args:
            file: The uploaded file
            folder: Folder path within the bucket
            allowed_extensions: List of allowed file extensions
            
        Returns:
            Tuple of (public_url, file_path)
        """
        if allowed_extensions is None:
            allowed_extensions = ["jpg", "jpeg", "png", "webp", "gif", "pdf"]
        
        # Validate extension
        extension = file.filename.split(".")[-1].lower() if file.filename else ""
        if extension not in allowed_extensions:
            raise HTTPException(
                status_code=400, 
                detail=f"Desteklenmeyen dosya türü. İzin verilen: {', '.join(allowed_extensions)}"
            )
        
        # Generate unique filename
        unique_filename = f"{uuid.uuid4()}.{extension}"
        file_path = f"{folder}/{unique_filename}"
        
        # Read file content
        content = await file.read()
        
        # Determine content type
        content_type = file.content_type or f"image/{extension}"
        
        # Upload to Supabase Storage
        upload_url = f"{self.url}/storage/v1/object/{self.bucket}/{file_path}"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                upload_url,
                headers={
                    **self._get_headers(),
                    "Content-Type": content_type,
                },
                content=content,
            )
            
            if response.status_code not in [200, 201]:
                error_detail = response.text
                raise HTTPException(
                    status_code=500,
                    detail=f"Dosya yüklenemedi: {error_detail}"
                )
        
        public_url = self._get_public_url(file_path)
        return public_url, file_path
    
    async def delete_file(self, file_path: str) -> bool:
        """
        Delete a file from Supabase Storage.
        
        Args:
            file_path: Path of the file to delete
            
        Returns:
            True if successful
        """
        delete_url = f"{self.url}/storage/v1/object/{self.bucket}/{file_path}"
        
        async with httpx.AsyncClient() as client:
            response = await client.delete(
                delete_url,
                headers=self._get_headers(),
            )
            
            return response.status_code in [200, 204]


# Singleton instance
storage = SupabaseStorage()
