<script lang="ts">
    import Leaf from "./leaf.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";

    let tree = $state({});
    const maxExpandDepth = 3;

    export async function load(repoId: string) {
        const response = await fetch("/api/load-model", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "repo_id": repoId,
            }),
        });

        const result = await response.json();
        let pytree = result['pytree'];

        trimTree(pytree, null, false, 0);
        tree = pytree;
    }

    // Big assumption that models only have one module list
    let nLayers = $state(0);

    function trimTree(
        tree: any,
        parent: any = null,
        isListChild: boolean = false,
        currentDepth: number = 0,
    ): void {
        // Set initial expansion state based on current depth
        tree.expanded = currentDepth < maxExpandDepth;
        
        if (tree.submodules) {
            if (tree.type === "ModuleList" && tree.submodules.length > 0) {
                if (parent && parent.submodules) {
                    const index = parent.submodules.indexOf(tree);
                    nLayers = tree.submodules.length;
                    if (index !== -1)
                        parent.submodules[index] = tree.submodules[0];
                }
                trimTree(tree.submodules[0], parent, isListChild, currentDepth);
            } else {
                for (const child of tree.submodules) {
                    if (isListChild) child.name = isListChild + child.name;
                    trimTree(child, tree, isListChild, currentDepth + 1);
                }
            }
        }
    }
</script>



<div>
    {#if Object.keys(tree).length === 0}
        <div class="space-y-3 mt-3">
            {#each Array(5) as _, i (i)}
            <Skeleton class="h-[20px] w-full bg-ui-2 rounded-md" />
            {/each}
        </div>
    {:else}
        <Leaf bind:tree {nLayers} depth={0} />
    {/if}
</div>
