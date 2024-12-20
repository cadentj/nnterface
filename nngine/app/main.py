from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import run, export, models, tools


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
app.include_router(tools.router, prefix="/tools", tags=["Tools"])
