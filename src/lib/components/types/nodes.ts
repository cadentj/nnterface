import type { NodeProps } from "@xyflow/svelte";

interface ModuleNodeData extends NodeProps["data"] {
    label: "module";
    location: "input" | "output";
    moduleName: string;
    isVariable: boolean;
    loopVariable: string;
    loopParentIds: string[];
}

export type ModuleNodeProps = Omit<NodeProps, 'data'> & {
    data: ModuleNodeData;
};

interface ContextNodeData extends NodeProps["data"] {
    label: "module";
    color: string;
}

export type ContextNodeProps = Omit<NodeProps, 'data'> & {
    data: ContextNodeData;
};


interface FunctionNodeData extends NodeProps["data"] {
    label: "function";
    inputs: string[];
    functionName: string;
}

export type FunctionNodeProps = Omit<NodeProps, 'data'> & {
    data: FunctionNodeData;
};