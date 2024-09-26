import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { Node } from "@xyflow/svelte";


export const createEmptyNode = (name: string): Node => ({
  id: "",
  position: { x: 0, y: 0 },
  origin: [0.0, 0.0],
  type: name,
  data: {
    variant: name,
  }
});

export const getName = (node: Node) => {
  switch (node.type) {
    case "context":
      return node.data.variant;
    case "function":
      return node.data.functionName;
    case "module":
      return node.data.moduleName;
    default:
      return node.type;
  }
}

export const useConnectionType = () => {
  return getContext('connection') as Writable<Node | null>;
};

export const useDnD = () => {
  return getContext('dnd') as Writable<Node | null>;
};

export const clearParents = (nodes: Node[]) => {
  return nodes.map((node) => {
    node.data.parents = ["session"];
    return node;
  });
};