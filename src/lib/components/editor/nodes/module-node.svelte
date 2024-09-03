<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";

    import "./nodes.css";
    import NodeMenu from "./node-menu.svelte";

    type $$Props = NodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];
    export let isConnectable: $$Props["isConnectable"];

    const DEFAULT_HANDLE_STYLE = "w-16 rounded-sm border-none";

    $$restProps;
</script>

<NodeMenu {id} nodeType={"block"}>
    <div>{data.label}</div>
    <Handle
        id="input"
        type="target"
        position={Position.Top}
        class="test"
        {isConnectable}
    />

    <Handle
        id="output"
        type="source"
        position={Position.Bottom}
        class="{DEFAULT_HANDLE_STYLE}"
        {isConnectable}
    />
</NodeMenu>