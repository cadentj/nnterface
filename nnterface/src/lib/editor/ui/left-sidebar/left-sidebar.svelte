<script lang="ts">
    import BlockList from "./block-tab.svelte";
    import type { BlockGroup } from "./block-tab.svelte";
    import ModelSelector from "./model-selector/model-tab.svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Separator } from "$lib/components/ui/separator/index.js";



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

<div class='h-full bg-card'>
    <Tabs.Root value="model" id="sidebar">
        <div class="px-6 py-3">
            <Tabs.List>
                <Tabs.Trigger value="model" class="w-full h-full">Model</Tabs.Trigger>
                <Tabs.Trigger value="blocks" class="w-full h-full">Blocks</Tabs.Trigger>
            </Tabs.List>
        </div>

        <Separator/>
        
        <div>
            <Tabs.Content class="px-6 py-3" value="model">
                <ModelSelector/>
            </Tabs.Content> 
            <Tabs.Content value="blocks">
                <BlockList blockGroups={demoBlocks} />
            </Tabs.Content>
        </div>
    </Tabs.Root>
</div>