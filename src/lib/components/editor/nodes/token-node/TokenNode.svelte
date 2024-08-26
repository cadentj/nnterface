<script lang="ts">
    import {
        Handle,
        Position,
        type NodeProps,
        useSvelteFlow,
    } from "@xyflow/svelte";

    import TextCursorInput from "lucide-svelte/icons/text-cursor-input";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog";
    import TokenString from "./TokenString.svelte";
    import { Textarea } from "$lib/components/ui/textarea";

    type $$Props = NodeProps;

    export let id: $$Props["id"];
    export let data: $$Props["data"];

    const { updateNodeData } = useSvelteFlow();

    let tokens = [];
    let highlightedTokens = new Set();

    function clearHighlights() {
        highlightedTokens.clear();
        highlightedTokens = highlightedTokens; // trigger reactivity
    }

    const tokenize = () => {
        console.log("tokenize");
        tokens = data.text.split(" ").map((token, index) => ({
            id: index,
            text: token,
        }));
    };

    // const connections = useHandleConnections({ nodeId: 'node-id', type: 'target' });

    // $: {
    //     // This will be called whenever connections change
    //     // for the target handle in the node with id 'node-id'
    //     console.log($connections);
    // }
</script>

<div class="custom">
    <Dialog.Root>
        <Dialog.Content>
            <Dialog.Title>Prompt</Dialog.Title>
            <Dialog.Description>Interventions will only be executed on the highlighted tokens.</Dialog.Description>
            {#if tokens.length == 0}
                <Textarea
                    value={data.text}
                    on:input={(evt) =>
                        updateNodeData(id, { text: evt.currentTarget.value })}
                />
            {:else}
                <TokenString bind:tokens bind:highlightedTokens />
            {/if}
            <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-3">
                    <Button
                        on:click={() => {
                            tokenize();
                        }}>Tokenize</Button
                    >
                </div>
                <div class="grid gap-3">
                    <Button
                        on:click={() => {
                            clearHighlights();
                            tokens = [];
                        }}
                        variant="outline"
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </Dialog.Content>

        <div class="header">
            <div class="label">Prompt</div>
            <Dialog.Trigger>
                <Button variant="ghost" size="icon">
                    <TextCursorInput class="h-4 w-4" />
                </Button>
            </Dialog.Trigger>
        </div>
        <div>
            {#if tokens.length == 0}
                <Textarea
                    value={data.text}
                    on:input={(evt) =>
                        updateNodeData(id, { text: evt.currentTarget.value })}
                    class="resize-none"
                />
            {:else}
                <TokenString bind:tokens bind:highlightedTokens />
            {/if}
        </div>
        <Handle type="source" position={Position.Right} />
    </Dialog.Root>
</div>

<style>
    .custom {
        background-color: #eee;
        padding: 10px;
        border-radius: 10px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .label {
        font-size: 12px;
        margin-bottom: 5px;
    }
</style>
