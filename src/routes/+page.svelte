<script lang="ts">
    let items = ["new", "chat", "steer", "patch", "heatmap", "lens"];
    import Logo from "$lib/images/ndif.png";
</script>

<div class="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-bg-1">
    <img src={Logo} alt="Nnsight Logo" class="h-[20vh] mb-5" />
    <ul class="text-center w-[20vw]">
        {#each items as item}
            <li class="text-left p-3 my-2 border-white border rounded-lg" >
                <a href="/editor/{item}">
                    {item}
                </a>
            </li>
        {/each}
    </ul>
</div>
