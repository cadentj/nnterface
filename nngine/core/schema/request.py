from typing import Literal

from pydantic import BaseModel, model_validator

from ..compile import Graph

class NNsightRequestModel(BaseModel):
    op: Literal["code", "run", "chat"]
    graph: Graph

class ModelConfigModel(BaseModel):
    repo_id: str

    @model_validator(mode='after')
    def validate_repo_id(self):
        self.repo_id = self.repo_id.replace("/", "_")