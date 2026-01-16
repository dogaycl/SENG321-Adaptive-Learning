from fastapi import FastAPI
from app.api.routes import auth
from app.core.database import engine
from app.models import user
from app.core.database import Base

# FastAPI app TANIMI — ÖNCE BU
app = FastAPI(
    title="Adaptive Learning Backend",
    version="1.0.0"
)

# DB tablolarını oluştur
Base.metadata.create_all(bind=engine)

# Router'ları ekle
app.include_router(auth.router, prefix="/auth", tags=["auth"])

# Test endpoint
@app.get("/")
def root():
    return {"status": "ok"}

# DB test endpoint
@app.get("/db-test")
def db_test():
    return {"db": "connected"}
