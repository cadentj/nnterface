from pydantic import BaseModel

class ModelList(BaseModel):
    base: list[str]
    chat: list[str]

class Models(BaseModel):
    local: ModelList
    remote: ModelList

class Config(BaseModel):
    models: Models

