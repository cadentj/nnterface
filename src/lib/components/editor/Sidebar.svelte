<script lang="ts">
    import { useDnD } from "./utils";
    import Tree from "./tree/Tree.svelte";
    import {setContext} from "svelte";

    const type = useDnD();

    setContext("type", type)
</script>

<aside>
    <Tree />
</aside>

<style>
    aside {
        width: 100%;
        height: 100%;
        background: #f4f4f4;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        /* align-items: center; */
        padding-top: 3rem;
        padding-left: 3rem;
    }
</style>
