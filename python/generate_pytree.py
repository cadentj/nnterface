# %%

import json

import torch
from nnsight import LanguageModel

repo_id = 'gpt2'
model = LanguageModel(repo_id)

# %%

def get_type(module):
    return "ModuleList" if isinstance(module, torch.nn.ModuleList) else "Module"

def generate_pytree(module, path=''):
    pytree = {
        "name": path if path else module.__class__.__name__,
        "type": get_type(module),
        "submodules": []
    }

    for name, submodule in module.named_children():
        _name = path + '.' + name if path else name

        pytree["submodules"].append(
            generate_pytree(submodule, _name)
        )

    # If there are no submodules, return the "name" and "type" only.
    if not pytree["submodules"]:
        return {
            "name": path if path else module.__class__.__name__,
            "type": get_type(module)
        }

    return pytree
        
# %%

graph = generate_pytree(model._model, 'model')

with open('pytree.json', 'w') as f:
    json.dump(graph, f, indent=4)