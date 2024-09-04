<script lang="ts">
    import { X } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button/index.js";
    export let maxBadges = 5;
    export let badges: string[];
    let inputValue = "";

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            event.preventDefault();
            addBadge(inputValue.trim());
            inputValue = "";
        }
    }

    function addBadge(text: string) {
        if (badges.length < maxBadges && !badges.includes(text)) {
            badges = [...badges, text];
        }
    }

    function removeBadge(badge: string) {
        badges = badges.filter((b) => b !== badge);
    }
</script>

<div>
    <div class="flex flex-wrap gap-2">
        <Input
            bind:value={inputValue}
            on:keydown={handleKeydown}
            placeholder="Type and press Enter to add inputs..."
            disabled={badges.length >= maxBadges}
            class="my-2"
        />
        {#each badges as badge}
            <Button
                size="xs"
                class="py-0.5"
                on:click={() => removeBadge(badge)}
            >
                <span class="px-2">{badge}</span>
                <X class="h-3 w-3 mr-1" />
            </Button>
        {/each}
    </div>
</div>
