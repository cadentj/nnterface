<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Clipboard } from "lucide-svelte";
    import "highlight.js/styles/github-dark.css";
    import hljs from "highlight.js/lib/core";
    import python from "highlight.js/lib/languages/python";

    hljs.registerLanguage("python", python);

    let { code } = $props();

    const highlightedCode = hljs.highlight(code, {
        language: "python",
    }).value;
</script>

<div class="relative">
    <Button
        variant="outline"
        size="icon"
        class="absolute top-2 right-2 h-8 w-8"
        onclick={() => navigator.clipboard.writeText(code)}
    >
        <Clipboard class="w-5 h-5" />
    </Button>
    <pre class="border rounded-md p-3 text-sm overflow-scroll">
{@html $state.snapshot(highlightedCode)}
</pre>
</div>
