
from pydantic import BaseModel, EmailStr

from pydantic import BaseModel
from typing import Optional


class LessonBase(BaseModel):
    title: str
    description: Optional[str] = None
    difficulty: str = "medium"

class LessonResponse(LessonBase):
    id: int
    class Config:
        from_attributes = True