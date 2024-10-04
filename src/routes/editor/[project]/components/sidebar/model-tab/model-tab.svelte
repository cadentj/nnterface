<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import Tree from "./tree.svelte";
    import { setContext } from "svelte";

    let tree: Tree;

    function loadModel(model: string) {
        tree.load(model);
        setContext("model", model);
    }
</script>

<div>
    <Select.Root onSelectedChange={(value) => loadModel(value.value)}>
        <small>Model</small>
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
