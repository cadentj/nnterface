<script lang="ts">
    import ModelSelector from "./model-selector/tree.svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import type { BlockGroup } from "$lib/editor/types/blocks";
    import BlockList from "./block-list/block-tab.svelte";
    import FunctionTab from "./function-builder/function-tab.svelte";

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
        blocks: ["chat", "graph"],
    };


    const demoBlocks: BlockGroup[] = [control, data, output];
</script>

<div class='p-10 h-full'>
    <Tabs.Root value="model" class="pointer-events-auto" id="sidebar">
        <Tabs.List class="w-full rounded-lg h-12 border bg-ui-1">
            <Tabs.Trigger value="model" class="w-full h-full data-[state=active]:bg-ui-2 rounded-lg">Model</Tabs.Trigger>
            <Tabs.Trigger value="blocks" class="w-full h-full data-[state=active]:bg-ui-2 rounded-lg">Blocks</Tabs.Trigger>
            <Tabs.Trigger value="functions" class="w-full h-full data-[state=active]:bg-ui-2 rounded-lg">Functions</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="model" class="px-5 py-4 rounded-lg border bg-ui-1">
            <ModelSelector/>
        </Tabs.Content> 
        <Tabs.Content value="blocks" class="px-5 py-4 rounded-lg border bg-ui-1">
            <BlockList blockGroups={demoBlocks} />
        </Tabs.Content>
        <Tabs.Content value="functions" class="px-5 py-4 rounded-lg border bg-ui-1">
            <FunctionTab />
        </Tabs.Content>
    </Tabs.Root>
</div>