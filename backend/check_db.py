from app.db.session import engine
from sqlalchemy import text, inspect
import os
import sys

# Add current dir to path
sys.path.insert(0, os.getcwd())

def check_columns():
    inspector = inspect(engine)
    # Get all table names
    tables = inspector.get_table_names()
    print(f"Tables found: {tables}")
    
    for table in tables:
        print(f"\nColumns in '{table}':")
        try:
            columns = inspector.get_columns(table)
            for col in columns:
                print(f"  - {col['name']} ({col['type']})")
        except Exception as e:
            print(f"  Error reading columns for {table}: {e}")

if __name__ == "__main__":
    check_columns()
