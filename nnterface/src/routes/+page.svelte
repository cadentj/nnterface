<script lang="ts">
    let items = [
        "new",
        "node-connections",
        "chat",
        "heatmap",
        "lens",
        "steering",
        "patching",
    ];
</script>

<svelte:head>
    <title>NNterface</title>
</svelte:head>

<div 
    class="flex flex-col w-page h-[100vh] items-center justify-center"
>
    <ul class="text-center w-[20vw] z-10">
        {#each items as item}
            <li class="text-left my-2 w-full border rounded">
                <a
                    href="/editor/{item}"
                    class="block w-full h-full p-3 gradient-link relative"
                >
                    <div class="absolute inset-0 gradient-overlay"></div>
                    <span class="relative z-10">{item}</span>
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .gradient-link {
        background: transparent;
    }

    .gradient-overlay {
        background: linear-gradient(135deg, rgba(147, 89, 146, 1), rgba(46, 131, 175, 1));
        opacity: 0;
        border-radius: 2px;
        transition: opacity 1.0s ease;
    }

    .gradient-link:hover .gradient-overlay {
        opacity: 1;
    }
</style>