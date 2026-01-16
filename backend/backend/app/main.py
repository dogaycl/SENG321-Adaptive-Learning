from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth,recommendation, lessons, questions,history
from app.core.database import engine, Base
from app.models import user

# FastAPI app TANIMI — ÖNCE BU
app = FastAPI(
    title="Adaptive Learning Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # TÜM domainler
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE, OPTIONS vs
    allow_headers=["*"],        # Authorization, Content-Type vs
)
# DİKKAT: Bu satır mevcut tabloları siler (Reset atar)
# Base.metadata.drop_all(bind=engine)  <-- BUNU KAPAT 

# Bu satır zaten vardı, tabloları yeniden oluşturur
Base.metadata.create_all(bind=engine)
# DB tablolarını oluştur
Base.metadata.create_all(bind=engine)

# Router'ları ekle
app.include_router(auth.router)
app.include_router(recommendation.router)
app.include_router(lessons.router)    
app.include_router(questions.router)
app.include_router(history.router)
# Test endpoint
@app.get("/")
def root():
    return {"status": "ok"}

# DB test endpoint
@app.get("/db-test")
def db_test():
    return {"db": "connected"}
# --- main.py dosyasının en altına (importları kontrol et) ---
from app.core.database import SessionLocal
from app.models.questions import Question
from app.models.lessons import Lesson  # <--- DERS MODELİNİ DE IMPORT ET
import json

@app.on_event("startup")
def seed_questions():
    db = SessionLocal()
    try:
        # 1. ÖNCE BİR DERS OLUŞTUR (Sorular buna bağlanacak)
        # seed_questions içinde Lesson oluşturduğumuz yer:
        if not db.query(Lesson).filter(Lesson.id == 1).first():
            lesson = Lesson(
                id=1, 
                title="React Temelleri"
                # content="..."           <-- Zaten silmiştik
                # difficulty_level="..."  <-- BUNU DA SİLİYORUZ, SORUN BU!
            )
            db.add(lesson)
            db.commit()
        # 2. ŞİMDİ SORULARI EKLE (lesson_id=1 diyerek)
        if not db.query(Question).filter(Question.id == 1).first():
            q1 = Question(
                id=1,
                lesson_id=1,   # <--- ARTIK BU ZORUNLU (Yukarıdaki derse bağlıyoruz)
                content="React'te 'State' değiştiğinde ne olur?", # 'text' yerine 'content' yaptık!
                correct_answer="Bileşen tekrar render edilir",
                options=json.dumps(["Sayfa yenilenir", "Bileşen tekrar render edilir", "Veritabanı silinir", "Hiçbir şey olmaz"])
            )
            db.add(q1)
        
        if not db.query(Question).filter(Question.id == 2).first():
            q2 = Question(
                id=2,
                lesson_id=1,
                content="Hangi Hook bir bileşenin yaşam döngüsünü (Lifecycle) yönetir?",
                correct_answer="useEffect",
                options=json.dumps(["useState", "useEffect", "useRef", "useCallback"])
            )
            db.add(q2)

        if not db.query(Question).filter(Question.id == 3).first():
            q3 = Question(
                id=3,
                lesson_id=1,
                content="JSX nedir?",
                correct_answer="JavaScript içinde HTML yazmayı sağlayan sözdizimi uzantısıdır",
                options=json.dumps(["Bir veritabanı türüdür", "JavaScript içinde HTML yazmayı sağlayan sözdizimi uzantısıdır", "Sunucu taraflı bir dildir"])
            )
            db.add(q3)
        
        db.commit()
        print("✅ Ders ve Sorular veritabanına başarıyla eklendi!")
    except Exception as e:
        print(f"⚠️ Veri ekleme hatası: {e}")
    finally:
        db.close()