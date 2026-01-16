from sqlalchemy.orm import Session
from app.models.questions import Question

class QuestionRepository:
    def get_questions_by_lesson(self, db: Session, lesson_id: int):
        return db.query(Question).filter(Question.lesson_id == lesson_id).all()

    def get_by_id(self, db: Session, question_id: int):
        return db.query(Question).filter(Question.id == question_id).first()

    def create(self, db: Session, question: Question):
        db.add(question)
        db.commit()
        db.refresh(question)
        return question