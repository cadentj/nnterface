<script>
    import * as Select from "$lib/components/ui/select";
    import Tree from "./utils/tree.svelte";
</script>


<div>
    <div class="mb-4">
        <Select.Root>
            <small>Model</small>
            <Select.Trigger class="margin">
                <Select.Value placeholder="Select a Model"/>
            </Select.Trigger>
            <Select.Content>
                <Select.Item value="light">Light</Select.Item>
                <Select.Item value="dark">Dark</Select.Item>
                <Select.Item value="system">System</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>
    <Tree/>
</div>