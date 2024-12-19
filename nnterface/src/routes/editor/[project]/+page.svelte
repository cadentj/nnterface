<script lang="ts">
    import Editor from "$lib/editor/editor.svelte";

    let { data } = $props();

</script>

<Editor project={data} />
