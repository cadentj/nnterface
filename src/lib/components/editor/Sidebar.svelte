<script lang="ts">
    import { useDnD } from "./utils";
    import Tree from "./tree/Tree.svelte";
    import { setContext } from "svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import BlockList from "./BlockList.svelte";

    const type = useDnD();

    const demoBlocks = ["text", "run", "function", "loop"];

    setContext("type", type);
</script>

<Tabs.Root value="model" class="pt-5 px-5">
    <Tabs.List class="w-full">
        <Tabs.Trigger value="model" class="w-full">Model</Tabs.Trigger>
        <Tabs.Trigger value="operators" class="w-full">Operators</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="model">
        <Tree />
    </Tabs.Content>
    <Tabs.Content value="operators">
        <BlockList blocks={demoBlocks} />
    </Tabs.Content>
</Tabs.Root>