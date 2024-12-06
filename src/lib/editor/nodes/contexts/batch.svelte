<script lang="ts">
    import ContextNode from "./context.svelte";
    import type { ContextNodeProps } from "$lib/editor/types/nodes";

    let {
        type,
        data,
        ...restProps
    } = $props();

    data.color = data.color || "rgba(134, 25, 143, 0.3)";
</script>

<ContextNode label={type}/>