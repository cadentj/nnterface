<!-- FROM: https://svelte.dev/repl/eca6f6392e294247b4f379fde3069274?version=3.46.6 -->

<script lang="ts">
    import Leaf from "./leaf.svelte";
    import pytree from "$lib/stores/editor/pytree.json";

    let tree = pytree;

    const treeMap = {};

    let nLayers: number = 0;

    function initTreeMap(
        tree: any,
        parent: any = null,
        isListChild: boolean = false,
    ) {
        if (tree.submodules) {
            if (tree.type === "ModuleList" && tree.submodules.length > 0) {
                if (parent && parent.submodules) {
                    const index = parent.submodules.indexOf(tree);
                    nLayers = tree.submodules.length;
                    if (index !== -1) parent.submodules[index] =  tree.submodules[0];
                }
                initTreeMap(tree.submodules[0], parent, isListChild);
            } else {
                for (const child of tree.submodules) {
                    if (isListChild) child.name = isListChild + child.name;
                    treeMap[child.name] = tree;
                    initTreeMap(child, tree, isListChild);
                }
            }
        }
    }

    initTreeMap(tree);
</script>

<Leaf tree={tree} nLayers={nLayers}/>
