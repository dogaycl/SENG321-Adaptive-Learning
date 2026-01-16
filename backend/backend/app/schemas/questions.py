
from pydantic import BaseModel, EmailStr

from pydantic import BaseModel
class QuestionBase(BaseModel):
    lesson_id: int
    content: str
    correct_answer: str
    difficulty_level: int

class QuestionResponse(QuestionBase):
    id: int
    class Config:
        from_attributes = True