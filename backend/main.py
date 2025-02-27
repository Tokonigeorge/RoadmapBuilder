from fastapi import FastAPI, APIRouter
import uvicorn

# Create the FastAPI app with configuration
app = FastAPI(
    title="RoadmapBuilder API",
    description="API for building and managing roadmaps",
    version="0.1.0",
)

# Create a router for API endpoints
api_router = APIRouter()

# Define the root endpoint
@api_router.get("/", summary="Root endpoint", response_description="Welcome message")
async def root():
    return {"message": "Hello World from RoadmapBuilder API!"}

# Include the router in the app
app.include_router(api_router)

if __name__ == "__main__":
    # Run the app using uvicorn when script is executed directly
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
