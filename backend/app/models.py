from pydantic import BaseModel
from typing import Optional

class RoadmapFormData(BaseModel):
    learningTopic: str
    timeCommitment: str
    frequency: str
    timeFrame: str
    visual: Optional[bool] = False
    auditory: Optional[bool] = False
    kinesthetic: Optional[bool] = False