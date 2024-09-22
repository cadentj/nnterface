<script lang="ts">
    import { useConnectionType } from "../utils";
    import { useSvelteFlow, type IsValidConnection } from "@xyflow/svelte";
    import { connections } from "../defaults";

    const { getNode } = useSvelteFlow();

    const connectionType = useConnectionType();

    export const handleConnectStart = (params) => {
        const node = getNode(params.nodeId);
        const nodeType = node?.type;

        connectionType.set(connections[nodeType]);
    };

    export const isValidConnection: IsValidConnection = (connection) => {
        const sourceNode = getNode(connection.source);
        const targetNode = getNode(connection.target);

        if (!sourceNode || !targetNode) {
            return false; // Safely handle missing nodes
        }

        const sourceLabel = sourceNode.type;
        const targetLabel = targetNode.type;

        const validConnections = connections[sourceLabel] || [];

        return validConnections.includes(targetLabel);
    };

    export const handleConnectEnd = () => {
        connectionType.set(null);
    };
</script>

<slot />