import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import  { type Node, useSvelteFlow, useNodes } from "@xyflow/svelte";



export const createEmptyNode = (name: string): Node => ({
  id: "",
  position: { x: 0, y: 0 },
  origin: [0.0, 0.0],
  type: name,
  data: { 
      label: name,
  }
});

export const checkIntersections = (nodes, getIntersectingNodes) => {

  nodes.update((nodes) => {
    return nodes.map((node) => {
      const intersectingNodes = getIntersectingNodes(node.id, false);
      if (intersectingNodes.length > 1) {
        console.log("Intersecting nodes: ", intersectingNodes);
      }
      return node;
    });
  });

}



export const useDnD = () => {
  return getContext('dnd') as Writable<Node | null>;
};