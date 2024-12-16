from transformers import AutoModelForCausalLM, AutoTokenizer

class AppState: 
    model: AutoModelForCausalLM = None
    tok: AutoTokenizer = None

    def set_model(self, model: AutoModelForCausalLM):
        self.model = model

    def set_tok(self, tok: AutoTokenizer):
        self.tok = tok

state = AppState()
