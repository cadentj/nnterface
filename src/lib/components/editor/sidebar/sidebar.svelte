<script lang="ts">
    import { useDnD } from "../flow-utils";   

    import ModelSelector from "./model-tab/model-tab.svelte";
    import { setContext } from "svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import BlockList from "./blocks-tab.svelte";
    import FunctionTab from "./function-tab.svelte";

    import type { BlockGroup } from "$lib/components/types/blocks";


    const type = useDnD();

    const control: BlockGroup = {
        title: "Control",
        blocks: ["run", "loop", "batch"],
    };

    const data: BlockGroup = {
        title: "Data",
        blocks: ["input", "list"],
    };

    const demoBlocks: BlockGroup[] = [control, data];

    setContext("type", type);
</script>

<div class='p-10 h-full'>
    <Tabs.Root value="model" class="pointer-events-auto" id="sidebar">
        <Tabs.List class="w-full bg-ui-1">
            <Tabs.Trigger value="model" class="w-full">Model</Tabs.Trigger>
            <Tabs.Trigger value="blocks" class="w-full">Blocks</Tabs.Trigger>
            <Tabs.Trigger value="functions" class="w-full">Functions</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="model" class="p-3 rounded-lg bg-ui-1">
            <ModelSelector/>
        </Tabs.Content>
        <Tabs.Content value="blocks" class="p-3 rounded-lg bg-ui-1">
            <BlockList blockGroups={demoBlocks} />
        </Tabs.Content>
        <Tabs.Content value="functions" class="p-3 rounded-lg bg-ui-1">
            <FunctionTab />
        </Tabs.Content>
    </Tabs.Root>
</div>