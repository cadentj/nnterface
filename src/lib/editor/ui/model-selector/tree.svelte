<script lang="ts">
    import Leaf from "./leaf.svelte";
    import gpt2 from "./gpt2.json";
    import { onMount } from "svelte";

    // Number of layers on model. 
    // Big assumption that models only have one module list
    let nLayers: number = 0

    function trimTree(
        tree: any,
        parent: any = null,
        isListChild: boolean = false,
    ): void {
        if (tree.submodules) {
            if (tree.type === "ModuleList" && tree.submodules.length > 0) {
                if (parent && parent.submodules) {
                    const index = parent.submodules.indexOf(tree);
                    nLayers = tree.submodules.length
                    if (index !== -1)
                        parent.submodules[index] = tree.submodules[0];
                }
                trimTree(tree.submodules[0], parent, isListChild);
            } else {
                for (const child of tree.submodules) {
                    if (isListChild) child.name = isListChild + child.name;
                    trimTree(child, tree, isListChild);
                }
            }
        }
    }

    // Parse tree on mount, set as state rune
    let tree = $state({});
    onMount(() => {
        trimTree(gpt2);
        tree = gpt2;
    });

</script>

{#if Object.keys(tree).length === 0}
    <div class="space-y-3 mt-3">
        {#each Array(5) as _, i (i)}
            penis
        {/each}
    </div>
{:else}
    <Leaf bind:tree={tree} {nLayers} />
{/if}
