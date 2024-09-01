<!-- FROM: https://svelte.dev/repl/eca6f6392e294247b4f379fde3069274?version=3.46.6 -->

<script>
    import Node from "./Node.svelte";

    // TODO: Add actual loading for firebase tree
    import pytree from "./pytree.json";

    let tree = pytree;

    const treeMap = {
        // child.label: parent node
    };
    function initTreeMap(tree) {
        if (tree.submodules) {
            for (const child of tree.submodules) {
                treeMap[child.name] = tree;
                initTreeMap(child);
            }
        }
    }
    initTreeMap(tree);

    function rebuildSubmodules(node, checkAsParent = true) {
        if (node.submodules) {
            for (const child of node.submodules) {
                if (checkAsParent) child.checked = !!node.checked;
                rebuildSubmodules(child, checkAsParent);
            }
            node.indeterminate =
                node.submodules.some((c) => c.indeterminate) ||
                (node.submodules.some((c) => !!c.checked) &&
                    node.submodules.some((c) => !c.checked));
        }
    }

    function rebuildTree(e, checkAsParent = true) {
        const node = e.detail.node;
        let parent = treeMap[node.name];
        rebuildSubmodules(node, checkAsParent);
        while (parent) {
            const allCheck = parent.submodules.every((c) => !!c.checked);
            if (allCheck) {
                parent.indeterminate = false;
                parent.checked = true;
            } else {
                const haveCheckedOrIndetermine = parent.submodules.some(
                    (c) => !!c.checked || c.indeterminate,
                );
                if (haveCheckedOrIndetermine) {
                    parent.indeterminate = true;
                } else {
                    parent.indeterminate = false;
                }
                parent.checked = false;
            }

            parent = treeMap[parent.name];
        }
        tree = tree;
        // see console the tree state when there's a state changed
        // console.log(tree)
    }
    // init the tree state
    rebuildTree({ detail: { node: tree } }, false);
</script>

<div>
    <Node {tree} on:toggle={rebuildTree}/>
</div>

<style>
</style>
