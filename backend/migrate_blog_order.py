import sys
import os

# Ensure backend directory is in path
sys.path.insert(0, os.getcwd())

from app.db.session import engine
from sqlalchemy import text

def migrate():
    try:
        with engine.connect() as conn:
            print("Attempting to add 'order' column to blog_posts...")
            try:
                conn.execute(text("ALTER TABLE blog_posts ADD COLUMN \"order\" INTEGER DEFAULT 0"))
                conn.commit()
                print("Migration successful: Added 'order' column to blog_posts")
            except Exception as e:
                print(f"Column might already exist or error occurred: {e}")
    except Exception as e:
        print(f"Migration failed: {e}")

if __name__ == "__main__":
    migrate()
