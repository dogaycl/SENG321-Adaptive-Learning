
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.lessons import LessonCreate, LessonResponse
from app.services.lessons_service import LessonService
from typing import List
from app.core.security import check_admin_role

router = APIRouter(prefix="/lessons", tags=["Lessons"])
lesson_service = LessonService()

@router.post("/", response_model=LessonResponse)
def create_new_lesson(lesson: LessonCreate, db: Session = Depends(get_db)):
    return lesson_service.create_lesson(db, lesson)

@router.get("/", response_model=List[LessonResponse])
def get_all_lessons(db: Session = Depends(get_db)):
    return lesson_service.get_all_lessons(db)
@router.post("/", response_model=LessonResponse)

def create_new_lesson(lesson: LessonCreate, role: str, db: Session = Depends(get_db)):
    # Rol kontrolü yapılıyor
    check_admin_role(role)
    return lesson_service.create_lesson(db, lesson)

@router.put("/{lesson_id}", response_model=LessonResponse)
def update_lesson(lesson_id: int, lesson: LessonCreate, role: str, db: Session = Depends(get_db)):
    check_admin_role(role)
    return lesson_service.update_lesson(db, lesson_id, lesson)

@router.delete("/{lesson_id}")
def delete_lesson(lesson_id: int, role: str, db: Session = Depends(get_db)):
    check_admin_role(role)
    success = lesson_service.remove_lesson(db, lesson_id)
    if not success:
        raise HTTPException(status_code=404, detail="Ders bulunamadı")
    return {"message": "Ders başarıyla silindi"}
