<script lang="ts">
    import ToolsTab from "./tools/tools.svelte";
    import ChatTab from "./chat/chat-tab.svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import Graph from "./graph/graphs.svelte";
    import { Separator } from "$lib/components/ui/separator/index.js";

    import { editor } from "$lib/editor/handlers/states.svelte";

</script>

<div class='h-full bg-card overflow-scroll'>
    <Tabs.Root value="tools" class="h-full" id="sidebar">
        <div class="px-6 py-3">
            <Tabs.List>
                <Tabs.Trigger value="tools" class="w-full h-full">Tools</Tabs.Trigger>
                <Tabs.Trigger value="graph" class="w-full h-full">Graph</Tabs.Trigger>
                <Tabs.Trigger value="chat" class="w-full h-full" disabled={!editor.chatNodeExists}>Chat</Tabs.Trigger>
            </Tabs.List>
        </div>

        <Separator/>
        
        <div class="h-full">
            <Tabs.Content class="h-full" value="chat">
                <ChatTab/>
            </Tabs.Content> 
            <Tabs.Content value="graph">
                <Graph/>
            </Tabs.Content>
            <Tabs.Content value="tools">
                <ToolsTab/>
            </Tabs.Content>
        </div>
    </Tabs.Root>
</div>