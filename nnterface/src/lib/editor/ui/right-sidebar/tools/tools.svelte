<script lang="ts">
    import Tokenizer from "./tokenizer.svelte";
    import * as Accordion from "$lib/components/ui/accordion/index.js";

    import { useNodes } from "@xyflow/svelte";

    const nodes = useNodes();

    const selectedNode = $derived.by(() => {
        const selected = $nodes.filter((node) => node.selected);
        return selected.length > 0 ? selected[0] : null;
    });
</script>

<Accordion.Root type="multiple" value={["Info", "Tokenizer"]}>
    <Accordion.Item value="Info">
        <Accordion.Trigger class="px-6 ">Info</Accordion.Trigger>
        <Accordion.Content>
            <div class="bg-muted rounded mx-6 mt-2 mb-3">
                {#if selectedNode}
                    <pre
                        class="whitespace-pre-wrap break-words rounded border p-3">{JSON.stringify(
                            selectedNode.data,
                            null,
                            2,
                        )}</pre>
                {:else}
                    <p class="p-3 rounded border">No node selected</p>
                {/if}
            </div>
        </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="Tokenizer">
        <Accordion.Trigger class="px-6">Tokenizer</Accordion.Trigger>
        <Accordion.Content>
            <Tokenizer />
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
