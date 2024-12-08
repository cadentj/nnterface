<script lang="ts">
    import { X } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    // import { defaultFunctions } from "./default-functions.svelte";

    let {
        maxBadges = 5,
        badges = $bindable(),
    } = $props();

    let inputValue = $state("");

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
            onkeydown={handleKeydown}
            placeholder="Type and press enter ..."
            disabled={badges.length >= maxBadges}
            class="my-2"
        />
        {#each badges as badge}
            <Button
                size="xs"
                class="py-0.5"
                onclick={() => removeBadge(badge)}
            >
                <span class="px-2">{badge}</span>
                <X class="h-3 w-3 mr-1" />
            </Button>
        {/each}
    </div>
</div>
