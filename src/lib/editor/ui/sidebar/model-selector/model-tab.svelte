<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import Tree from "./tree.svelte";

    let tree: Tree;

    function loadModel(newModel: string | undefined) {
        if (!newModel) return;
        tree.load(newModel);
    }

    let models = {
        "openai-community/gpt2": "GPT-2",
        "Qwen/Qwen2.5-0.5B-Instruct": "Qwen",
        "meta-llama/Llama-3.1-405B": "LLama 405b",
    };

    let value = $state("Select a model");
</script>

<div class="mb-2">
    <Select.Root type="single" bind:value onValueChange={(model) => loadModel(model)}>
        <small>Model</small>
        <Select.Trigger class="margin mb-4 mt-2">
            {value}
        </Select.Trigger>
        <Select.Content>
            {#each Object.entries(models) as [repoId, name]}
                <Select.Item value={repoId}>{name}</Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>

    <Tree bind:this={tree}/>


</div>
