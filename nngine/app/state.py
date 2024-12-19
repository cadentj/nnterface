from typing import Dict, Any
import toml
import os

import nnsight
from transformers import AutoModelForCausalLM, AutoTokenizer

from app.schemas.config import Config

def load_config():
    current_dir = os.path.dirname(os.path.abspath(__file__))

    with open(os.path.join(current_dir, "../../config.toml"), "r") as f:
        data = toml.load(f)
        config = Config(**data)

    return config


class AppState: 
    model: AutoModelForCausalLM = None
    tok: AutoTokenizer = None
    repo_id: str = None
    
    def __init__(self):
        self.config = load_config()

    @property 
    def local_models(self) -> list[str]:
        return self.config.models.local
    
    @property
    def remote_models(self) -> list[str]:
        return self.config.models.remote
    
    @property
    def model_type(self) -> str:
        return self.config.model
    
    @property
    def is_remote(self) -> bool:
        return self.repo_id in self.remote_models
    
    def check_is_remote(self, repo_id: str) -> bool:
        return repo_id in self.remote_models
    
    @property
    def is_chat(self) -> bool:
        return (
            self.repo_id in self.config.models.remote.chat
            or self.repo_id in self.config.models.local.chat
        )
    
    @property
    def globals(self) -> Dict[str, Any]:
        return {
            "nnsight": nnsight,
            "model": self.model,
        }

state: AppState = AppState()
