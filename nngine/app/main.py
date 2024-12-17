from fastapi import FastAPI

from app.api import run, load_model, export, get_order, chat

app = FastAPI()

app.include_router(run.router, prefix="/run", tags=["Run"])
app.include_router(load_model.router, prefix="/load-model", tags=["Load Model"])
app.include_router(export.router, prefix="/code", tags=["code"])
app.include_router(get_order.router, prefix="/get-order", tags=["Get Order"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
