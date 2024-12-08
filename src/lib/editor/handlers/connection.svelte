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
        if (connection.source === connection.target) {
            return false;
        }

        const sourceNode = getNode(connection.source);
        const targetNode = getNode(connection.target);

        if (!sourceNode?.type || !targetNode?.type) {
            return false;
        }

        const validConnections = connections[sourceNode.type] || [];
        return validConnections.includes(targetNode.type);
    };

    export const handleConnectEnd = () => {
        connectionHandler.connections = null;
    };
</script>

<div></div>