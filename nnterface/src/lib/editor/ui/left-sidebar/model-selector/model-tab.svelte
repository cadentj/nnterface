<script lang="ts">
    import { onMount } from "svelte";
    import Tree from "./tree.svelte";
    import * as Select from "$lib/components/ui/select";
    import { modelSelector } from "@/lib/editor/handlers/states.svelte";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';

    let tree: Tree;
    let baseModels: string[] = $state([]);
    let chatModels: string[] = $state([]);
    let value = $state("Select a model");

    function loadModel(newModel: string | undefined) {
        if (!newModel) return;
        tree.load(newModel);
        modelSelector.modelId = newModel;
        modelSelector.isChatModel = chatModels.includes(newModel);
    }

    async function load() {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/models/available`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        baseModels = [...result.local.base, ...result.remote.base];
        chatModels = [...result.local.chat, ...result.remote.chat];
    }

    onMount(() => {
        if (modelSelector.modelId !== "none") {
            loadModel(modelSelector.modelId);
            value = modelSelector.modelId;
        }

        load();
    });
</script>

{#snippet group(name: string, models: string[])}
    <Select.Group>
        <Select.GroupHeading>{name}</Select.GroupHeading>
        {#each models as model}
            <Select.Item value={model}>&emsp;{model}</Select.Item>
        {/each}
    </Select.Group>
{/snippet}

<div class="mb-2">
    <Select.Root type="single" bind:value onValueChange={(model) => loadModel(model)}>
        <small>Model</small>

        <Select.Trigger class="margin mb-4 mt-2">
            {value}
        </Select.Trigger>


        <Select.Content>
            {@render group("Base Models", baseModels)}
            {@render group("Chat Models", chatModels)}
        </Select.Content>
    </Select.Root>

    <Tree bind:this={tree}/>
</div>
