<script lang="ts">
    import ContextNode from "./context.svelte";
    import type { ContextNodeProps } from "$lib/editor/types/nodes";

    let {
        type,
        data,
    }: ContextNodeProps = $props();
</script>

<ContextNode label="batch"/>