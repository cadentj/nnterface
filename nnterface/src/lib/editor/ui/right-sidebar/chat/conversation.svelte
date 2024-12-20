<script lang="ts">
    import { ArrowUp } from "lucide-svelte";

    import { useSvelteFlow, useNodes } from "@xyflow/svelte";
    import { exportGraph } from "$lib/editor/flow/utils";
    import { get } from "svelte/store";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";

    const { toObject, getIntersectingNodes, updateNodeData } = useSvelteFlow();
    const nodes = useNodes();

    async function chat(messages: Array<{ content: string; role: string }>) {
        for (const n of get(nodes)) {
            if (n.type === "chat") {
                updateNodeData(n.id, {
                    messages: messages,
                    temperature: temperature[0],
                    maxNewTokens: maxNewTokens[0],
                });
            }
        }

        let graphObject = exportGraph(nodes, getIntersectingNodes, toObject);

        const response = await fetch(`${PUBLIC_BACKEND_URL}/run/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphObject),
        });

        const result = await response.json();

        let assistantResponse: string = "";
        for (const [nodeId, data] of Object.entries(result)) {
            const parsed = JSON.parse(data as string);
            assistantResponse = parsed.at(-1)["content"];
        }

        return assistantResponse;
    }

    let messages = $state<
        Array<{
            content: string;
            role: "user" | "assistant";
            isLoading?: boolean;
        }>
    >([]);

    let inputMessage = $state("");
    let chatContainer = $state<HTMLElement>();
    let isLoading = $state(false);

    let { temperature, maxNewTokens } = $props();

    function streamResponse(response: string, messageIndex: number) {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < response.length) {
                messages[messageIndex].content += response[index];
                messages = messages; // trigger reactivity
                index++;
            } else {
                clearInterval(intervalId);
                isLoading = false;
            }
        }, 10);
    }

    async function sendMessage() {
        if (inputMessage.trim() === "" || isLoading) return;

        const userMessage = { content: inputMessage.trim(), role: "user" };
        messages = [...messages, userMessage];
        inputMessage = "";

        isLoading = true;
        messages = [
            ...messages,
            { content: "", role: "assistant", isLoading: true },
        ];

        try {
            const response = await chat(messages.filter((m) => !m.isLoading));

            messages = messages.filter((m) => !m.isLoading);
            messages = [...messages, { content: "", role: "assistant" }];

            // Start streaming the last message
            streamResponse(response, messages.length - 1);
        } catch (error) {
            console.error("Chat error:", error);
            messages = messages.filter((m) => !m.isLoading);
            messages = [
                ...messages,
                { content: "Sorry, an error occurred.", role: "assistant" },
            ];
            isLoading = false;
        }
    }

    $effect(() => {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    });
</script>

<div class="flex flex-col h-full relative">
    <div bind:this={chatContainer} class="overflow-y-auto rounded mb-4">
        {#each messages as message}
            <div class="mb-2 {message.role === 'user' ? 'text-right' : ''}">
                <span
                    class="inline-block px-4 py-2 rounded {message.role ===
                    'user'
                        ? 'bg-ui-2'
                        : 'bg-ui-3'}"
                >
                    {#if message.isLoading}
                        <span class="animate-pulse">...</span>
                    {:else}
                        {message.content}
                    {/if}
                </span>
            </div>
        {/each}
    </div>

    <div class="flex flex-col absolute bottom-0 left-0 right-0">
        <textarea
            bind:value={inputMessage}
            onkeydown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (!isLoading) sendMessage();
                }
            }}
            placeholder="Type your message..."
            class="flex-grow px-4 py-2 text-sm border bg-ui-1 rounded resize-none"
            disabled={isLoading}
            rows="3"
        ></textarea>
        <button
            onclick={sendMessage}
            class="absolute bottom-2 right-2 w-8 h-8 rounded bg-ui-2 flex items-center justify-center focus:outline-none focus:ring-1"
            disabled={isLoading}
        >
            <ArrowUp class="h-5 w-5" />
        </button>
    </div>
</div>
