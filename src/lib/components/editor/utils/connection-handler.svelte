<script lang="ts">
    import { useConnectionType } from "../util";
    import { useSvelteFlow, type IsValidConnection } from "@xyflow/svelte";
    import { connections } from "../flow";

    const { getNode } = useSvelteFlow();

    const connectionType = useConnectionType();

    export const handleConnectStart = (params) => {
        const node = getNode(params.nodeId);
        const nodeType = node?.data.label;

        connectionType.set(connections[nodeType]);
    };

    export const isValidConnection: IsValidConnection = (connection) => {
        const sourceLabel = getNode(connection.source)?.data.label;
        const targetLabel = getNode(connection.target)?.data.label;

        const validConnections = connections[sourceLabel];

        if (validConnections.includes(targetLabel)) {
            return true;
        }
        return false;
    };

    export const handleConnectEnd = () => {
        connectionType.set(null);
    };
</script>

<slot />