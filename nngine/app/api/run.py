from fastapi import APIRouter
from app.core.compile import compile

router = APIRouter()

@router.get("/")
def run():
    return {"message": "Hello, World!"}
