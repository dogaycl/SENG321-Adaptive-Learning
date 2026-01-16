from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.history import HistoryCreate, HistoryResponse
from app.services.history_service import HistoryService

router = APIRouter(prefix="/history", tags=["Student History"])
history_service = HistoryService()

@router.post("/submit", response_model=HistoryResponse)
def submit_answer(history_data: HistoryCreate, user_id: int, db: Session = Depends(get_db)):
    # Not: Gerçek senaryoda user_id JWT token'dan alınmalıdır.
    try:
        return history_service.submit_answer(db, user_id, history_data)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/stats/{user_id}")
def get_student_stats(user_id: int, db: Session = Depends(get_db)):
    stats = history_service.get_user_stats(db, user_id)
    if not stats:
        raise HTTPException(status_code=404, detail="İstatistik bulunamadı")
    return stats
