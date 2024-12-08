<script lang="ts">
    import { useSvelteFlow, type IsValidConnection } from "@xyflow/svelte";
    import { connections } from "./states.svelte";

    const { getNode, getHandleConnections } = useSvelteFlow();

    let connectionHandler = $state(null);

    export const handleConnectStart = (params: any) => {
        const node = getNode(params.nodeId);
        const nodeType = node?.type;

        connectionHandler = connections[nodeType];
    };

    const isValidModuleConnection = (sourceId: string) => {
        const targetLeftConnections = getHandleConnections({ nodeId: sourceId, type: 'target', id: 'left-target'});
        const targetRightConnections = getHandleConnections({ nodeId: sourceId, type: 'target', id: 'right-target'});
        const sourceLeftConnections = getHandleConnections({ nodeId: sourceId, type: 'source', id: 'left-source'});
        const sourceRightConnections = getHandleConnections({ nodeId: sourceId, type: 'source', id: 'right-source'});

        // Refuse connections if a module has any existing connections.
        return (
            targetLeftConnections.length === 0 &&
            targetRightConnections.length === 0 &&
            sourceLeftConnections.length === 0 &&
            sourceRightConnections.length === 0
        );
    }

    export const checkIsValidConnection: IsValidConnection = (connection) => {
        if (connection == null) {
            return false;
        }

        if (connection.source === connection.target) {
            return false;
        }

        const sourceNode = getNode(connection.source);
        const targetNode = getNode(connection.target);
        
        if (!sourceNode?.type || !targetNode?.type) {
            return false;
        }

        if (sourceNode.type === "module") {
            return isValidModuleConnection(sourceNode.id);
        }

        const validConnections = connections[sourceNode.type] || [];
        return validConnections.includes(targetNode.type);
    };

    export const handleConnectEnd = () => {
        connectionHandler = null;
    };
</script>

<div></div>