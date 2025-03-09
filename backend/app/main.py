from app.road_map_generator import generate_roadmap, generate_resources
from app.models import RoadmapFormData
from motor.motor_asyncio import AsyncIOMotorClient

from fastapi import FastAPI, APIRouter, HTTPException
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os


load_dotenv()
# Create the FastAPI app with configuration
app = FastAPI(
    title="RoadmapBuilder API",
    description="API for building and managing roadmaps",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust based on your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a router for API endpoints
# api_router = APIRouter()

# Create a router for API endpoints with versioning
api_router = APIRouter(prefix="/api/v1")

# MongoDB Configuration
MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
MONGODB_CLUSTER = os.getenv("MONGODB_CLUSTER", "metadata.oj7wh.mongodb.net")
MONGO_URI = f"mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@{MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=metadata&tls=true"
DB_NAME = "roadmap_db"
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
topics_collection = db["topics"]


# Define the root endpoint
@api_router.get("/", summary="Root endpoint", response_description="Welcome message")
async def root():
    return {"message": "Hello Worlddd from RoadmapBuilder API!"}

@api_router.get("/test", summary="Test endpoint", response_description="Test message")
async def test():
    return {"message": "Hello World from RoadmapBuilder API!"}

@api_router.post("/roadmap", summary="Create a new roadmap", response_description="Roadmap created successfully")
async def create_roadmap(data: RoadmapFormData):
    try:
        if not data.timeFrame:
            response_type = "resources"
            roadmap = generate_resources(data)
            
        else:
            response_type = "roadmap"
            roadmap = generate_roadmap(data)

        return {"status": "success", "message": "Roadmap created successfully", "roadmap": roadmap, "response_type": response_type}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")
    

@api_router.post("/topic", summary="Add a new topic", response_description="Topic added successfully")
async def add_topic(topic_data: RoadmapFormData):
    topic = topic_data.learningTopic.strip()
    if not topics_collection.find_one({"name": topic}):
        topics_collection.insert_one({"name": topic})
    return {"message": "Topic added"}

@api_router.get("/topics", summary="Get all topics", response_description="All topics")
async def get_topics():
    try:
        topics_list =  topics_collection.find({}, {"_id": 0, "name": 1})
        topics = await topics_list.to_list(length=None)
        return {"status": "success", "message": "Topics fetched successfully", "topics": topics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch topics: {str(e)}")

# Include the router in the app
app.include_router(api_router)

if __name__ == "__main__":
    # Run the app using uvicorn when script is executed directly
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
