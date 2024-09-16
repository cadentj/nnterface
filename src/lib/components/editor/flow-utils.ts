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

const clearParents = (nodes) => {
  return nodes.map((node) => {
    node.data.parents = ["session"];
    return node;
  });
}

export const updateIntersections = (nodes, getIntersectingNodes) => {
  nodes = clearParents(nodes);

  return nodes.map((node) => {
    const intersectingNodes = getIntersectingNodes(node, false, nodes);
    if (intersectingNodes.length >= 1) {
      node.data.parents = node.data.parents.concat(intersectingNodes.map((n) => n.id)); 
    }
    return node;
  });

}

export const useConnectionType = () => {
  return getContext('connection') as Writable<Node | null>;
};

export const useDnD = () => {
  return getContext('dnd') as Writable<Node | null>;
};