from fastapi import FastAPI

app = FastAPI(
    title="Personalized Learning Platform Backend",
    version="1.0.0",
    description="Backend API for AI-powered personalized learning system"
)

@app.get("/")
def root():
    return {
        "status": "OK",
        "message": "Backend is running successfully"
    }
