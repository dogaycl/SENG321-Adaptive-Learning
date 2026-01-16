from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth
from app.core.database import engine, Base
from app.models import user

# FastAPI app TANIMI — ÖNCE BU
app = FastAPI(
    title="Adaptive Learning Backend",
    version="1.0.0"
)

# 🔥 GLOBAL CORS — HER ŞEYE AÇIK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # TÜM domainler
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE, OPTIONS vs
    allow_headers=["*"],        # Authorization, Content-Type vs
)

# DB tablolarını oluştur
Base.metadata.create_all(bind=engine)

# Router'ları ekle
app.include_router(auth.router)

# Test endpoint
@app.get("/")
def root():
    return {"status": "ok"}

# DB test endpoint
@app.get("/db-test")
def db_test():
    return {"db": "connected"}
