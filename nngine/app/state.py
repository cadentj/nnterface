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

    def set_model(self, model: AutoModelForCausalLM) -> None:
        self.model = model

    def set_tok(self, tok: AutoTokenizer) -> None:
        self.tok = tok

    def get_model(self) -> AutoModelForCausalLM:
        return self.model

    def get_tok(self) -> AutoTokenizer:
        return self.tok
    
    def __init__(self):
        self.config = load_config()

    @property 
    def local_models(self) -> list[str]:
        return self.config.models.local
    
    @property
    def remote_models(self) -> list[str]:
        return self.config.models.remote
    
    @property
    def globals(self) -> Dict[str, Any]:
        return {
            "nnsight": nnsight,
            "model": self.model,
        }

state: AppState = AppState()
