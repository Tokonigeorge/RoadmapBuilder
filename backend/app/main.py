from .road_map_generator import generate_roadmap, generate_resources
from typing import Dict, Any


from datetime import datetime
import json
from bson import ObjectId

from .models.roadmap import RoadmapFormData
from motor.motor_asyncio import AsyncIOMotorClient

from fastapi import FastAPI, APIRouter, HTTPException, Body, status
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os

from .utils import UserModel


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
roadmaps_collection = db["roadmaps"]
resources_collection = db["resources"]
users_collection = db["users"]


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
            resources_data = generate_resources(data)
            parsed_resources = json.loads(resources_data)

            #save to mongodb
            document = {
                "topic": parsed_resources.get("topic", ""),
                "resources": parsed_resources.get("resources", []),
                "metadata": data.dict(),
                "created_at":datetime.now(),
                "type":"resources"
            }

            result = await resources_collection.insert_one(document)
            doc_id = str(result.inserted_id)

            return {
                "status":"success",
                "message":"Resources created successfully",
                "roadmap": resources_data,
                "response_type": response_type,
                "_id":doc_id
            }
            
        else:
            response_type = "roadmap"
            roadmap_data = generate_roadmap(data)
            parsed_roadmap = json.loads(roadmap_data)

            document = {
                "topic": parsed_roadmap.get("topic", ""),
                "topics": parsed_roadmap.get("topics", []),
                "metadata":data.dict(),
                "created_at":datetime.now(),
                "type":"roadmap"
            }

            result = await roadmaps_collection.insert_one(document)
            doc_id = str(result.inserted_id)

            return {
                "status": "success",
                "message":"Roadmap created successfully",
                "roadmap":roadmap_data,
                "response_type":response_type,
                "_id": doc_id
            }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")
    

@api_router.get("/roadmap/{roadmap_id}", summary="Get roadmap by ID", response_description="Roadmap details")
async def get_roadmap(roadmap_id: str):
    try:
        
        roadmap =await roadmaps_collection.find_one({"_id": ObjectId(roadmap_id)})

        if not roadmap:
            raise HTTPException(status_code=404, detail=f"Roadmap with ID {roadmap_id} not found")
        
        #convert ObjectId to string for json serialization
        roadmap["_id"] = str(roadmap["_id"])
        return {"status":"success", "roadmap":roadmap}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch roadmap: {str(e)}")
    

@api_router.get("/resources/{resource_id}", summary="Get resources by ID", response_description="Resources details")
async def get_resources(resource_id: str):
    try:
        
        resources =await resources_collection.find_one({"_id": ObjectId(resource_id)})

        if not resources:
            raise HTTPException(status_code=404, detail=f"Roadmap with ID {resource_id} not found")
        
        #convert ObjectId to string for json serialization
        resources["_id"] = str(resources["_id"])
        return {"status":"success", "resources":resources}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch resources: {str(e)}")
    

@api_router.post("/user", summary="Save user", response_description="User saved successfully")
async def save_user(user_data: Dict[str, Any] = Body(...)):
    email = user_data.get("email")
    uid = user_data.get("uid")
    display_name = user_data.get("display_name")
    photo_url = user_data.get("photo_url")
    saved_resources = user_data.get("saved_resources", [])
    
    if not email or not uid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email and uid are required")
    
    #check if user already exists
    existing_user = await users_collection.find_one({"uid": uid})
    if existing_user:
        update_result = await users_collection.update_one(
            {"uid": uid},
            {"$set": {
                "email": email,
                "display_name": display_name,
                "photo_url": photo_url,
                "saved_resources": saved_resources
            }})
        
        if update_result.modified_count == 1:
            return {"status": "success", "message": "User updated successfully"}
        else:
            user = UserModel(email=email, uid=uid, display_name=display_name, photo_url=photo_url, saved_resources=saved_resources)
            new_user = await users_collection.insert_one(user.dict(by_alias=True))
            if new_user.inserted_id:
                return {"success": True, "message": "New user created"}
            
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to save user information")


@api_router.post("/save-resources", summary="Save resources", response_description="Resources saved successfully")
async def save_resources(resource_data: Dict[str, Any] = Body(...)):

    uid = resource_data.get("uid")
    resource_id = resource_data.get("resource_id")

    if not uid or not resource_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="UID and resource ID are required")
    
    #convert resource_id to ObjectId
    resource_id = ObjectId(resource_id)

    #find the user
    user = await users_collection.find_one({"uid": uid})
    if not user:
        new_user = {
            "uid": uid,
            "email": "",  
            "display_name": "", 
            "photo_url": "", 
            "saved_resources": []
        }
        await users_collection.insert_one(new_user)
        user = new_user
    
    #check if resource is already saved
    saved_resources = user.get("saved_resources", [])
    saved_resources_ids = [str(resource) for resource in saved_resources]

    if str(resource_id) not in saved_resources_ids:
        update_result = await users_collection.update_one(
            {"uid": uid},
            {"$addToSet": {"saved_resources": resource_id}}
        )

        if update_result.modified_count != 1:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save resource")
    
    
    updated_user = await users_collection.find_one({"uid": uid})
    return {"status": "success", "message": "Resource saved successfully", "saved_resources": [str(res) for res in updated_user.get("saved_resources", [])]}


@api_router.delete("/save-resources", summary="Delete saved resource", response_description="Resource deleted successfully")
async def delete_saved_resource(resource_data: Dict[str, Any] = Body(...)):
    uid = resource_data.get("uid")
    resource_id = resource_data.get("resource_id")

    if not uid or not resource_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="UID and resource ID are required")
    
    

    #find the user
    user = await users_collection.find_one({"uid": uid})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    try:
        resource_id_obj = ObjectId(resource_id)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid resource ID format")
    # Remove the resource from saved_resources
    update_result = await users_collection.update_one(
        {"uid": uid},
        {"$pull": {"saved_resources": resource_id_obj}}
    )
    
    if update_result.modified_count != 1:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found in saved resources")
    
    updated_user = await users_collection.find_one({"uid": uid})
    return {
        "status": "success", 
        "message": "Resource removed successfully", 
        "saved_resources": [str(res) for res in updated_user.get("saved_resources", [])]
    }
    
@api_router.get("/check-saved-resource", summary="Check if resource is saved", response_description="Resource saved status")
async def check_saved_resource(uid: str, resource_id: str):
    if not uid or not resource_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="UID and resource ID are required")
    
    # Find the user
    user = await users_collection.find_one({"uid": uid})
    if not user:
        return {"isSaved": False}
    
    # Convert resource_id to ObjectId
    try:
        resource_id_obj = ObjectId(resource_id)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid resource ID format")
    
    # Check if resource is in saved_resources
    saved_resources = user.get("saved_resources", [])
    is_saved = resource_id_obj in saved_resources
    
    return {"isSaved": is_saved}   
    
    
    
@api_router.get("/saved-resources/{uid}", response_description="Get user's saved resources")
async def get_saved_resources(uid: str):
    if not uid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="User ID is required"
        )
    
    # Find the user
    user = await users_collection.find_one({"uid": uid})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found"
        )
    
    # Get the saved resources

    saved_resource_ids = user.get("saved_resources", [])
    resources = []
    
    async for resource in resources_collection.find({"_id": {"$in": saved_resource_ids}}):
        resources.append({
            "_id": str(resource["_id"]),
            "title": resource.get("title", ""),
            "url": resource.get("url", ""),
            "topic": resource.get("topic", "")
        })
    
    return {"success": True, "resources": resources}   
        
@api_router.post("/save-roadmap", summary="Save roadmap", response_description="Roadmap saved successfully")
async def save_roadmap(roadmap_data: Dict[str, Any] = Body(...)):
    uid = roadmap_data.get("uid")
    roadmap_id = roadmap_data.get("roadmap_id")

    if not uid or not roadmap_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="UID and roadmap ID are required")
    
    # Convert roadmap_id to ObjectId
    roadmap_id = ObjectId(roadmap_id)

    # Find the user
    user = await users_collection.find_one({"uid": uid})
    if not user:
        new_user = {
            "uid": uid,
            "email": "",  
            "display_name": "", 
            "photo_url": "", 
            "saved_resources": [],
            "saved_roadmaps": []
        }
        await users_collection.insert_one(new_user)
        user = new_user
    
    # Check if roadmap is already saved
    saved_roadmaps = user.get("saved_roadmaps", [])
    saved_roadmaps_ids = [str(roadmap) for roadmap in saved_roadmaps]

    if str(roadmap_id) not in saved_roadmaps_ids:
        update_result = await users_collection.update_one(
            {"uid": uid},
            {"$addToSet": {"saved_roadmaps": roadmap_id}}
        )

        if update_result.modified_count != 1:  
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save roadmap")
    
    updated_user = await users_collection.find_one({"uid": uid})
    return {
        "status": "success", 
        "message": "Roadmap saved successfully", 
        "saved_roadmaps": [str(rm) for rm in updated_user.get("saved_roadmaps", [])]
    }

@api_router.delete("/save-roadmap", summary="Delete saved roadmap", response_description="Roadmap deleted successfully")
async def delete_saved_roadmap(roadmap_data: Dict[str, Any] = Body(...)):
    uid = roadmap_data.get("uid")
    roadmap_id = roadmap_data.get("roadmap_id")

    if not uid or not roadmap_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="UID and roadmap ID are required")
    
    # Find the user
    user = await users_collection.find_one({"uid": uid})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    try:
        roadmap_id_obj = ObjectId(roadmap_id)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid roadmap ID format")
    
    # Remove the roadmap from saved_roadmaps
    update_result = await users_collection.update_one(
        {"uid": uid},
        {"$pull": {"saved_roadmaps": roadmap_id_obj}}
    )
    
    if update_result.modified_count != 1:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Roadmap not found in saved roadmaps")
    
    updated_user = await users_collection.find_one({"uid": uid})
    return {
        "status": "success", 
        "message": "Roadmap removed successfully", 
        "saved_roadmaps": [str(rm) for rm in updated_user.get("saved_roadmaps", [])]
    }

@api_router.get("/check-saved-roadmap", summary="Check if roadmap is saved", response_description="Roadmap saved status")
async def check_saved_roadmap(uid: str, roadmap_id: str):
    if not uid or not roadmap_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="UID and roadmap ID are required")
    
    # Find the user
    user = await users_collection.find_one({"uid": uid})
    if not user:
        return {"isSaved": False}
    
    # Convert roadmap_id to ObjectId
    try:
        roadmap_id_obj = ObjectId(roadmap_id)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid roadmap ID format")
    
    # Check if roadmap is in saved_roadmaps
    saved_roadmaps = user.get("saved_roadmaps", [])
    is_saved = roadmap_id_obj in saved_roadmaps
    
    return {"isSaved": is_saved}

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
