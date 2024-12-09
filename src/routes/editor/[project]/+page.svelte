<script lang="ts">
    import Editor from "$lib/editor/editor.svelte";

    let { data } = $props();

    console.log(data)
</script>

<Editor project={data} />