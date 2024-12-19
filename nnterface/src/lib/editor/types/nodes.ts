import type { NodeProps } from "@xyflow/svelte";

type BaseNodeData = NodeProps['data'];

interface ModuleNodeData extends BaseNodeData {
    label: "module";
    location: "input" | "output";
    moduleName: string;
    isVariable: boolean;
    nLayers: number;
    loopParentIds: string[];
    isTuple: boolean;
    index: string;
    isInput: boolean;
    variant: string;
    variable?: string;
}

export type ModuleNodeProps = Omit<NodeProps, 'data'> & {
    data: ModuleNodeData;
};

interface ContextNodeData extends BaseNodeData {
    label: "module";
    color: string;
}

export type ContextNodeProps = Omit<NodeProps, 'data'> & {
    label: string;
    data: ContextNodeData;
};

interface FunctionNodeData extends BaseNodeData {
    label: "function";
    inputs: string[];
    functionName: string;
    typedArgs: Record<string, string | number>;
}

export type FunctionNodeProps = Omit<NodeProps, 'data'> & {
    data: FunctionNodeData;
};

interface InputNodeData extends BaseNodeData {
    label: "input";
    text: string;
}

export type InputNodeProps = Omit<NodeProps, 'data'> & {
    data: InputNodeData;
};

interface ListNodeData extends BaseNodeData {
    label: "list";
}

export type ListNodeProps = Omit<NodeProps, 'data'> & {
    data: ListNodeData;
};