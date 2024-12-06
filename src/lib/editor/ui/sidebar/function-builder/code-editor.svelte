<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
    import { Input } from "$lib/components/ui/input/index.js";

    type FunctionBlock = {
        functionName: string;
        inputs: string[];
        code: string;
        deletable: boolean;
    };

    let {
        defaultFunctions,
        index = -1,
        open = $bindable()
    } = $props();

    let functions = $state(defaultFunctions);

    let functionName = $state(index === -1 ? "" : defaultFunctions[index].functionName);
    let code = $state(index === -1 ? "" : defaultFunctions[index].code);
    let inputs = $state<string[]>(index === -1 ? [] : defaultFunctions[index].inputs);

    const clear = () => {
        code = "";
        inputs = [];
        functionName = "";
    };

    const save = () => {
        const fn: FunctionBlock = {
            functionName: functionName,
            inputs: inputs,
            code: code,
            deletable: true,
        };

        functions.update((fns: FunctionBlock[]) => {
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
            theme={githubLight}
        />
    </div>
    <div class="col-span-1">
        <small>Inputs ({inputs.length}/5)</small>
        <!-- <Badges bind:badges={inputs} /> -->
    </div>
    <button class="btn btn-primary" onclick={save}> Save </button>
</div>
