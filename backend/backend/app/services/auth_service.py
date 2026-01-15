from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories.user_repository import UserRepository

class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()

    def register(self, db: Session, username, email, password, role):
        user = User(
            username=username,
            email=email,
            password=password,  # şimdilik plain, sonra hashleriz
            role=role
        )
        return self.user_repo.create(db, user)

    def login(self, db: Session, email, password):
        user = self.user_repo.get_by_email(db, email)
        if not user or user.password != password:
            return None
        return user
