<script lang="ts">
    import NDIF from "./ndif.png";
    import { ChevronLeft, Download } from "lucide-svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import ExportButton from "./export-button.svelte";
    import SaveButton from "./save-button.svelte";
    let { title } = $props();
</script>

<nav class="h-full w-full flex justify-between items-center px-6 bg-card">
    <!-- Left: Text Input -->
    <div class="flex items-center gap-4">
        <Button
            size="icon"
            variant="secondary"
            href="/"
        >
            <ChevronLeft class="w-5 h-5" />
        </Button>
        <input
            type="text"
            bind:value={title}
            class="bg-transparent rounded px-2 py-1 text-lg"
        />
    </div>

    <!-- Center: Word -->
    <!-- <div class="text-center">
        <img src={NDIF} alt="Nnsight Logo" class="h-10" />
    </div> -->

    <!-- Right: Button -->
    <div class="flex items-center gap-3">
        <ExportButton />
        <SaveButton />
    </div>
</nav>
