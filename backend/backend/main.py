from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

# App Components
from app.api.routes import auth, recommendation, lessons, questions, history
from app.core.database import engine, Base, SessionLocal
from app.models.user import User
from app.models.questions import Question
from app.models.lessons import Lesson
from app.core.security import get_password_hash

# FastAPI App Definition
app = FastAPI(
    title="Adaptive Learning Backend",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Include Routers
app.include_router(auth.router)
app.include_router(recommendation.router)
app.include_router(lessons.router)    
app.include_router(questions.router)
app.include_router(history.router)

@app.on_event("startup")
def seed_data():
    """Populates the database with sample data when the app starts."""
    db = SessionLocal()
    try:
        # --- 1. CREATE DEMO STUDENT ---
        # Fixed to include 'username' and 'role' required by your MySQL schema
        if not db.query(User).filter(User.email == "student@demo.com").first():
            demo_user = User(
                username="demostudent",
                email="student@demo.com",
                password=get_password_hash("123456"),
                role="student"
            )
            db.add(demo_user)
            db.commit()
            print("👤 Demo User Created: student@demo.com / 123456")

        # --- 2. CREATE LESSON ---
        if not db.query(Lesson).filter(Lesson.id == 1).first():
            lesson = Lesson(
                id=1, 
                title="React Basics"
            )
            db.add(lesson)
            db.commit()
            print("📚 Sample Lesson Created.")

        # --- 3. ADD QUESTIONS ---
        if not db.query(Question).filter(Question.id == 1).first():
            q1 = Question(
                id=1,
                lesson_id=1,
                content="What happens when 'State' changes in React?",
                correct_answer="The component re-renders",
                options=json.dumps(["Page refreshes", "The component re-renders", "Database is deleted", "Nothing happens"])
            )
            db.add(q1)

        if not db.query(Question).filter(Question.id == 2).first():
            q2 = Question(
                id=2,
                lesson_id=1,
                content="Which Hook manages a component's lifecycle?",
                correct_answer="useEffect",
                options=json.dumps(["useState", "useEffect", "useRef", "useCallback"])
            )
            db.add(q2)

        if not db.query(Question).filter(Question.id == 3).first():
            q3 = Question(
                id=3,
                lesson_id=1,
                content="What is JSX?",
                correct_answer="A syntax extension that allows writing HTML in JavaScript",
                options=json.dumps(["A type of database", "A syntax extension that allows writing HTML in JavaScript", "A server-side language"])
            )
            db.add(q3)
        
        db.commit()
        print("✅ All seed data loaded successfully!")

    except Exception as e:
        print(f"⚠️ Seeding error: {e}")
        db.rollback()
    finally:
        db.close()

# Test Endpoints
@app.get("/")
def root():
    return {"status": "ok", "message": "Backend is running"}

@app.get("/db-test")
def db_test():
    return {"db": "connected"}