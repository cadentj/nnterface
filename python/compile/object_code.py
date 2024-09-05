SESSION = """with model.session() as session:"""

TRACE = """with model.trace() as tracer:"""

INVOKE = """with tracer.invoke({input}):"""

