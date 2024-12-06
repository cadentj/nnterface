<script lang="ts">
	import Self from "./leaf.svelte";
	import { onMount } from "svelte";
	import { modelSelector } from "$lib/editor/contexts/model-selector.svelte";
	import { createEmptyNode } from "$lib/editor/flow/utils";

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
		if (!event.dataTransfer) {
			return null;
		}	



		const newNode: Node = createEmptyNode("default");
		const moduleNode = {
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
	};

</script>

<ul class="tree {depth === 0 ? 'pl-0' : 'pl-5'}">
	<li class="tree">
		{#if tree.submodules}
			<button
				ondragstart={(event) => onDragStart(event, tree.atomic)}
				onclick={toggleExpansion}
				draggable={true}
				class="p-3 flex items-center"
			>
				<span class="mr-2">
					{#if tree.expanded}
						-
					{:else}
						+
					{/if}
				</span>
				<small class="submodule-name">{tree.name}</small>
			</button>
			{#if tree.expanded}
				{#each tree.submodules as _, i}
					<Self
						bind:tree={tree.submodules[i]}
						{nLayers}
						depth={depth + 1}
					/>
				{/each}
			{/if}
		{:else}
			<button
				ondragstart={(event) => onDragStart(event, tree.atomic)}
				draggable={true}
				class="p-3 flex items-center"
			>
				<small class="submodule-name">{tree.name}</small>
			</button>
		{/if}
	</li>
</ul>