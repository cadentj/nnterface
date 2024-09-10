<script lang="ts">
    import { useDnD } from "../flow-utils";   

    import ModelSelector from "./model-tab.svelte";
    import { setContext } from "svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import BlockList from "./blocks-tab.svelte";
    import FunctionTab from "./function-tab.svelte";
    const type = useDnD();

    const demoBlocks = ["input", "run", "loop", "batch"];

    setContext("type", type);
</script>

<Tabs.Root value="model" class="pt-5 px-5" id="sidebar">
    <Tabs.List class="w-full">
        <Tabs.Trigger value="model" class="w-full">Model</Tabs.Trigger>
        <Tabs.Trigger value="control" class="w-full">Control</Tabs.Trigger>
        <Tabs.Trigger value="functions" class="w-full">Functions</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="model">
        <ModelSelector/>
    </Tabs.Content>
    <Tabs.Content value="control">
        <small>Blocks</small>
        <BlockList blocks={demoBlocks} />
    </Tabs.Content>
    <Tabs.Content value="functions">
        <small>Blocks</small>
        <FunctionTab />
    </Tabs.Content>
</Tabs.Root>