<script lang="ts">
    import { useSvelteFlow, type IsValidConnection } from "@xyflow/svelte";
    import { connectionHandler } from "./states.svelte";
    import { connections } from "./states.svelte";

    const { getNode } = useSvelteFlow();


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