from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])
auth_service = AuthService()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    created_user = auth_service.register(
        db=db,
        email=user.email,
        password=user.password,
        role=user.role
    )

    if not created_user:
        raise HTTPException(status_code=409, detail="User already exists")

    return {
        "id": created_user.id,
        "email": created_user.email,
        "role": created_user.role
    }


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    result = auth_service.login(db, user.email, user.password)

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return result
