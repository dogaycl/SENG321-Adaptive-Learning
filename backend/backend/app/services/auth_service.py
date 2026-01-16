from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password, verify_password
from app.core.jwt import create_access_token

class AuthService:
    def __init__(self):
        self.user_repository = UserRepository()

    # ==========================
    # REGISTER (Kayıt Olma)
    # ==========================
    def register(self, db: Session, username, email, password, role):
        # Şifreyi hashle (güvenli hale getir)
        hashed_password_val = hash_password(password)
        
        # Kullanıcıyı oluştur (Repository'ye password=hashed_password olarak gönderiyoruz)
        user = User(
            username=username,
            email=email,
            password=hashed_password_val, # BURASI DÜZELDİ
            role=role
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    # ==========================
    # LOGIN (Giriş Yapma)
    # ==========================
    def login(self, db: Session, email: str, password: str):
        # 1. Kullanıcıyı bul
        user = self.user_repository.get_by_email(db, email)
        
        # 2. Kullanıcı yoksa veya şifre yanlışsa
        if not user or not verify_password(password, user.password):
            return None
        
        # 3. ŞİMDİ SİHİRLİ ANAHTARI (TOKEN) OLUŞTURUYORUZ
        access_token = create_access_token(data={"sub": user.email})
        
        # 4. Token'ı sözlük (dict) olarak döndür
        return {"access_token": access_token, "token_type": "bearer"}