import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { Node } from "@xyflow/svelte";

export const createEmptyNode = (name: string): Node => ({
  id: "",
  position: { x: 0, y: 0 },
  origin: [0.5, 0.5],
  type: name,
  data: { 
      label: name,
  }
});

export const updateNodePosition = (nodes: Node[], targetNode: Node, parentNode: Node): Node[] => {
  const targetIndex = nodes.findIndex(n => n.id === targetNode.id);
  const parentIndex = nodes.findIndex(n => n.id === parentNode.id);

  const [movedNode] = nodes.splice(targetIndex, 1);

  const grandparentNode = parentNode.parentId ? nodes.find(n => n.id === parentNode.parentId) : null;

  if (grandparentNode) {
    movedNode.position = {
      x: targetNode.position.x - (grandparentNode.position.x + parentNode.position.x),
      y: targetNode.position.y - (grandparentNode.position.y + parentNode.position.y),
    };
  } else {
    movedNode.position = {
      x: targetNode.position.x - parentNode.position.x,
      y: targetNode.position.y - parentNode.position.y,
    };
  }

  movedNode.parentId = parentNode.id;
  
  nodes.splice(parentIndex + 1, 0, movedNode);

  return nodes;
};


export const useDnD = () => {
  return getContext('dnd') as Writable<Node | null>;
};