<script lang="ts">
    import { ChevronLeft } from "lucide-svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import ExportButton from "./export-button.svelte";
    import SaveButton from "./save-button.svelte";
    import Status from "./status.svelte";

    let { title } = $props();

    let titleSize = $derived(title.length > 20 ? 20 : title.length);
</script>

<nav
    class="h-full w-full flex justify-between items-center px-6 bg-card border-b"
>
    <!-- Left: Text Input -->
    <div class="flex items-center gap-2">
        <Button size="icon" variant="outline" class="h-8 w-8" href="/">
            <ChevronLeft class="w-5 h-5" />
        </Button>
        

        <Status />
        <input
            type="text"
            bind:value={title}
            size={titleSize}
            class="bg-transparent rounded px-2 py-1 hover:!border"
        />
    </div>

    <!-- Right: Button -->
    <div class="flex items-center gap-3">
        <ExportButton />
        <SaveButton />
    </div>
</nav>
