const defaultFunctions = $state([
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

export { defaultFunctions };