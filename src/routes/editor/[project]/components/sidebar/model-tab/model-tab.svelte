<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import Tree from "./tree.svelte";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import { Toggle } from "$lib/components/ui/toggle";

    let tree: Tree;
    let model: string = "";
    
    

    setContext("model", model);

    function loadModel(newModel: string | undefined) {
        if (!newModel) return;
        tree.load(newModel);
        model = newModel;
    }
</script>


<div>
    <Select.Root onSelectedChange={(value) => loadModel(value?.value)}>
        <div class="flex justify-between items-center">
            <small>Model</small>
            <span>
                <Toggle bind:pressed={$isInput}>
                    {$isInput ? "Input" : "Output"}
                </Toggle>
            </span>
        </div>
        <Select.Trigger class="margin mb-4 mt-2">
            <Select.Value placeholder="Select a Model" />
        </Select.Trigger>
        <Select.Content>
            <Select.Item value="openai-community/gpt2">GPT-2</Select.Item>
            <Select.Item value="Qwen/Qwen2.5-0.5B-Instruct">Qwen</Select.Item>
            <Select.Item value="meta-llama/Llama-3.1-405B">LLama 405b</Select.Item>
        </Select.Content>
    </Select.Root>

    <Tree bind:this={tree}/>
</div>
