from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])
auth_service = AuthService()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return auth_service.register(
        db,
        user.username,
        user.email,
        user.password,
        user.role
    )

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    logged_user = auth_service.login(db, user.email, user.password)
    if not logged_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return logged_user
