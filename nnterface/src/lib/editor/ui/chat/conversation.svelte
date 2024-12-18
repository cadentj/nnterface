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
                console.log(n.id);
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

        let r: string = "";
        for (const [nodeId, data] of Object.entries(result)) {
            const parsed = JSON.parse(data as string);
            r = parsed.at(-1)["content"];
        }

        return r;
    }

    let messages = $state<any[]>([]);
    let inputMessage = $state("");
    let chatContainer = $state<HTMLElement>();
    let isLoading = $state(false);

    let { temperature, maxNewTokens } = $props();

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

        let response = await chat(messages.filter((m) => !m.isLoading));

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

<div class="flex flex-col h-full relative">
    <div
        bind:this={chatContainer}
        class="overflow-y-auto rounded mb-4"
    >
        {#each messages as message}
            <div class="mb-2 {message.role === 'user' ? 'text-right' : ''}">
                <span
                    class="inline-block px-4 py-2 rounded bg-ui-2"
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
    <div class="flex flex-col absolute bottom-0 left-0 right-0">
        <textarea
            bind:value={inputMessage}
            onkeydown={(e) =>
                e.key === "Enter" && !e.shiftKey && !isLoading && sendMessage()}
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