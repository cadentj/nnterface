from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import run, export, get_order, chat, models


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(run.router, prefix="/run", tags=["Run"])
app.include_router(models.router, prefix="/models", tags=["Load and display models"])
app.include_router(export.router, prefix="/code", tags=["code"])
app.include_router(get_order.router, prefix="/get-order", tags=["Get Order"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
