import pymysql
import os
from dotenv import load_dotenv
import json

load_dotenv()

def init_db():
    try:
        connection = pymysql.connect(
            host=os.environ.get('DB_HOST', 'localhost'),
            user=os.environ.get('DB_USER', 'root'),
            password=os.environ.get('DB_PASSWORD', ''),
            database=os.environ.get('DB_NAME', 'caria_db'),
            cursorclass=pymysql.cursors.DictCursor
        )
        with connection.cursor() as cursor:
            # Create properties table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS properties (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    slug VARCHAR(255) UNIQUE,
                    title VARCHAR(255),
                    location VARCHAR(255),
                    price VARCHAR(50),
                    beds INT,
                    baths INT,
                    area VARCHAR(50),
                    plotSize VARCHAR(50),
                    reference VARCHAR(50),
                    image TEXT,
                    tag VARCHAR(50),
                    region VARCHAR(50),
                    description TEXT,
                    features TEXT
                )
            """)
            
            # Check if empty
            cursor.execute("SELECT COUNT(*) as count FROM properties")
            if cursor.fetchone()['count'] == 0:
                print("Seeding properties...")
                properties = [
                  {
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
                    "region": "KYRENIA",
                    "description": "Premium villa with sea views.",
                    "features": "Pool, Garden, automation"
                  },
                  {
                    "slug": "penthouse-iskele",
                    "title": "Modern Penthouse",
                    "location": "Iskele, Northern Cyprus",
                    "price": "€425,000",
                    "beds": 3,
                    "baths": 2,
                    "area": "185",
                    "plotSize": "0",
                    "reference": "CE-ISK-002",
                    "image": "https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?w=800&h=600&fit=crop",
                    "tag": "FOR SALE",
                    "region": "ISKELE",
                    "description": "Modern penthouse.",
                    "features": "Sea view, Terrace"
                  }
                ]
                for p in properties:
                    cursor.execute("""
                        INSERT INTO properties (slug, title, location, price, beds, baths, area, plotSize, reference, image, tag, region, description, features)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (p['slug'], p['title'], p['location'], p['price'], p['beds'], p['baths'], p['area'], p['plotSize'], p['reference'], p['image'], p['tag'], p['region'], p['description'], p['features']))
                connection.commit()
                print("Seeding completed.")
        connection.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    init_db()
