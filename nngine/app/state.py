from typing import Dict, Any

import nnsight
from transformers import AutoModelForCausalLM, AutoTokenizer

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
    
    @property
    def globals(self) -> Dict[str, Any]:
        return {
            "nnsight": nnsight,
            "model": self.model,
        }

state: AppState = AppState()
