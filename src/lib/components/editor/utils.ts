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

export const useDnD = () => {
  return getContext('dnd') as Writable<Node | null>;
};