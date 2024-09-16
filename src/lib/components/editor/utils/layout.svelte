<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable";

    export let showViewPane: boolean = false;
</script>

<main>
    <Resizable.PaneGroup direction="horizontal">
        <Resizable.Pane defaultSize={1 / 5}>
            <slot name="sidebar" />
        </Resizable.Pane>
        <Resizable.Handle withHandle />

        <Resizable.Pane defaultSize={4/5}>
            <slot name="flow" />
        </Resizable.Pane>

        <!-- <Resizable.Pane defaultSize={4 / 5}>
            <Resizable.PaneGroup direction="vertical">

                <Resizable.Pane defaultSize={4/5}>
                    <slot name="flow" />
                </Resizable.Pane>

                <Resizable.Handle />

                <Resizable.Pane defaultSize={1/5}>
                    <slot name="view" />
                </Resizable.Pane>
            </Resizable.PaneGroup>
        </Resizable.Pane> -->
    </Resizable.PaneGroup>
</main>

<style>
    main {
        height: 100vh;
        display: flex;
        flex-direction: column-reverse;
    }
</style>
