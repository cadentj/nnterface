import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { Node } from "@xyflow/svelte";

export const createEmptyNode = (name: string): Node => ({
  id: "",
  position: { x: 0, y: 0 },
  origin: [0.0, 0.0],
  type: name,
  data: { 
      label: name,
  }
});

export const updateNodeOrder = (nodes: Node[], targetNode: Node, parentNode: Node): Node[] => {
  const targetIndex = nodes.findIndex(n => n.id === targetNode.id);
  const parentIndex = nodes.findIndex(n => n.id === parentNode.id);

  const [movedNode] = nodes.splice(targetIndex, 1);

  movedNode.data.parent = parentNode.id;
  
  nodes.splice(parentIndex + 1, 0, movedNode);

  return nodes;
};



export const useDnD = () => {
  return getContext('dnd') as Writable<Node | null>;
};