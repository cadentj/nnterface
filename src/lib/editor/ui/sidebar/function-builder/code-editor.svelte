<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { githubDark } from "@uiw/codemirror-theme-github";
    import { Input } from "$lib/components/ui/input/index.js";
    import { defaultFunctions } from "./default-functions.svelte";

    type FunctionBlock = {
        functionName: string;
        inputs: string[];
        code: string;
        deletable: boolean;
    };

    let {
        index = -1,
        open = $bindable()
    } = $props();

    let functionName = $state(defaultFunctions[index].functionName);
    let code = $state(defaultFunctions[index].code);
    let inputs = $state<string[]>(defaultFunctions[index].inputs);

    const clear = () => {
        functionName = "";
        code = "";
        inputs = [];
    };

    if (index === -1) {
        clear();
    }

    const save = () => {
        const fn: FunctionBlock = {
            functionName: functionName,
            inputs: inputs,
            code: code,
            deletable: true,
        };

        if (index !== -1) {
            defaultFunctions[index] = fn;
        } else {
            defaultFunctions.push(fn);
        }
        
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
            theme={githubDark}
        />
    </div>
    <div class="col-span-1">
        <small>Inputs ({inputs.length}/5)</small>
        <!-- <Badges bind:badges={inputs} /> -->
    </div>
    <button class="btn btn-primary" onclick={save}> Save </button>
</div>
