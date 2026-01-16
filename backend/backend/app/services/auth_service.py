from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.models.user import User
from app.core.security import hash_password, verify_password
from app.core.jwt import create_access_token
from app.core.security import hash_password, verify_password



class AuthService:
    def __init__(self):
        self.user_repository = UserRepository()

    # ======================
    # REGISTER (password hashed)
    # ======================
    def register(self, db: Session, email: str, password: str, role: str):
        existing_user = self.user_repository.get_by_email(db, email)
        if existing_user:
            raise ValueError("User already exists")

        hashed_password = hash_password(password)

        user = User(
        email=email,
        password=hashed_password,
        role=role
    )
        return self.user_repository.create(db, user)


    
    # ======================
    # LOGIN
    # ======================
    def login(self, db: Session, email: str, password: str):
        user = self.user_repository.get_by_email(db, email)

        if not user:
            return None

        if not verify_password(password, user.password):
            return None

        access_token = create_access_token(
            data={
                "sub": user.email,
                "role": user.role
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
