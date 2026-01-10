from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import pymysql
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Fallback Data
SAMPLE_PROPERTIES = [
  {
    "id": 1,
    "slug": "luxury-villa-kyrenia",
    "title": "Luxury Sea View Villa",
    "location": "Kyrenia, Northern Cyprus",
    "price": "€850,000",
    "beds": 4,
    "baths": 3,
    "area": "320",
    "plotSize": "850",
    "reference": "CE-KYR-001",
    "image": "https://images.unsplash.com/photo-1694967832949-09984640b143?w=800&h=600&fit=crop",
    "tag": "NEW LISTING",
    "region": "KYRENIA"
  },
  {
    "id": 2,
    "slug": "penthouse-iskele",
    "title": "Modern Penthouse",
    "location": "Iskele, Northern Cyprus",
    "price": "€425,000",
    "beds": 3,
    "baths": 2,
    "area": "185",
    "image": "https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?w=800&h=600&fit=crop",
    "tag": "FOR SALE",
    "region": "ISKELE"
  },
  {
    "id": 3,
    "slug": "beachfront-apartment-famagusta",
    "title": "Beachfront Apartment",
    "location": "Famagusta, Northern Cyprus",
    "price": "€295,000",
    "beds": 2,
    "baths": 2,
    "area": "120",
    "image": "https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?w=800&h=600&fit=crop",
    "tag": "EXCLUSIVE",
    "region": "FAMAGUSTA"
  }
]

# Database Connection Helper
def get_db_connection():
    try:
        connection = pymysql.connect(
            host=os.environ.get('DB_HOST', 'localhost'),
            user=os.environ.get('DB_USER', 'root'),
            password=os.environ.get('DB_PASSWORD', ''),
            database=os.environ.get('DB_NAME', 'caria_db'),
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        return None

# Routes
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {"status": "online", "message": "Caria Estates API"}

@api_router.get("/properties")
async def get_properties():
    conn = get_db_connection()
    if not conn:
        logger.info("Using sample properties fallback (DB connection failed)")
        return SAMPLE_PROPERTIES
    
    try:
        with conn.cursor() as cursor:
            # Try to fetch from properties table
            try:
                cursor.execute("SELECT * FROM properties")
                rows = cursor.fetchall()
                if rows:
                    return rows
            except Exception as e:
                logger.warning(f"Error fetching from properties table: {e}")
        
        return SAMPLE_PROPERTIES
    finally:
        conn.close()

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get('PORT', 5001))
    uvicorn.run(app, host="0.0.0.0", port=port)