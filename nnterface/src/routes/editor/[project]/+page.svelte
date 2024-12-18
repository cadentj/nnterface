<script lang="ts">
    import Editor from "$lib/editor/editor.svelte";
    import { fade } from 'svelte/transition';

    let { data } = $props();

    console.log(data)
</script>

<Editor project={data} />
