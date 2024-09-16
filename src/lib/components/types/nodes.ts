import type { NodeProps } from "@xyflow/svelte";

// Define an interface that extends NodeProps["data"]
interface ModuleNodeData extends NodeProps["data"] {
    label: "module";
    location: "input" | "output";
    moduleName: string;
    isVariable: boolean;
    loopVariable: string;
    loopParentIds: string[];
}

// Extend NodeProps to use ExtendedNodeData, explicitly preserving all original props
export type ModuleNodeProps = Omit<NodeProps, 'data'> & {
    data: ModuleNodeData;
};