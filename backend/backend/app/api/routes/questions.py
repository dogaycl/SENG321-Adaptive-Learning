
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.questions import QuestionCreate, QuestionResponse
from app.services.questions_service import QuestionService
from typing import List
from app.core.security import check_admin_role

router = APIRouter(prefix="/questions", tags=["Questions"])
question_service = QuestionService()

@router.post("/", response_model=QuestionResponse)
def add_question(question: QuestionCreate, db: Session = Depends(get_db)):
    return question_service.add_question_to_lesson(db, question)

@router.get("/lesson/{lesson_id}", response_model=List[QuestionResponse])
def get_questions_by_lesson(lesson_id: int, db: Session = Depends(get_db)):
    return question_service.get_lesson_questions(db, lesson_id)

@router.post("/", response_model=QuestionResponse)
def add_question(question: QuestionCreate, role: str, db: Session = Depends(get_db)):
    # Rol kontrolü: Sadece admin/teacher soru ekleyebilir
    check_admin_role(role)
    return question_service.add_question_to_lesson(db, question)
