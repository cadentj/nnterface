<script lang="ts">
    import BlockList from "./block-list/block-tab.svelte";
    import type { BlockGroup } from "./block-list/block-tab.svelte";
    import ModelSelector from "./model-selector/model-tab.svelte";
    import FunctionTab from "./function-builder/function-tab.svelte";
    import * as Tabs from "$lib/components/ui/tabs";

    const control: BlockGroup = {
        title: "Control",
        blocks: ["run", "loop", "batch"],
    };

    const data: BlockGroup = {
        title: "Data",
        blocks: ["input", "list"],
    };


    const output: BlockGroup = {
        title: "Output",
        blocks: ["chat", "graph", "tutorial"],
    };


    const demoBlocks: BlockGroup[] = [control, data, output];
</script>

<div class='p-6 h-full bg-card'>
    <Tabs.Root value="model" id="sidebar">
        <Tabs.List class="w-full h-12 mb-3">
            <Tabs.Trigger value="model" class="w-full h-full">Model</Tabs.Trigger>
            <Tabs.Trigger value="blocks" class="w-full h-full">Blocks</Tabs.Trigger>
            <Tabs.Trigger value="functions" class="w-full h-full">Functions</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="model">
            <ModelSelector/>
        </Tabs.Content> 
        <Tabs.Content value="blocks">
            <BlockList blockGroups={demoBlocks} />
        </Tabs.Content>
        <Tabs.Content value="functions">
            <FunctionTab />
        </Tabs.Content>
    </Tabs.Root>
</div>