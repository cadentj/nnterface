<script lang="ts">
    import { Handle, Position, NodeResizer } from "@xyflow/svelte";
    export let selected: boolean = false;
</script>

<NodeResizer
    minWidth={100}
    minHeight={30}
    isVisible={selected}
    handleStyle="border: 1px solid black; background-color: white; height: 10px; width: 10px;"
/>

<slot />

<Handle type="target" position={Position.Top} />
<Handle type="source" position={Position.Bottom} />
