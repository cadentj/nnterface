import { nodes, edges } from "$lib/editor/flow";
import { get } from "svelte/store";
import type { Node } from '@xyflow/svelte';
import { sleep } from '$lib/utils';

function buildNodeLookup() {
    let nodeLookup: Record<string, Node> = {};
    let nodesList = get(nodes);
    for (let node of nodesList) {
        nodeLookup[node.id] = node;
    }
    return nodeLookup;
}

function buildAdjacencyList() {
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

function cleanOrder(order: string[]) {
    // pop first session node
    order.shift();

    const updatedOrder = order.filter((nodeId) => !nodeId.startsWith('input'));
    const inputs = order.filter((nodeId) => nodeId.startsWith('input'));

    let adjacencyList = buildAdjacencyList();

    for (let inputId of inputs) {
        let child = adjacencyList[inputId][0];
        updatedOrder.splice(updatedOrder.indexOf(child), 0, inputId);
    }   

    return updatedOrder;
}

export async function animate(order: string[]) {
    let nodeLookup = buildNodeLookup();
    order = cleanOrder(order);

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