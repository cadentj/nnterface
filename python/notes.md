# Nodes

## Input Node

Contains the text as a { data { text : string } } property. 

### Targets
- Must be passed to a run context.

## Module Node

Represents some NNsight envoy. 

### Notes
- Should not have a gradient handle by default. Adding in a backward node should update visible modules to include such handle.
- Can declare a range (n-m) or selected (n,m) or mix (n-m, a-b) of layers on certain module list nodes. implicitly creates a loop/

### Targets
- Get operation: when passed to a function
- Set operation: when a function or other module has their source -> this target

# Contexts

## Run Context

Basically a trace context. Operations within the context are executed within the context within Python. 

### Notes
- Operations between items in run contexts spawn an invoke. Modules connected between run contexts will therefore be batched together.

### Source
- Output of the context is the model's logits.

## Loop Context

Creates a loop in python code.

## Function Context

Executes modules as apply module if placed in the function. Else applies a function given some inputs.