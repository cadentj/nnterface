<script lang="ts">
    import { moveNode } from "../defaults";
    import { type Menu } from "$lib/components/types/menu";

    export let width: number;
    export let height: number;

    let menu: Menu | null = null;

    export function handleContextMenu({ detail: { event, node } }) {
        // Prevent native context menu from showing
        event.preventDefault();

        // Calculate position of the context menu. We want to make sure it
        // doesn't get positioned off-screen.
        const sidebarWidth =
            document.getElementById("sidebar")?.clientWidth || 0;
        const w = event.clientX;
        const h = event.clientY - 50;

        menu = {
            id: node.id,
            top: h < height - 200 ? h : undefined,
            left: w < width - 200 ? w : undefined,
            right: w >= width - 200 ? width - w : undefined,
            bottom: h >= height - 200 ? height - h : undefined,
        };
    }

    export function closeMenu() {
        menu = null;
    }
</script>

{#if menu}
    <button
        style="top: {menu.top}px; left: {menu.left}px; right: {menu.right}px; bottom: {menu.bottom}px;"
        class="context-menu"
        on:click={closeMenu}
    >
        <p style="margin: 0.5em;">
            <small>node: {menu.id}</small>
        </p>
        <button
            on:click={() => {
                moveNode(menu.id, "forward");
            }}>forward</button
        >
        <button
            on:click={() => {
                moveNode(menu.id, "backward");
            }}>backward</button
        >
    </button>
{/if}

<style>
    .context-menu {
        background: var(--bg-secondary);
        border-style: solid;
        box-shadow: 10px 19px 20px rgba(0, 0, 0, 10%);
        position: absolute;
        z-index: 10;
    }

    .context-menu button {
        border: none;
        display: block;
        padding: 0.5em;
        text-align: left;
        width: 100%;
    }

    .context-menu button:hover {
        background: var(--bg-primary);
    }
</style>
