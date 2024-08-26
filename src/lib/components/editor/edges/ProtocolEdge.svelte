<script lang="ts">
    import {
        getBezierPath,
        BaseEdge,
        type EdgeProps,
        EdgeLabelRenderer,
    } from "@xyflow/svelte";

    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    type $$Props = EdgeProps;

    export let sourceX: $$Props["sourceX"];
    export let sourceY: $$Props["sourceY"];
    export let sourcePosition: $$Props["sourcePosition"];
    export let targetX: $$Props["targetX"];
    export let targetY: $$Props["targetY"];
    export let targetPosition: $$Props["targetPosition"];
    export let markerEnd: $$Props["markerEnd"] = undefined;
    export let style: $$Props["style"] = undefined;

    let protocol = "get"

    $: [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

</script>

<BaseEdge path={edgePath} {markerEnd} {style} />
<EdgeLabelRenderer>
    <div
        class="edgeButtonContainer nodrag nopan"
        style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
    >
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button variant="outline" builders={[builder]}>{protocol}</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content class="w-56">
              <DropdownMenu.Label>Select Protocol</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup bind:value={protocol}>
                <DropdownMenu.RadioItem value="get">Get</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="set">Set</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="apply">Apply</DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
    </div>
</EdgeLabelRenderer>

<style>
    .edgeButtonContainer {
        position: absolute;
        font-size: 12pt;
        /* EdgeLabelRenderer has no pointer events by default */
        pointer-events: all;
    }
</style>
