<script lang="ts">
    import {
        useSvelteFlow,
        useNodes,
        useEdges,
        type Node,
        type Edge,
        type InternalNode,
    } from "@xyflow/svelte";
    import { connections, proximity } from "./states.svelte";

    const nodes = useNodes();
    const edges = useEdges();
    const MIN_DISTANCE = 80;
    const { getInternalNode, getNode } = useSvelteFlow();

    function checkModule(
        n: Node,
        nodeLeft: number,
        nodeRight: number,
        nodeY: number,
        targetWidth: number,
        targetY: number,
    ) {
        const distances = [
            // Left to Left
            {
                d: Math.sqrt(
                    Math.pow(n.position.x - nodeLeft, 2) + 
                    Math.pow(targetY - nodeY, 2)
                ),
                sourceHandle: "left-source",
                targetHandle: "left-target"
            },
            // Left to Right
            {
                d: Math.sqrt(
                    Math.pow((n.position.x + targetWidth) - nodeLeft, 2) + 
                    Math.pow(targetY - nodeY, 2)
                ),
                sourceHandle: "left-source",
                targetHandle: "right-target"
            },
            // Right to Left
            {
                d: Math.sqrt(
                    Math.pow(n.position.x - nodeRight, 2) + 
                    Math.pow(targetY - nodeY, 2)
                ),
                sourceHandle: "right-source",
                targetHandle: "left-target"
            },
            // Right to Right
            {
                d: Math.sqrt(
                    Math.pow((n.position.x + targetWidth) - nodeRight, 2) + 
                    Math.pow(targetY - nodeY, 2)
                ),
                sourceHandle: "right-source",
                targetHandle: "right-target"
            }
        ];
        return distances.reduce((a, b) => a.d < b.d ? a : b);
    }

    function getClosestEdge(node: Node, nodes: Node[]) {
        let nodeInternal: InternalNode | undefined = getInternalNode(node.id);

        // Get both edges of the dragged node
        const nodeWidth = nodeInternal?.measured.width || 0;
        const nodeLeft = node.position.x;
        const nodeRight = node.position.x + nodeWidth;
        const nodeY = nodeInternal?.measured.height
            ? node.position.y + (nodeInternal.measured.height / 2)
            : node.position.y;

        const closestNode = nodes.reduce(
            (res, n) => {
                if (n.id !== node.id) {
                    const targetInternal = getInternalNode(n.id);
                    const targetWidth = targetInternal?.measured.width || 0;
                    let targetY = n.position.y;
                    if (n.data.variant === "context" || n.type === "graph") {
                        targetY += (n.height ?? 0) / 2;
                    }

                    let closest;
                    
                    // Only check all handle combinations if either node is a module
                    if (node.data.variant === "module" && n.data.variant === "module") {
                        closest = checkModule(
                            n,
                            nodeLeft,
                            nodeRight,
                            nodeY,
                            targetWidth,
                            targetY
                        );
                    } else {
                        // For non-module nodes, only check right-to-left connection
                        closest = {
                            d: Math.sqrt(
                                Math.pow(n.position.x - (nodeLeft + nodeWidth), 2) + 
                                Math.pow(targetY - nodeY, 2)
                            ),
                            sourceHandle: node.data.variant === "module" ? "right-source" : undefined,
                            targetHandle: n.data.variant === "module" ? "left-target" : undefined
                        };

                    }

                    if (closest.d < res.distance && closest.d < MIN_DISTANCE) {
                        res.distance = closest.d;
                        res.node = n;
                        res.sourceHandle = closest.sourceHandle;
                        res.targetHandle = closest.targetHandle;
                    }
                }

                return res;
            },
            {
                distance: Number.MAX_VALUE,
                node: null,
                sourceHandle: undefined,
                targetHandle: undefined
            } as { 
                distance: number; 
                node: Node | null; 
                sourceHandle: string | undefined;
                targetHandle: string | undefined;
            },
        );

        if (!closestNode.node) {
            return null;
        }

        const edge = {
            id: `${node.id}-${closestNode.node.id}`,
            source: node.id,
            target: closestNode.node.id,
            class: "temp",
        };

        // Only add handle IDs if they exist (for module nodes)
        if (closestNode.sourceHandle && closestNode.targetHandle) {
            edge.sourceHandle = closestNode.sourceHandle;
            edge.targetHandle = closestNode.targetHandle;
        }

        return edge;
    }

    export function onNodeDrag({ targetNode: node }, checkIsValidConnection) {
        if (!proximity.isOn) {
            return;
        }

        const closestEdge = getClosestEdge(node, $nodes);

        // Check if its a valid proximity connection
        if (closestEdge?.source && closestEdge?.target) {
            const sourceType: string | undefined = getNode(closestEdge.source)?.type;
            const targetType: string | undefined = getNode(closestEdge.target)?.type;
            if (sourceType && targetType && !connections[sourceType]?.includes(targetType)) {
                return;
            }
        }

        if (!checkIsValidConnection(closestEdge)) {
            return;
        }

        let edgeAlreadyExists = false;
        $edges.forEach((edge, i) => {
            if (edgeAlreadyExists) {
                return;
            }

            if (closestEdge) {
                // non-temporary edge already exists
                if (
                    edge.source === closestEdge.source &&
                    edge.target === closestEdge.target
                ) {
                    edgeAlreadyExists = true;
                    return;
                }

                if (edge.class !== "temp") {
                    return;
                }

                if (
                    edge.source !== closestEdge.source ||
                    edge.target !== closestEdge.target
                ) {
                    $edges[i] = closestEdge; // replace the edge
                    edgeAlreadyExists = true;
                }
            } else if (edge.class === "temp") {
                $edges.splice(i, 1); // remove edge
            }
        });

        if (closestEdge && !edgeAlreadyExists) {
            $edges.push(closestEdge);
        }

        $edges = $edges;
    }

    export function onNodeDragStop() {
        if (!proximity.isOn) {
            return;
        }
        
        $edges.forEach((edge) => {
            if (edge.class === "temp") {
                edge.class = "";
            }
        });
        $edges = $edges;
    }
</script>

<div></div>

<style>
    :global(.svelte-flow .svelte-flow__edge-path) {
        stroke: #333;
        stroke-width: 2;
    }

    :global(.svelte-flow .temp .svelte-flow__edge-path) {
        stroke: #bbb;
        stroke-dasharray: 5 5;
    }
</style>
