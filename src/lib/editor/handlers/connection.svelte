<script lang="ts">
    import { useSvelteFlow, type IsValidConnection } from "@xyflow/svelte";
    import { connectionHandler } from "./states.svelte";

    const { getNode } = useSvelteFlow();
    const connections: Record<string, string[]> = {
        "input": [
            "run", "batch"
        ],
        "chat": [
            "run", "batch"
        ],
        "module": [
            "function", "module", "list"
        ],
        "function": [
            "function", "module", "run", "list"
        ],
        "list": [
            "function", "module", "graph", "list"
        ],
    }

    export const handleConnectStart = (params) => {
        const node = getNode(params.nodeId);
        const nodeType = node?.type;

        connectionHandler.connections = connections[nodeType];
    };

    export const isValidConnection: IsValidConnection = (connection) => {
        const sourceNode = getNode(connection.source);
        const targetNode = getNode(connection.target);

        // Handle missing nodes
        if (!sourceNode || !targetNode) {
            return false; 
        }

        const sourceLabel = sourceNode.type;
        const targetLabel = targetNode.type;
        const validConnections = connections[sourceLabel] || [];

        return validConnections.includes(targetLabel);
    };

    export const handleConnectEnd = () => {
        connectionHandler.connections = null;
    };
</script>

<div></div>