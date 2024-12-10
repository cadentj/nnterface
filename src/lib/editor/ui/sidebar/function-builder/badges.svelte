<script lang="ts">
    import { X } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    // import { defaultFunctions } from "./default-functions.svelte";

    let {
        maxBadges = 5,
        badges = $bindable(),
        typedArgs = $bindable(),
        useTypedArgs = $bindable(),
    } = $props();

    let inputValue = $state("");

    let totalArgs = $derived(badges.length + Object.keys(typedArgs).length);

    function handleKeydown(event: KeyboardEvent) {
        let input = inputValue.trim();
        if (event.key === "Enter" && input !== "") {
            event.preventDefault();
            if (useTypedArgs) {
                addTypedArg(input);
            } else {
                addBadge(input);
            }
            inputValue = "";
        }
    }

    function addBadge(text: string) {
        if (totalArgs < maxBadges && !badges.includes(text)) {
            badges = [...badges, text];
        }
    }

    function removeBadge(badge: string) {
        badges = badges.filter((b) => b !== badge);
    }

    function addTypedArg(text: string) {
        if (totalArgs < maxBadges && !Object.keys(typedArgs).includes(text)) {
            typedArgs = { ...typedArgs, [text]: text };
        }
    }

    function removeTypedArg(key: string) {
        typedArgs = Object.fromEntries(Object.entries(typedArgs).filter(([k]) => k !== key));
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
        {#each Object.keys(typedArgs) as key}
            <Button
                size="xs"
                class="py-0.5"
                variant="outline"
                onclick={() => removeTypedArg(key)}
            >
                <span class="px-2">{key}</span>
                <X class="h-3 w-3 mr-1" />
            </Button>
        {/each}
    </div>
</div>
