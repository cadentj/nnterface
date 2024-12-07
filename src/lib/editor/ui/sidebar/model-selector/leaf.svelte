<script lang="ts">
	import Self from "./leaf.svelte";
	import { onMount } from "svelte";
	import { modelSelector } from "@/lib/editor/handlers/states.svelte";
	import { createEmptyNode } from "$lib/editor/flow/utils";
	import { ChevronRight, ChevronDown } from "lucide-svelte";
	import { slide } from "svelte/transition";

	let {
		nLayers,
		depth = 0,
		tree = $bindable(),
	} = $props();
	const maxExpandDepth = 3;

	// Update initial expansion based on depth
	tree.expanded = depth < maxExpandDepth;

	function toggleExpansion() {
		tree.expanded = !tree.expanded;
	}

	onMount(() => {
		if (tree.atomic?.[0] === ".") {
			tree.atomic = "model" + tree.atomic;
		}
	});

	const onDragStart = (event: DragEvent, name: string) => {
		if (event.dataTransfer) {
			const newNode: Node = createEmptyNode("default");
			const moduleNode: Node = {
				...newNode,
				type: "module",
				data: {
					isInput: false,
					variant: "module",
					moduleName: name,
					isVariable: false,
					location: "output",
					isTuple: tree.output_collection,
				},
			};

			modelSelector.draggedType = moduleNode;

			event.dataTransfer.effectAllowed = "move";
		}	
	};

</script>

<ul class="tree {depth === 0 ? 'pl-0' : 'pl-5'} ">
	<li class="tree {depth === 0 ? '!border-none' : ''}">
		{#if tree.submodules}
			<button
				ondragstart={(event) => onDragStart(event, tree.atomic)}
				onclick={toggleExpansion}
				draggable={true}
				class="p-3 flex items-center"
			>
				<span class="mr-2 text-gray-600">
					{#if tree.expanded}
						<ChevronDown size={12} class="text-primary"/>
					{:else}
						<ChevronRight size={12} class="text-primary"/>
					{/if}
				</span>
				{tree.name}
			</button>
			{#if tree.expanded}
				<div transition:slide={{ duration: 200 }}>
					{#each tree.submodules as _, i}
						<Self
							bind:tree={tree.submodules[i]}
							{nLayers}
							depth={depth + 1}
						/>
					{/each}
				</div>
			{/if}
		{:else}
			<button
				ondragstart={(event) => onDragStart(event, tree.atomic)}
				draggable={true}
				class="p-3 flex items-center"
			>
				<!-- <span class="mr-2 text-gray-600">
					<ChevronRight size={18} />
				</span> -->
				{tree.name}
			</button>
		{/if}
	</li>
</ul>