<main class="relative h-screen w-full overflow-hidden">
    <div class="absolute inset-0 z-0">
        <slot name="flow" />
    </div>

    <div
        class="absolute top-0 left-0 h-auto sidebar overflow-auto z-10 pointer-events-none"
    >
        <slot name="sidebar" />
    </div>

    <div
        class="absolute top-0 right-0 h-auto sidebar overflow-auto z-10 pointer-events-none"
    >
        <slot name="view" />
    </div>
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
