<script>
    import NDIF from "./ndif.png";
    import { Code, ChevronLeft, Download } from "lucide-svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    import { useSvelteFlow } from "@xyflow/svelte";

    const { toObject} = useSvelteFlow();
</script>

<nav class="bg-transparent h-auto w-full pointer-events-none ">
    <div class="px-10 py-5 flex justify-between items-center">
        <!-- Left: Text Input -->
        <div class="flex items-center gap-4">
            <Button size="icon" variant="secondary" class="pointer-events-auto" href="/">
                <ChevronLeft class="w-5 h-5" />
            </Button>
            <input
                type="text"
                placeholder="Untitled"
                class="bg-transparent rounded px-2 py-1 pointer-events-auto text-lg"
            />
        </div>

        <!-- Center: Word -->
        <div class="text-center">
            <img src={NDIF} alt="Nnsight Logo" class="h-10" />
        </div>

        <!-- Right: Button -->
        <div class="flex items-center gap-3">
            <Button class="pointer-events-auto " variant="outline" on:click={() => console.log(toObject())}>
                Export
                <Code class="w-5 h-5 ml-2" />
            </Button>
            <Button class="pointer-events-auto">
                Save
                <Download class="w-5 h-5 ml-2" />
            </Button>
        </div>
    </div>
</nav>
