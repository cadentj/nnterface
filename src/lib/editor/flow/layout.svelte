<script lang="ts">
    let { children } = $props();
</script>

<main>
    {@render children?.()}
</main>

<style>
    main {
        height: 100vh;
    }
</style>
