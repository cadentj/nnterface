<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import Badges from "./badges.svelte";
    import { python } from "@codemirror/lang-python";
    import Button from "@/lib/components/ui/button/button.svelte";
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

    let functionName = $state(index !== -1 ? defaultFunctions[index].functionName : "New Function");
    let code = $state(index !== -1 ? defaultFunctions[index].code : "");
    let inputs = $state(index !== -1 ? defaultFunctions[index].inputs : []);

    const clear = () => {
        functionName = "";
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

        if (index !== -1) {
            defaultFunctions[index] = fn;
        } else {
            defaultFunctions.push(fn);
        }
        
        clear();
        open = false;
    };
</script>

<Input bind:value={functionName} class="w-[95%]"/>
<div class="grid grid-cols-5 gap-5">
    <div class="col-span-4 border-r pr-5">
        <small class="pb-2">Code</small>
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
    <div class="flex flex-col justify-between">
        <div class="col-span-1">
            <small class="pb-2">Inputs ({inputs.length}/5)</small>
            <Badges maxBadges={5} bind:badges={inputs} />
        </div>
        <Button variant="secondary" onclick={save}> Save </Button>
    </div>
</div>
