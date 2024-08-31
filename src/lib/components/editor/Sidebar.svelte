<script lang="ts">
    import { useDnD } from "./utils";
    import Tree from "./tree/Tree.svelte";
    import { setContext } from "svelte";
    import * as Tabs from "$lib/components/ui/tabs";

    import BlockList from "./BlockList.svelte";

    const type = useDnD();

    const demoBlocks = ["text", "Block 2", "Block 3", "Block 4"];

    setContext("type", type);
</script>

<aside>
    <Tabs.Root value="model" class="w-[400px]">
        <Tabs.List>
            <Tabs.Trigger value="model">Model</Tabs.Trigger>
            <Tabs.Trigger value="control">Control</Tabs.Trigger>
            <Tabs.Trigger value="operators">Operators</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="model">
            <Tree />
        </Tabs.Content>
        <Tabs.Content value="control">
            <BlockList blocks={demoBlocks}/>
        </Tabs.Content>
        <Tabs.Content value="operators">
            Change your password here.
        </Tabs.Content>
    </Tabs.Root>
</aside>

<style>
    aside {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        /* align-items: center; */
        padding-top: 3rem;
        padding-left: 3rem;
    }

    .test {
        position: absolute;
        bottom: 10px;
    }
</style>
