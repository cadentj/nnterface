<script lang="ts">
    let { flow, leftSidebar, navbar } = $props();
</script>

<main class="layout">
    <div class="navbar">
        {@render navbar()}
    </div>

    <div class="flow">
        {@render flow()}
    </div>
    <div class="sidebar">
        {@render leftSidebar()}
    </div>
</main>