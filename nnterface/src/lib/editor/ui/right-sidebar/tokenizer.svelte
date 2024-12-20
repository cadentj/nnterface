<script lang="ts">
    import { useSvelteFlow } from "@xyflow/svelte";
    import type { InputNodeProps } from "$lib/editor/types/nodes";
    import { Textarea } from "$lib/components/ui/textarea";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import { Type, Pencil } from "lucide-svelte";

    const { updateNodeData } = useSvelteFlow();

    let isTokenView = $state(false);

    let tokens: string[] = $state([]);
    let tokenIds: number[] = $state([]);
    let selected: number = $state(-1);
    let text: string = $state("");

    function select(index: number) {
        selected = index;
    }

    function clear() {
        isTokenView = false;
        tokens = [];
        tokenIds = [];
    }

    async function tokenize() {
        if (isTokenView) {
            clear();
            return;
        }

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tools/tokenize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text }),
        });

        const result = await response.json();

        isTokenView = true;
        tokens = result.tokens;
        tokenIds = result.ids;
    }
</script>

<style lang="postcss">
    .selected {
        @apply underline decoration-blue-500 bg-blue-500/20;
    }
</style>


<div class="p-6">
    <div class="flex items-center mb-2 justify-between">
        Prompt
        <button onclick={tokenize}>
            {#if isTokenView}
                <Pencil class="w-5 h-5" />
            {:else}
    
                <Type class="w-5 h-5" />
            {/if}
        </button>
    </div>
    <div>
        {#if isTokenView}
            <div class="cursor-pointer">
                {#each tokens as token, idx}
                    <span
                        role="button"
                        tabindex={idx}
                        class="hover:underline"
                        class:selected={selected === idx}
                        onclick={() => select(idx)}
                        onkeydown={(e) => e.key === "Enter" && select(idx)}
                        >{token}</span
                    >
                {/each}
            </div>
            <small class="text-muted-foreground">Count: {tokens.length}</small>
            <small class="text-muted-foreground"
                >Selected: {tokenIds[selected] ? tokenIds[selected] : "None"}</small
            >
        {:else}
            <Textarea
                value={text}
                on:input={(evt) =>
                    text = evt.currentTarget.value}
                class="resize-none bg-ui-3 nodrag"
            />
        {/if}
    </div>
    
    
</div>

