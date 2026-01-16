import datetime
from pydantic import BaseModel, EmailStr

from pydantic import BaseModel

class HistoryBase(BaseModel):
    question_id: int
    given_answer: str
    is_correct: bool
    time_spent_seconds: int

class HistoryResponse(HistoryBase):
    id: int
    user_id: int
    solved_at: datetime
    class Config:
        from_attributes = True