<script lang="ts">
    import { nodes, edges } from "./flow";
    import { SvelteFlow } from "@xyflow/svelte";
    import '@xyflow/svelte/dist/style.css';

    import Layout from "./flow/layout.svelte";
    import Toolbar from "./ui/toolbar/toolbar.svelte";

    import Tree from "./ui/model-selector/tree.svelte";

    import { modelSelector } from "$lib/editor/contexts/model-selector.svelte.ts";

    import "$lib/editor/styles/flow.css";
</script>

<Layout>
    <!-- <SvelteFlow {nodes} {edges} fitView >
        <Toolbar />
    </SvelteFlow> -->
    <Tree />
</Layout>
