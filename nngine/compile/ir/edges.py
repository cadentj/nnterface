from pydantic import BaseModel

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

class Edge(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
    )

    # Specific handle name on the target node
    target_handle: str = None

    # Source node id
    source: str

    # Target node id
    target: str