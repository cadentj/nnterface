<script lang="ts">
    import { useSvelteFlow, useNodes} from "@xyflow/svelte";
    import { exportGraph } from "$lib/editor/flow/utils";
    import { get } from "svelte/store";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';

    const { toObject, getIntersectingNodes, updateNodeData } = useSvelteFlow();

    const nodes = useNodes();

    export async function generate(messages: string) {

        console.log(messages)
        for (const n of get(nodes)) {
            if (n.type === "chat") {
                updateNodeData(n.id, { messages: messages });
            }
        }

        let graphObject = exportGraph(
            nodes,
            getIntersectingNodes,
            toObject,
        );
        
        console.log(graphObject)

        const response = await fetch(`${PUBLIC_BACKEND_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphObject),
        });

        const result = await response.json();
        
        let r: string = "";
        for (const [nodeId, data] of Object.entries(result)) {
            r = data.slice(1, -1);
        }

        return r;
    }


    export async function chat(messages: Array<{content: string, role: string}>) {
        for (const n of get(nodes)) {
            if (n.type === "chat") {
                updateNodeData(n.id, { messages: messages });
                console.log(n.id)
            }
        }

        let graphObject = exportGraph(
            nodes,
            getIntersectingNodes,
            toObject,
        );
        
        const response = await fetch("/api/chat", {
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
            r = parsed.at(-1)['content']; 
        }

        return r;
    }
</script>

<slot/>