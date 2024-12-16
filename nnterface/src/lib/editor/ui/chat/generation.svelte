<script lang="ts">
    import ChatProvider from "./text-provider.svelte";
    import { ArrowUp, Loader2 } from "lucide-svelte";

    let generationText = $state("");
    let isLoading = $state(false);
    let chat = $state<ChatProvider>();

    async function generateText() {
        if (isLoading) return;
        
        isLoading = true;
        const response = await chat?.generate(generationText);
        console.log(response);
        generationText = generationText + response;
        isLoading = false;
    }
</script>

<ChatProvider bind:this={chat}>
    <div class="bg-card rounded-lg p-4 border">
        <div class="flex flex-col h-full relative">
            <textarea
                bind:value={generationText}
                onkeydown={(e) => e.key === "Enter" && !e.shiftKey && !isLoading && generateText()}
                placeholder="Enter text to continue..."
                class="flex-grow px-4 py-2 text-sm border bg-ui-1 rounded-lg resize-none h-full font-mono whitespace-pre-wrap"
                disabled={isLoading}
                rows="20"
            ></textarea>
            <button
                onclick={generateText}
                class="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-ui-2 flex items-center justify-center focus:outline-none focus:ring-1"
                disabled={isLoading}
            >
                {#if isLoading}
                    <Loader2 class="h-5 w-5 animate-spin" />
                {:else}
                    <ArrowUp class="h-5 w-5" />
                {/if}
            </button>
        </div>
    </div>
</ChatProvider>
