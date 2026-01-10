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
    "price": "£850,000",
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
    "price": "£425,000",
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
    "price": "£295,000",
    "beds": 2,
    "baths": 2,
    "area": "120",
    "image": "https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?w=800&h=600&fit=crop",
    "tag": "EXCLUSIVE",
    "region": "FAMAGUSTA"
  },
  {
    "id": 4,
    "slug": "mediterranean-villa-kyrenia",
    "title": "Mediterranean Villa",
    "location": "Kyrenia, Northern Cyprus",
    "price": "£1,250,000",
    "beds": 5,
    "baths": 4,
    "area": "450",
    "image": "https://images.unsplash.com/photo-1728049006363-f8e583040180?w=800&h=600&fit=crop",
    "tag": "PREMIUM",
    "region": "KYRENIA"
  },
  {
    "id": 5,
    "slug": "coastal-residence-iskele",
    "title": "Coastal Residence",
    "location": "Iskele, Northern Cyprus",
    "price": "£520,000",
    "beds": 3,
    "baths": 3,
    "area": "210",
    "image": "https://images.unsplash.com/photo-1760611655987-d348d6d28174?w=800&h=600&fit=crop",
    "tag": "NEW LISTING",
    "region": "ISKELE"
  },
  {
    "id": 6,
    "slug": "luxury-duplex-famagusta",
    "title": "Luxury Duplex",
    "location": "Famagusta, Northern Cyprus",
    "price": "£680,000",
    "beds": 4,
    "baths": 3,
    "area": "280",
    "image": "https://images.unsplash.com/photo-1714495412938-addb0ed62c1e?w=800&h=600&fit=crop",
    "tag": "FOR SALE",
    "region": "FAMAGUSTA"
  },
  {
    "id": 7,
    "slug": "elite-villa-esentepe",
    "title": "Elite Hillside Villa",
    "location": "Esentepe, Northern Cyprus",
    "price": "£1,850,000",
    "beds": 6,
    "baths": 5,
    "area": "580",
    "image": "https://images.unsplash.com/photo-1649678356183-54f92839e53b?w=800&h=600&fit=crop",
    "tag": "LUXURY",
    "region": "KYRENIA"
  },
  {
    "id": 8,
    "slug": "oceanfront-mansion-kyrenia",
    "title": "Oceanfront Mansion",
    "location": "Kyrenia, Northern Cyprus",
    "price": "£2,400,000",
    "beds": 7,
    "baths": 6,
    "area": "720",
    "image": "https://images.unsplash.com/photo-1763656259774-cbb145e9b4d3?w=800&h=600&fit=crop",
    "tag": "EXCLUSIVE",
    "region": "KYRENIA"
  },
  {
    "id": 9,
    "slug": "designer-penthouse-iskele",
    "title": "Designer Penthouse",
    "location": "Iskele, Northern Cyprus",
    "price": "£890,000",
    "beds": 4,
    "baths": 3,
    "area": "310",
    "image": "https://images.unsplash.com/photo-1738168273959-952fdc961991?w=800&h=600&fit=crop",
    "tag": "NEW",
    "region": "ISKELE"
  },
  {
    "id": 10,
    "slug": "garden-villa-famagusta",
    "title": "Garden Villa Estate",
    "location": "Famagusta, Northern Cyprus",
    "price": "£1,100,000",
    "beds": 5,
    "baths": 4,
    "area": "420",
    "image": "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=800&h=600&fit=crop",
    "tag": "PREMIUM",
    "region": "FAMAGUSTA"
  },
  {
        "id": 11,
        "slug": "luxury-villa-ozankoy-494383",
        "title": "Girne Ozanköy'de 4+1 Özel Tasarım Lüks Villa",
        "location": "Ozankoy, Kyrenia",
        "price": "£1,160,000",
        "beds": 4,
        "baths": 4,
        "area": "308",
        "image": "/assets/images/properties/prop-11/image-0.jpeg",
        "tag": "NEW LISTING",
        "region": "KYRENIA"
    },
  {
    "id": 12,
    "slug": "modern-villa-esentepe-494123",
    "title": "Modern Sea View Villa",
    "location": "Esentepe, Kyrenia",
    "price": "£525,000",
    "beds": 3,
    "baths": 2,
    "area": "180",
    "image": "/assets/images/properties/coming-soon.png",
    "tag": "NEW LISTING",
    "region": "KYRENIA"
    },
  {
        "id": 13,
        "slug": "sea-view-studio-long-beach-494120",
        "title": "Long Beach Grand Sapphire Studio Apartment",
        "location": "Long Beach, Iskele",
        "price": "£95,000",
        "beds": 0,
        "baths": 1,
        "area": "45",
        "image": "/assets/images/properties/prop-13/image-0.jpeg",
        "tag": "NEW LISTING",
        "region": "ISKELE"
    },
  {
    "id": 14,
    "slug": "luxury-studio-long-beach-491211",
    "title": "Luxury Resort Studio",
    "location": "Long Beach, Iskele",
    "price": "£99,000",
    "beds": 0,
    "baths": 1,
    "area": "48",
    "image": "/assets/images/properties/coming-soon.png",
    "tag": "NEW LISTING",
    "region": "ISKELE"
    },
  {
        "id": 15,
        "slug": "contemporary-villa-dogankoy-494379",
        "title": "Dogankoy Contemporary 3-Bed Villa",
        "location": "Dogankoy, Kyrenia",
        "price": "£475,000",
        "beds": 3,
        "baths": 3,
        "area": "210",
        "image": "/assets/images/properties/prop-15/image-0.jpeg",
        "tag": "NEW LISTING",
        "region": "KYRENIA"
    },
  {
    "id": 16,
    "slug": "scenic-flat-esentepe-459983",
    "title": "Scenic 1+1 Flat",
    "location": "Esentepe, Kyrenia",
    "price": "£140,000",
    "beds": 1,
    "baths": 1,
    "area": "65",
    "image": "/assets/images/properties/coming-soon.png",
    "tag": "NEW LISTING",
    "region": "KYRENIA"
    },
  {
        "id": 17,
        "slug": "private-villa-catalkoy-482100",
        "title": "Catalkoy Garden Villa",
        "location": "Catalkoy, Kyrenia",
        "price": "£260,000",
        "beds": 2,
        "baths": 2,
        "area": "200",
        "image": "/assets/images/properties/prop-17/image-0.jpg",
        "tag": "NEW LISTING",
        "region": "KYRENIA"
    },
  {
    "id": 18,
    "slug": "modern-villa-yeni-bogazici-491329",
    "title": "Modern 3-Bed Villa",
    "location": "Yeni Bogazici, Famagusta",
    "price": "£264,500",
    "beds": 3,
    "baths": 2,
    "area": "210",
    "image": "/assets/images/properties/coming-soon.png",
    "tag": "NEW LISTING",
    "region": "FAMAGUSTA"
    },
  {
        "id": 19,
        "slug": "seafront-flat-gaziveren-451390",
        "title": "Gaziveren Seafront Flat - Dedeman Concept",
        "location": "Gaziveren, Lefke",
        "price": "£149,100",
        "beds": 1,
        "baths": 1,
        "area": "61",
        "image": "/assets/images/properties/prop-19/image-0.jpeg",
        "tag": "NEW LISTING",
        "region": "FAMAGUSTA"
    },
  {
    "id": 20,
    "slug": "exclusive-villa-edremit-phoenix",
    "title": "High-End Luxury Villa",
    "location": "Edremit, Kyrenia",
    "price": "£500,000",
    "beds": 3,
    "baths": 3,
    "area": "220",
    "image": "/assets/images/properties/coming-soon.png",
    "tag": "NEW LISTING",
    "region": "KYRENIA"
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
    # Force use of SAMPLE_PROPERTIES to ensure consistency with the user requirement
    # while we sync the DB in the background
    return SAMPLE_PROPERTIES

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get('PORT', 5001))
    uvicorn.run(app, host="127.0.0.1", port=port)