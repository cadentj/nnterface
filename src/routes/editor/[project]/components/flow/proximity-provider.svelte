<script lang="ts">
    import {
        useSvelteFlow,
        useNodes,
        useEdges,
        type Node,
        type Edge,
        type InternalNode,
    } from "@xyflow/svelte";
    import { connections } from "../defaults";

    const nodes = useNodes();
    const edges = useEdges();
    const MIN_DISTANCE = 110;
    const { getInternalNode, getNode } = useSvelteFlow();

    function getClosestEdge(node: Node, nodes: Node[]) {
        let nodeInternal: InternalNode | undefined = getInternalNode(node.id);

        let ndx = nodeInternal?.measured.width
            ? node.position.x + nodeInternal.measured.width
            : node.position.x;

        const closestNode = nodes.reduce(
            (res, n) => {
                if (n.id !== node.id) {
                    // Contexts are resizable so we need to adjust the y position
                    let ny = n.position.y;
                    if (n.data.variant === "context") {
                        ny += (n.height / 2)
                    }

                    const dx = n.position.x - ndx;
                    const dy = ny - node.position.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < res.distance && d < MIN_DISTANCE) {
                        res.distance = d;
                        res.node = n;
                    }
                }

                return res;
            },
            <{ distance: number; node: Node | null }>{
                distance: Number.MAX_VALUE,
                node: null,
            },
        );

        if (!closestNode.node) {
            return null;
        }

        const closeNodeIsSource = closestNode.node.position.x < node.position.x;

        return {
            id: closeNodeIsSource
                ? `${node.id}-${closestNode.node.id}`
                : `${closestNode.node.id}-${node.id}`,
            source: closeNodeIsSource ? closestNode.node.id : node.id,
            target: closeNodeIsSource ? node.id : closestNode.node.id,
            class: "temp",
        };
    }

    export function onNodeDrag({ detail: { targetNode: node } }) {
        const closestEdge = getClosestEdge(node, $nodes);

        if (closestEdge?.source && closestEdge?.target) {
            const sourceType = getNode(closestEdge.source)?.type;
            const targetType = getNode(closestEdge.target)?.type;
            if (!connections[sourceType].includes(targetType)) {
                return;
            }
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
        $edges.forEach((edge) => {
            if (edge.class === "temp") {
                edge.class = "";
            }
        });
        $edges = $edges;
    }
</script>

<slot />

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
