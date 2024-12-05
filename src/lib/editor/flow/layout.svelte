<script lang="ts">
    let { flow, leftSidebar } = $props();
</script>

<main class="layout">
    <div class="flow">
        {@render flow()}
    </div>
    <div class="sidebar">
        {@render leftSidebar()}
    </div>
</main>