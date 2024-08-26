<script lang="ts">
    import { useDnD } from "./utils";
    import Tree from "./tree/Tree.svelte";
    import { setContext } from "svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Button } from "$lib/components/ui/button";

    const type = useDnD();

    export let run;

    setContext("type", type);
</script>

<aside>
    <Tabs.Root value="model" class="w-[400px]">
        <Tabs.List>
            <Tabs.Trigger value="model">Model</Tabs.Trigger>
            <Tabs.Trigger value="protocols">Protocols</Tabs.Trigger>
            <Tabs.Trigger value="operators">Operators</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="model">
            <Tree />
        </Tabs.Content>
        <Tabs.Content value="protocols">
            Protocols
        </Tabs.Content>
        <Tabs.Content value="operators">
            Change your password here.
        </Tabs.Content>
    </Tabs.Root>
    <Button class="test" on:click={run}>
        Run
    </Button>
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
