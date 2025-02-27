from fastapi import FastAPI

# Create the FastAPI application instance
app = FastAPI(
    title="RoadmapBuilder API",
    description="API for creating and managing roadmaps",
    version="0.1.0"
)

@app.get("/")
def read_root():
    """
    Root endpoint that returns a welcome message.
    """
    return {"message": "Welcome to RoadmapBuilder API"}

# For directly running the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

