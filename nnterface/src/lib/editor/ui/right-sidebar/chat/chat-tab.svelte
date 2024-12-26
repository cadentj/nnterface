<script lang="ts">
    import { modelSelector } from "$lib/editor/handlers/states.svelte";
    import Conversation from "./conversation.svelte";
    import Completion from "./completion.svelte";

    import { Slider } from "$lib/components/ui/slider/index.js";

    let temperature = $state([0.5]);
    let maxNewTokens = $state([50]);
</script>

<main class="bg-card h-full flex flex-col">
    <div class="p-6 border-b h-[70%]">
        {#if modelSelector.isChatModel}
            <Conversation {temperature} {maxNewTokens} />
        {:else}
            <Completion {temperature} {maxNewTokens} />
        {/if}
    </div>

    <div class="h-[20%] p-6">
        <small class="font-medium">Generation Settings</small>
        <div class="my-3">
            <small>Temperature: {temperature[0]}</small>
            <Slider
                class="mt-3"
                bind:value={temperature}
                max={1}
                min={0}
                step={0.05}
            />
        </div>
        <div class="my-3">
            <small>Max New Tokens: {maxNewTokens[0]}</small>
            <Slider
                class="mt-3"
                bind:value={maxNewTokens}
                max={100}
                min={10}
                step={10}
            />
        </div>
    </div>
</main>
