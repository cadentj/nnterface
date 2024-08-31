from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None

@app.post("/items")
async def create_item(item: Item):
    return {"message": f"Item created: {item.name}"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id, "name": "Example Item"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
