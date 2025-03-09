from pydantic import BaseModel
from typing import Optional

class RoadmapFormData(BaseModel):
    learningTopic: str
    timeCommitment: Optional[str] = None
    frequency: Optional[str] = None
    timeFrame: Optional[str] = None
    visual: Optional[bool] = False
    auditory: Optional[bool] = False
    kinesthetic: Optional[bool] = False