<script lang="ts">
    import { useSvelteFlow, type IsValidConnection } from "@xyflow/svelte";
    import { connections } from "./states.svelte";

    const { getNode, getHandleConnections } = useSvelteFlow();

    let connectionStartId: string = $state("");
    let connectionHandler = $state(null);

    export const handleConnectStart = (params: any) => {
        const node = getNode(params.nodeId);
        const nodeType = node?.type;

        connectionStartId = params.nodeId;
        connectionHandler = connections[nodeType];
    };

    const isValidModuleConnection = () => {
        const targetLeftConnections = getHandleConnections({ nodeId: connectionStartId, type: 'target', id: 'left-target'});
        const targetRightConnections = getHandleConnections({ nodeId: connectionStartId, type: 'target', id: 'right-target'});
        const sourceLeftConnections = getHandleConnections({ nodeId: connectionStartId, type: 'source', id: 'left-source'});
        const sourceRightConnections = getHandleConnections({ nodeId: connectionStartId, type: 'source', id: 'right-source'});

        // Refuse connections if a module has any existing connections.
        return (
            targetLeftConnections.length === 0 &&
            targetRightConnections.length === 0 &&
            sourceLeftConnections.length === 0 &&
            sourceRightConnections.length === 0
        );
    }

    export const isValidConnection: IsValidConnection = (connection) => {
        if (connection.source === connection.target) {
            return false;
        }

        const sourceNode = getNode(connection.source);
        const targetNode = getNode(connection.target);
        
        if (!sourceNode?.type || !targetNode?.type) {
            return false;
        }

        if (sourceNode.type === "module") {
            return isValidModuleConnection();
        }

        const validConnections = connections[sourceNode.type] || [];
        return validConnections.includes(targetNode.type);
    };

    export const handleConnectEnd = () => {
        connectionHandler = null;
    };
</script>

<div></div>