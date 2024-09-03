<script lang="ts">
    import { Handle, Position, NodeResizer } from "@xyflow/svelte";
    import "./nodes.css";
    import NodeMenu from "./node-menu.svelte";

    export let id: string = "";
    export let selected: boolean = false;
</script>

<NodeMenu id={id} nodeType={"context"}>
    <NodeResizer
        minWidth={100}
        minHeight={30}
        isVisible={selected}
        handleStyle="border: 1px solid black; background-color: white; height: 10px; width: 10px;"
    />

    <slot />

    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
</NodeMenu>
