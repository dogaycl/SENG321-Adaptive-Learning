from sqlalchemy.orm import Session
from app.models.lessons import Lesson

class LessonRepository:
    def get_all(self, db: Session):
        return db.query(Lesson).all()

    def get_by_id(self, db: Session, lesson_id: int):
        return db.query(Lesson).filter(Lesson.id == lesson_id).first()

    def create(self, db: Session, lesson: Lesson):
        db.add(lesson)
        db.commit()
        db.refresh(lesson)
        return lesson