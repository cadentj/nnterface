export let modelSelector = $state({
    draggedType: null,
    modelId: "none",
    isChatModel: false,
});

export let editor = $state({
    proximity: false,
    snapGrid: undefined,
    chatNodeExists: false,
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


export const defaultFunctions = $state({
    "functions": [
        {
            functionName: "Add",
            inputs: ["x", "y"],
            code: "return x + y",
            deletable: false,
            typedArgs: {},
        },
        {
            functionName: "Subtract",
            inputs: ["x", "y"],
            code: "return x - y",
            deletable: false,
            typedArgs: {},
        },
        {
            functionName: "Multiply",
            inputs: ["x", "y"],
            code: "return x * y",
            deletable: false,
            typedArgs: {},
        },
        {
            functionName: "Divide",
            inputs: ["x", "y"],
            code: "return x / y",
            deletable: false,
            typedArgs: {},
        },
    ]
});
