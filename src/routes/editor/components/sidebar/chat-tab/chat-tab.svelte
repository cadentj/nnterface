<script>
    import { onMount } from "svelte";
    import { ArrowUp } from "lucide-svelte";
    import { useSvelteFlow, useNodes } from "@xyflow/svelte";
    import { updateIntersections } from "../../utils";

    let messages = [];
    let inputMessage = "";
    let chatContainer;

    const { toObject, getIntersectingNodes, updateNodeData  } = useSvelteFlow();

    function sendMessage() {
        if (inputMessage.trim() === "") return;

        messages = [...messages, { content: inputMessage, role: "user" }];
        inputMessage = "";

        updateNodeIntersections();
    }

    async function createItem() {
        updateNodeData("chat0", {messages:messages});

        const response = await fetch("/api/compile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toObject()),
        });

        const result = await response.json();

        for (const [nodeId, data] of Object.entries(result)) {
            let r = JSON.parse(data).at(-1)['content']; 
            streamResponse(r);
        }

        console.log(result);
    }


    let nodes = useNodes();

    const updateNodeIntersections = () => {
        $nodes = updateIntersections($nodes, getIntersectingNodes);
        createItem();
    };

    function streamResponse(response) {
        let index = 0;
        const botMessage = { content: "", role: "bot" };
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

<main class="p-10 pointer-events-auto">
    <div class="bg-ui-1 rounded-lg p-4">
        <div
            bind:this={chatContainer}
            class="chat-container overflow-y-auto rounded mb-4"
        >
            {#each messages as message}
                <div class="mb-2 {message.role === 'user' ? 'text-right' : ''}">
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

<style>
    .chat-container {
        min-height: 50vh;
    }
</style>
