export let modelSelector = $state({
    draggedType: null,
    modelId: "none",
});

export const connections: Record<string, string[]> = {
    "input": [
        "run", "batch"
    ],
    "chat": [
        "run", "batch"
    ],
    "module": [
        "function", "module", "list"
    ],
    "function": [
        "function", "module", "run", "list"
    ],
    "list": [
        "function", "module", "graph", "list"
    ],
    "none": [
        ""
    ],
}

export const chat = $state({
    "isVisible": false,
});


export const defaultFunctions = $state([
    {
        functionName: "Add",
        inputs: ["x", "y"],
        code: "return x + y",
        deletable: false,
    },
    {
        functionName: "Subtract",
        inputs: ["x", "y"],
        code: "return x - y",
        deletable: false,
    },
    {
        functionName: "Multiply",
        inputs: ["x", "y"],
        code: "return x * y",
        deletable: false,
    },
    {
        functionName: "Divide",
        inputs: ["x", "y"],
        code: "return x / y",
        deletable: false,
    },
]);
