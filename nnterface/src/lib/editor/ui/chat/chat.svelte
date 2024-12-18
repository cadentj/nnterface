<script lang="ts">
    import { ArrowUp } from "lucide-svelte";
    import ChatProvider from "./text-provider.svelte";

    let messages = $state<any[]>([]);
    let inputMessage = $state("");
    let chatContainer = $state<HTMLElement>();
    let isLoading = $state(false);
    let chat = $state<ChatProvider>();

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

        let response = await chat?.chat(messages.filter((m) => !m.isLoading));

        // Remove loading message and stream the response
        messages = messages.filter((m) => !m.isLoading);
        streamResponse(response);
    }

    function streamResponse(response: string) {
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

    $effect(() => {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    });
</script>

<ChatProvider bind:this={chat}>
    <div
        bind:this={chatContainer}
        class="chat-container overflow-y-auto rounded mb-4"
    >
        {#each messages as message}
            <div class="mb-2 {message.role === 'user' ? 'text-right' : ''}">
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
            onkeydown={(e) =>
                e.key === "Enter" && !e.shiftKey && !isLoading && sendMessage()}
            placeholder="Type your message..."
            class="flex-grow px-4 py-2 text-sm border bg-ui-1 rounded-lg resize-none"
            disabled={isLoading}
            rows="3"
        ></textarea>
        <button
            onclick={sendMessage}
            class="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-ui-2 flex items-center justify-center focus:outline-none focus:ring-1"
            disabled={isLoading}
        >
            <ArrowUp class="h-5 w-5" />
        </button>
    </div>
</ChatProvider>

<style>
    .chat-container {
        min-height: 50vh;
        max-height: calc(100vh - 15rem);
    }
</style>
