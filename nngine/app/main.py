from fastapi import FastAPI
from app.api import run, load_model, export

app = FastAPI()

# Include routers
app.include_router(run.router, prefix="/run", tags=["Run"])
app.include_router(load_model.router, prefix="/load-model", tags=["Load Model"])
app.include_router(export.router, prefix="/code", tags=["code"])