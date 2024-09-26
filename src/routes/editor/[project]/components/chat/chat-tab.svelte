<script lang="ts">
    import { onMount } from "svelte";
    import { ArrowUp } from "lucide-svelte";
    import ChatProvider from "./chat-provider.svelte";

    let messages = [];
    let inputMessage = "";
    let chatContainer;

    let chat: ChatProvider;

    async function sendMessage() {
        if (inputMessage.trim() === "") return;

        messages = [...messages, { content: inputMessage, role: "user" }];
        inputMessage = "";

        let response = await chat.chat(messages);
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
        <div class="bg-ui-1 rounded-lg p-4">
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
                        <span class="inline-block px-4 py-2 rounded-lg bg-ui-2">
                            {message.content}
                        </span>
                    </div>
                {/each}
            </div>
            <div class="flex">
                <input
                    type="text"
                    bind:value={inputMessage}
                    on:keydown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    class="flex-grow px-4 py-2 text-lg border rounded-l"
                />
                <button
                    on:click={sendMessage}
                    class="px-6 py-2 text-lg text-white rounded-r bg-ui-2 focus:outline-none focus:ring-1"
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
