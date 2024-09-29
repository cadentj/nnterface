<script lang="ts">
    import { onMount } from "svelte";
    import { ArrowUp } from "lucide-svelte";
    import ChatProvider from "./chat-provider.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton";

    let messages = [];
    let inputMessage = "";
    let chatContainer;
    let isLoading = false;

    let chat: ChatProvider;

    async function sendMessage() {
        if (inputMessage.trim() === "" || isLoading) return;

        messages = [...messages, { content: inputMessage, role: "user" }];
        inputMessage = "";

        // Add loading message
        isLoading = true;
        messages = [
            ...messages,
            { content: "", role: "assistant", isLoading: true },
        ];

        let response = await chat.chat(messages.filter((m) => !m.isLoading));

        // Remove loading message and stream the response
        messages = messages.filter((m) => !m.isLoading);
        streamResponse(response);
    }

    function streamResponse(response) {
        let index = 0;
        const botMessage = { content: "", role: "assistant" };
        messages = [...messages, botMessage];

        const intervalId = setInterval(() => {
            if (index < response.length) {
                botMessage.content += response[index];
                messages = messages;
                index++;
            } else {
                clearInterval(intervalId);
                isLoading = false;
            }
        }, 50);
    }

    onMount(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });

    $: if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
</script>

<ChatProvider bind:this={chat}>
    <main class="p-10 pointer-events-auto">
        <div class="bg-ui-1 rounded-lg p-4 border">
            <div
                bind:this={chatContainer}
                class="chat-container overflow-y-auto rounded mb-4"
            >
                {#each messages as message}
                    <div
                        class="mb-2 {message.role === 'user'
                            ? 'text-right'
                            : ''}"
                    >
                        <span
                            class="inline-block px-4 py-2 rounded-lg bg-ui-2"
                            class:animate-pulse={message.isLoading}
                        >
                            {#if message.isLoading}
                                ...
                            {:else}
                                {message.content}
                            {/if}
                        </span>
                    </div>
                {/each}
            </div>
            <div class="flex flex-col relative">
                <textarea
                    bind:value={inputMessage}
                    on:keydown={(e) =>
                        e.key === "Enter" && !isLoading && sendMessage()}
                    placeholder="Type your message..."
                    class="flex-grow px-4 py-2 text-lg border rounded-lg resize-none"
                    disabled={isLoading}
                    rows="3"
                />
                <button
                    on:click={sendMessage}
                    class="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-ui-2 flex items-center justify-center focus:outline-none focus:ring-1"
                    disabled={isLoading}
                >
                    <ArrowUp class="h-5 w-5" />
                </button>
            </div>
        </div>
    </main>
</ChatProvider>

<style>
    .chat-container {
        min-height: 50vh;
    }
</style>
