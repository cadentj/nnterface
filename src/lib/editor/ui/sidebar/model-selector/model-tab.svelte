<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import Tree from "./tree.svelte";
    import { modelSelector } from "@/lib/editor/handlers/states.svelte";
    import { onMount } from "svelte";

    let tree: Tree;

    function loadModel(newModel: string | undefined) {
        if (!newModel) return;
        tree.load(newModel);
        modelSelector.modelId = newModel;
    }

    let models = [
        "openai-community/gpt2",
        "Qwen/Qwen2.5-0.5B-Instruct",
        "meta-llama/Llama-3.1-405B",
    ]

    let value = $state("Select a model");

    onMount(() => {
        if (modelSelector.modelId !== "none") {
            loadModel(modelSelector.modelId);
            value = modelSelector.modelId;
        }
    });
</script>

<div class="mb-2">
    <Select.Root type="single" bind:value onValueChange={(model) => loadModel(model)}>
        <small>Model</small>
        <Select.Trigger class="margin mb-4 mt-2">
            {value}
        </Select.Trigger>
        <Select.Content>
            {#each models as model}
                <Select.Item value={model}>{model}</Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>

    <Tree bind:this={tree}/>


</div>
