export let modelSelector = $state({
    draggedType: null,
    location: null,
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


