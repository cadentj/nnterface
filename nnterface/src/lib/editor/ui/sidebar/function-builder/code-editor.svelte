<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import Badges from "./badges.svelte";
    import { python } from "@codemirror/lang-python";
    import Button from "@/lib/components/ui/button/button.svelte";
    import { githubDark } from "@uiw/codemirror-theme-github";
    import { Keyboard } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input/index.js";
    import { defaultFunctions } from "@/lib/editor/handlers/states.svelte";
    import { Toggle } from "$lib/components/ui/toggle/index.js";

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

    let functionName = $state(index !== -1 ? defaultFunctions.functions[index].functionName : "New Function");
    let code = $state(index !== -1 ? defaultFunctions.functions[index].code : "");
    let inputs = $state(index !== -1 ? defaultFunctions.functions[index].inputs : []);
    let typedArgs = $state(index !== -1 ? defaultFunctions.functions[index].typedArgs : {});

    let useTypedArgs = $state(false);
    
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
            typedArgs: typedArgs
        };

        if (index !== -1) {
            defaultFunctions.functions[index] = fn;
        } else {
            defaultFunctions.functions.push(fn);
        }
        
        clear();
        open = false;
    };

    console.log(githubDark);
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
            <div class="flex items-center justify-between">
                <small>Inputs ({inputs.length + Object.keys(typedArgs).length}/5)</small>
                <Toggle class="w-5 h-8" bind:pressed={useTypedArgs}>
                    <Keyboard class="w-4 h-4" />
                </Toggle>
            </div>
            <Badges maxBadges={5} bind:badges={inputs} bind:typedArgs={typedArgs} bind:useTypedArgs={useTypedArgs} />
        </div>
        <Button variant="secondary" onclick={save}> Save </Button>
    </div>
</div>
