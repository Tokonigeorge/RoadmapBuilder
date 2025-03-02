from fastapi import FastAPI, APIRouter
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

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

class RoadmapFormData(BaseModel):
    learningTopic: str
    timeCommitment: str
    frequency: str
    timeFrame: str
    # deadline: str
    # visual: Optional[bool] = False
    # auditory: Optional[bool] = False
    # kinesthetic: Optional[bool] = False

# Define the root endpoint
@api_router.get("/", summary="Root endpoint", response_description="Welcome message")
async def root():
    return {"message": "Hello World from RoadmapBuilder API!"}

@api_router.get("/test", summary="Test endpoint", response_description="Test message")
async def test():
    return {"message": "Hello World from RoadmapBuilder API!"}

@api_router.post("/roadmap", summary="Create a new roadmap", response_description="Roadmap created successfully")
async def create_roadmap(data: RoadmapFormData):
    print("received data: ", data.dict())
    return {"status": "success", "message": "Roadmap created successfully", "data": data}

# Include the router in the app
app.include_router(api_router)

if __name__ == "__main__":
    # Run the app using uvicorn when script is executed directly
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
