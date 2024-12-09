import { get } from "svelte/store";
import type { Node, Edge } from '@xyflow/svelte';
import { sleep } from '$lib/utils';
import type { Writable } from "svelte/store";

function buildNodeLookup(nodes: Writable<Node[]>) {
    let nodeLookup: Record<string, Node> = {};
    let nodesList = get(nodes);
    for (let node of nodesList) {
        nodeLookup[node.id] = node;
    }
    return nodeLookup;
}

function buildAdjacencyList(edges: Writable<Edge[]>) {
    let adjacencyList: Record<string, string[]> = {};
    const edgesList = get(edges);

    for (let edge of edgesList) {
        if (adjacencyList[edge.source]) {
            adjacencyList[edge.source].push(edge.target);
        } else {
            adjacencyList[edge.source] = [edge.target];
        }
    }
    
    return adjacencyList;
}

function cleanOrder(order: string[], edges: Writable<Edge[]>) {
    // pop first session node
    order.shift();

    const updatedOrder = order.filter((nodeId) => !nodeId.startsWith('input'));
    const inputs = order.filter((nodeId) => nodeId.startsWith('input'));

    let adjacencyList = buildAdjacencyList(edges);

    for (let inputId of inputs) {
        let child = adjacencyList[inputId][0];
        updatedOrder.splice(updatedOrder.indexOf(child), 0, inputId);
    }   

    return updatedOrder;
}

export async function animate(
    order: string[],
    nodes: Writable<Node[]>,
    edges: Writable<Edge[]>
) {
    let nodeLookup = buildNodeLookup(nodes);
    order = cleanOrder(order, edges);

    console.log(order);

    for (let nodeId of order) {
        let originalClass = '';
        nodes.update((nodes) => {
            const currentNode = nodeLookup[nodeId];

            originalClass = currentNode.class || '';
            
            currentNode.class = `${originalClass} node-highlighted`.trim();

            return nodes;
        });

        await sleep(500);

        nodes.update((nodes) => {
            const currentNode = nodeLookup[nodeId];
            currentNode.class = originalClass;
            return nodes;
        });
    }
}