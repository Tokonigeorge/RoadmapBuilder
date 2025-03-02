from .road_map_generator import generate_roadmap
from .models import RoadmapFormData

from fastapi import FastAPI, APIRouter, HTTPException
import uvicorn
from fastapi.middleware.cors import CORSMiddleware




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
        roadmap = generate_roadmap(data)
        return {"status": "success", "message": "Roadmap created successfully", "roadmap": roadmap}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

# Include the router in the app
app.include_router(api_router)

if __name__ == "__main__":
    # Run the app using uvicorn when script is executed directly
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
