<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import Tree from "./tree.svelte";

    let tree: Tree;
    let model: string = "";

    // function loadModel(newModel: string | undefined) {
    //     if (!newModel) return;
    //     tree.load(newModel);
    //     model = newModel;
    // }

    const fruits = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "blueberry", label: "Blueberry" },
        { value: "grapes", label: "Grapes" },
        { value: "pineapple", label: "Pineapple" }
    ];
    
    let value = $state("");
    
    const triggerContent = $derived(
        fruits.find((f) => f.value === value)?.label ?? "Select a fruit"
    );
</script>


<div class="mb-2">
    <Select.Root type="single" bind:value>
        <small>Model</small>
        <!-- <div class="flex justify-between items-center">
            <small>Model</small>
        </div> -->
        <Select.Trigger class="margin mb-4 mt-2">
            {triggerContent}
        </Select.Trigger>
        <Select.Content>
            <Select.Item value="openai-community/gpt2">GPT-2</Select.Item>
            <Select.Item value="Qwen/Qwen2.5-0.5B-Instruct">Qwen</Select.Item>
            <Select.Item value="meta-llama/Llama-3.1-405B">LLama 405b</Select.Item>
        </Select.Content>
    </Select.Root>

    <Tree bind:this={tree}/>
</div>
