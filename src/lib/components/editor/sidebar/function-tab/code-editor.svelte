<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import Badges from "../utils/badges.svelte";
    import { githubLight, githubDark } from "@uiw/codemirror-theme-github";

    import { mode } from "mode-watcher";

    let value: string;

    export let save; 

    let badges: string[] = [];
</script>

<div class="grid grid-cols-3 gap-2">
    <div class="col-span-2">
        <small>Code</small>
        <CodeMirror
            bind:value
            styles={{
                "&": {
                    maxWidth: "100%",
                    height: "35rem",
                },
            }}
            lang={python()}
            theme={$mode === "light" ? githubLight : githubDark}
        />
    </div>
    <div class="col-span-1">
        <small>Inputs ({badges.length}/5)</small>
        <Badges bind:badges />
    </div>
    <button class="btn btn-primary" on:click={save}>
        Save
    </button>
</div>
