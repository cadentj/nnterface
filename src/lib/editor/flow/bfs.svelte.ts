import { nodes, edges } from "$lib/editor/flow";
import { get } from "svelte/store";
import type { Node } from '@xyflow/svelte';
import { sleep } from '$lib/utils';

interface NodeData {
    parents: string[];
    variant: string;
    [key: string]: any;
}

function buildAdjacencyList(nodeLookup: Record<string, Node<NodeData>>) {
    let adjacencyList: Record<string, string[]> = {};
    const edgesList = get(edges);

    function addEdge(source: string, target: string) {
        if (adjacencyList[source]) {
            adjacencyList[source].push(target);
        } else {
            adjacencyList[source] = [target];
        }
    }

    for (let edge of edgesList) {
        addEdge(edge.source, edge.target);

        let node = nodeLookup[edge.source];
        if (node.data.parents.length > 0) {
            let immediateParent = node.data.parents.at(-1);
            addEdge(immediateParent, edge.source);
        }
    }
    
    return adjacencyList;
}

function buildNodeLookup() {
    let nodeLookup: Record<string, Node> = {};
    let nodesList = get(nodes);
    for (let node of nodesList) {
        nodeLookup[node.id] = node;
    }
    return nodeLookup;
}

async function bfs(
    adjacencyList: Record<string, string[]>,
    nodeLookup: Record<string, Node<NodeData>>,
    currentNodes: Node<NodeData>[],
    newClass: string,
) {
    let queue = [...currentNodes];  // Create a separate queue
    let lastVisitedId: string | null = null;
    let visited = new Set<string>();  // Keep track of visited nodes

    while (queue.length > 0) {    
        const currentNode = queue.shift()!;  // Get next node to process
        
        // Skip if we've already visited this node
        if (visited.has(currentNode.id)) {
            continue;
        }

        await sleep(500);
        
        // Mark as visited
        visited.add(currentNode.id);

        nodes.update((nodes) => {
            // Reset the last visited node
            if (lastVisitedId) {
                const lastNode = nodes.find(n => n.id === lastVisitedId);
                if (lastNode) {
                    lastNode.class = ''; // Reset to default class
                }
            }

            const nodeToUpdate = nodes.find(n => n.id === currentNode.id);
            if (nodeToUpdate) {
                nodeToUpdate.class = newClass;
                lastVisitedId = nodeToUpdate.id;
            }

            return nodes;
        });

        // Add unvisited neighbors to queue
        let neighbors = adjacencyList[currentNode.id] || [];
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {  // Only add unvisited neighbors
                let neighborNode = nodeLookup[neighbor];
                if (neighborNode) {
                    queue.push(neighborNode);
                }
            }
        }
    }

    await sleep(500);

    // Reset the final node after the loop ends
    nodes.update((nodes) => {
        if (lastVisitedId) {
            const lastNode = nodes.find(n => n.id === lastVisitedId);
            if (lastNode) {
                lastNode.class = '';
            }
        }
        return nodes;
    });
}

export async function animateBfs() {
    let nodeLookup = buildNodeLookup();
    let adjacencyList = buildAdjacencyList(nodeLookup);

    console.log(adjacencyList);
    let inputNodes = get(nodes).filter(
        (node) => node.data.variant === "input",
    );
    await bfs(adjacencyList, nodeLookup, inputNodes, "node-highlighted");
}

