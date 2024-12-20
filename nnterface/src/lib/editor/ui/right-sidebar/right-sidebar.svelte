<script lang="ts">
    import Tokenizer from "./tokenizer.svelte";
    import ChatTab from "./chat/chat-tab.svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import Graph from "./graph/graphs.svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";

</script>

<div class='h-full bg-card'>
    <Tabs.Root value="chat" id="sidebar">
        <div class="px-6 py-3">
            <Tabs.List>
                <Tabs.Trigger value="chat" class="w-full h-full">Chat</Tabs.Trigger>
                <Tabs.Trigger value="graph" class="w-full h-full">Graph</Tabs.Trigger>
                <Tabs.Trigger value="tools" class="w-full h-full">Tools</Tabs.Trigger>
            </Tabs.List>
        </div>

        <Separator/>
        
        <div>
            <Tabs.Content value="chat">
                <ChatTab/>
            </Tabs.Content> 
            <Tabs.Content value="graph">
                <Graph/>
            </Tabs.Content>
            <Tabs.Content value="tools">
                <Tokenizer/>
            </Tabs.Content>
        </div>
    </Tabs.Root>
</div>