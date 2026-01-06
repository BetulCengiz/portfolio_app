import sys
import os

# Ensure backend directory is in path
sys.path.insert(0, os.getcwd())

from app.db.session import engine
from sqlalchemy import text

def migrate():
    try:
        with engine.connect() as conn:
            # Check if column exists to avoid error
            # In SQLite, pragma table_info can be used, but simpler to just try-catch or just add if we are sure.
            # We'll validat by trying to select it first? 
            # SQLite: ALTER TABLE table_name ADD COLUMN column_definition;
            print("Attempting to add external_url column...")
            conn.execute(text("ALTER TABLE blog_posts ADD COLUMN external_url VARCHAR"))
            conn.commit()
            print("Migration successful: Added external_url to blog_posts")
    except Exception as e:
        print(f"Migration failed (maybe column exists?): {e}")

if __name__ == "__main__":
    migrate()
