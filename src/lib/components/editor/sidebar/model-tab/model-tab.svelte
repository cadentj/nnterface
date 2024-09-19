<script>
    import * as Select from "$lib/components/ui/select";
    import Tree from "$lib/components/editor/sidebar/model-tab/tree.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { onMount } from "svelte";

    let loading = true;

    async function load() {
        await new Promise((resolve) => setTimeout(resolve, 500));
        loading = false;
    }

    onMount(() => {
        load();
    });
</script>

<div>
    <div class="mb-4">
        <Select.Root>
            <small>Model</small>
            <Select.Trigger class="margin">
                <Select.Value placeholder="Select a Model" />
            </Select.Trigger>
            <Select.Content>
                <Select.Item value="light">Light</Select.Item>
                <Select.Item value="dark">Dark</Select.Item>
                <Select.Item value="system">System</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>

    {#if loading}
        <div class="space-y-3 mt-3">
            {#each Array.from({ length: 5 }) as _}
                <Skeleton class="h-[20px] w-full rounded-md" />
            {/each}
        </div>
    {:else}
        <Tree />
    {/if}
</div>
