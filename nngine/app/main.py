from fastapi import FastAPI
from ray import serve

from .model import ModelDeployment
from .core.schema import NNsightRequestModel

app = FastAPI()


@serve.deployment
@serve.ingress(app)
class FastAPIDeployment:
    def __init__(self, *models):
        self.models = models

    # FastAPI will automatically parse the HTTP request for us.
    @app.get("/hello")
    def say_hello(self, name: str) -> str:
        return f"Hello {name}!"
    
    @app.post("/code")
    async def remote(self, request: NNsightRequestModel):
        return await serve.get_deployment_handle(request.model).remote(request)
    
model_names = [
    "openai-community/gpt2",
    "Qwen/Qwen2.5-0.5B-Instruct"
]

models = [
    ModelDeployment.options(name=model).bind(model)
    for model in model_names
]

head = FastAPIDeployment.bind(models)