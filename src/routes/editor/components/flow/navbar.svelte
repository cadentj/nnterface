<script>


    import NDIF from "./ndif.png";
    import { Code } from "lucide-svelte";
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<nav class="bg-transparent h-auto w-full pointer-events-none ">
    <div class="px-10 py-5 flex justify-between items-center">
        <!-- Left: Text Input -->
        <div class="flex items-center">
            <input
                type="text"
                placeholder="Untitled"
                class="bg-transparent rounded px-2 py-1 pointer-events-auto"
            />
        </div>

        <!-- Center: Word -->
        <div class="text-center">
            <img src={NDIF} alt="Nnsight Logo" class="h-10" />
        </div>

        <!-- Right: Button -->
        <div class="flex items-center">
            <Button class="pointer-events-auto">
                Export
                <Code class="w-5 h-5 ml-2" />
            </Button>
        </div>
    </div>
</nav>
