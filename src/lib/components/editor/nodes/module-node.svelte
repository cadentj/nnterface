<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";

    import "../styles/nodes.css";
    import NodeMenu from "./node-menu.svelte";

    type $$Props = NodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];
    export let isConnectable: $$Props["isConnectable"];


    $$restProps;
</script>

<NodeMenu {id} nodeType={"block"}>
    <div>{data.label}</div>
    <Handle
        id="input"
        type="target"
        position={Position.Top}
        {isConnectable}
    />

    <Handle
        id="output"
        type="source"
        position={Position.Bottom}
        class="w-16 rounded-sm border-none"
        {isConnectable}
    />
</NodeMenu>