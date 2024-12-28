<script lang="ts">
    import Tokenizer from "./tokenizer.svelte";
    import * as Accordion from "$lib/components/ui/accordion/index.js";

    import { useNodes } from "@xyflow/svelte";

    const nodes = useNodes();

    const selectedNode = $derived.by(() => {
        const selected = $nodes.filter((node) => node.selected);
        return selected.length > 0 ? selected[0] : null;
    });

    function formatNodeData(data: Record<string, any>, maxLength = 100): string {
        return Object.entries(data)
            .map(([key, value]) => {
                const stringValue = JSON.stringify(value, null, 2);
                const truncated = stringValue.length > maxLength 
                    ? stringValue.slice(0, maxLength) + '...'
                    : stringValue;
                return `"${key}": ${truncated}`;
            })
            .join(',\n');
    }
</script>

<Accordion.Root type="multiple">
    <Accordion.Item value="Info">
        <Accordion.Trigger class="px-6 py-3 "
            ><div class="py-1.5">Info</div></Accordion.Trigger
        >
        <Accordion.Content>
            <div class="bg-muted rounded mx-6 mt-2 mb-3">
                {#if selectedNode}
                    <pre class="whitespace-pre-wrap break-words rounded border p-3">{formatNodeData(selectedNode.data)}</pre>
                {:else}
                    <p class="p-3 rounded border">No node selected</p>
                {/if}
            </div>
        </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="Tokenizer">
        <Accordion.Trigger class="px-6 py-3 "
            ><div class="py-1.5">Tokenizer</div></Accordion.Trigger
        >
        <Accordion.Content>
            <Tokenizer />
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
