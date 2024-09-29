<!-- FROM: https://svelte.dev/repl/eca6f6392e294247b4f379fde3069274?version=3.46.6 -->

<script lang="ts">
    import Leaf from "./leaf.svelte";

    import { Skeleton } from "$lib/components/ui/skeleton";

    let tree = {};
    let nLayers: number = 0;

    export async function load(repoId: string) {

        const response = await fetch("/api/load-model", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "repo_id" : repoId
            }),
        });

        const result = await response.json();

        let pytree = result['pytree'];

        trimTree(pytree);
        tree = pytree;
    }


    function trimTree(
        tree: any,
        parent: any = null,
        isListChild: boolean = false,
    ) {
        if (tree.submodules) {
            if (tree.type === "ModuleList" && tree.submodules.length > 0) {
                if (parent && parent.submodules) {
                    const index = parent.submodules.indexOf(tree);
                    nLayers = tree.submodules.length;
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
</script>

{#if Object.keys(tree).length === 0}
    <div class="space-y-3 mt-3">
        {#each Array.from({ length: 5 }) as _}
            <Skeleton class="h-[20px] w-full rounded-md" />
        {/each}
    </div>
{:else}
    <Leaf {tree} {nLayers} />
{/if}
