from fastapi import APIRouter

router = APIRouter(
    prefix="/hello",
    tags=["Hello"]
)

@router.get("/world")
def hello_world():
    return {"message": "Merhaba Dünya"}
