<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import { X } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button/index.js";
    export let maxBadges = 5;
    let badges: string[] = [];
    let inputValue = "";

    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        const value = target.value;

        if (value.endsWith(" ") && value.trim() !== "") {
            addBadge(value.trim());
            inputValue = "";
        } else {
            inputValue = value;
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
    <span class="text-xs text-gray-400">
        {badges.length}/{maxBadges}
    </span>
    <div class="flex flex-wrap gap-2">
        {#each badges as badge}
            <Button size="sm" on:click={() => removeBadge(badge)}>
                {badge}
                <X class="ml-2 h-3 w-3" />
            </Button>
        {/each}
    </div>
    <Input
        bind:value={inputValue}
        on:input={handleInput}
        placeholder="Type and press space to add inputs..."
        disabled={badges.length >= maxBadges}
    />
</div>
