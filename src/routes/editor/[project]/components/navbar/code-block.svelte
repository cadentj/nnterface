<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
    import { mode } from "mode-watcher";

    export let code: string;
</script>

<CodeMirror
    value={code}
    styles={{
        "&": {
            maxWidth: "100%",
            height: "35rem",
        },
    }}
    lang={python()}
    theme={$mode === "light" ? githubLight : githubDark}
/>
