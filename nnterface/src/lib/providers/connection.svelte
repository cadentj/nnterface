<script lang="ts">
    import { onDestroy, setContext } from "svelte";
    import { writable } from "svelte/store";

    const connectionType = writable(null);

    setContext("connection", connectionType);

    onDestroy(() => {
        connectionType.set(null);
    });
</script>

<slot />
