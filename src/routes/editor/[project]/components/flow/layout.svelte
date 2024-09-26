<script lang="ts">
    export let chat: boolean;
</script>

<main class="relative h-screen w-full overflow-hidden">
    \

    <div class="absolute top-0 left-0 w-full h-[3vh] z-20">
        <slot name="navbar" />
    </div>

    <div class="absolute inset-0 z-0 h-full">
        <slot name="flow" />
    </div>

    <div
        class="absolute top-[3vh] left-0 h-auto sidebar overflow-auto z-10 pointer-events-none"
    >
        <slot name="sidebar" />
    </div>

    {#if chat}
        <div
            class="absolute top-[3vh] right-0 h-auto sidebar overflow-auto z-10 pointer-events-none"
        >
            <slot name="view" />
        </div>
    {/if}
</main>

<style>
    main {
        /* height: 95vh; */
        height: 100vh;
    }

    .sidebar {
        width: 22%;
    }
</style>
