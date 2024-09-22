<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ModuleNodeProps } from "$lib/components/types/nodes";

    import Handle from "../utils/handle.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    type $$Props = ModuleNodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    data.isVariable = data.isVariable || false;
    data.loopVariable = data.loopVariable || "";
    data.loopParentIds = data.loopParentIds || ["a",'b','c','d'];

    let before: string, after: string;
    if (data.isVariable) {
        [before, after] = data.moduleName.split("<VAR>");
    }

    let value: string = "[select]";

    export function clearValue() {
        value = "[select]";
    }

    const setValue = (v: string) => {
        value = v;
        before = before.slice(0, -1);
        data.moduleName = `${before}${v}${after}`;
    };

    $$restProps;
</script>

<div class="block">
    <div class="flex">
        {#if data.isVariable}
            {before}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>{value}</DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Group>
                        {#each data.loopParentIds as id}
                            <DropdownMenu.Item on:click={() => setValue(`[${id}]`)}>{id}</DropdownMenu.Item>
                        {/each}
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            {after}
        {:else}
            {data.moduleName}
        {/if}
    </div>

    <!-- NOTE: targets must come before sources in html to function properly. -->

    <Handle
        id="c"
        type="target"
        label={type}
        position={Position.Left}
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        id="d"
        type="target"
        label={type}
        position={Position.Right}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        id="a"
        type="source"
        label={type}
        position={Position.Left}
        onconnect={() => {
            data.location = "input";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />

    <Handle
        id="b"
        type="source"
        label={type}
        position={Position.Right}
        onconnect={() => {
            data.location = "output";
        }}
        ondisconnect={() => {
            data.location = "";
        }}
    />
</div>
