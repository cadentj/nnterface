<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import Badges from "./badges.svelte";
    import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
    import { mode } from "mode-watcher";
    import { get, type Writable } from "svelte/store";  
    import { Input } from "$lib/components/ui/input/index.js";

    type FunctionBlock = {
        functionName: string;
        inputs: string[];
        code: string;
    };

    export let functions: Writable<FunctionBlock[]>;
    export let index: number = -1;
    export let open: boolean;


    let functionName: string = index === -1 ? "" : get(functions)[index].functionName;
    let code: string = index === -1 ? "" : get(functions)[index].code;
    let inputs: string[] = index === -1 ? [] : get(functions)[index].inputs;

    const clear = () => {
        code = "";
        inputs = [];
    };

    const save = () => {
        const fn: FunctionBlock = {
            functionName: functionName,
            inputs: inputs,
            code: code,
            deletable: true,
        };

        functions.update((fns) => {
            if (index !== -1) {
                fns[index] = fn;
            } else {
                fns.push(fn);
            }
            return fns;
        });
        clear();
        open = false;
    };
</script>

<Input bind:value={functionName} class="w-15"/>
<div class="grid grid-cols-3 gap-2">
    <div class="col-span-2">
        <small>Code</small>
        <CodeMirror
            bind:value={code}
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
        <small>Inputs ({inputs.length}/5)</small>
        <Badges bind:badges={inputs} />
    </div>
    <button class="btn btn-primary" on:click={save}> Save </button>
</div>
