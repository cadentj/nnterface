<script lang="ts">
	import Self from "./leaf.svelte";
	import { onMount } from "svelte";
	import { modelSelector } from "@/lib/editor/handlers/states.svelte";
	import { createEmptyNode } from "$lib/editor/flow/utils";
	import { ChevronRight, ChevronDown, GripVertical } from "lucide-svelte";
	import { slide } from "svelte/transition";
	import { type Node } from "@xyflow/svelte";

	let { nLayers, depth, tree = $bindable() } = $props();

	onMount(() => {
		if (tree.atomic) {
			// Handle variable case
			if (tree.atomic.includes(".0")) {
				const replacement = `.[0-${nLayers}]`;
				tree.name = tree.name.replace(".0", replacement);
				tree.atomic = tree.atomic.replace(".0", ".<VAR>");
			}

			// Add model prefix if needed
			if (tree.atomic[0] === ".") {
				tree.atomic = `model${tree.atomic}`;
			}
		}
	});

	function createDragPreview(name: string): HTMLDivElement {
		const preview = document.createElement("div");
		preview.className = "p-2 h-10 bg-ui-2 w-[10vw] border rounded flex items-center justify-center";
		preview.textContent = name;
		document.body.appendChild(preview);
		return preview;
	}

	function onDragStart(event: DragEvent) {
		if (!event.dataTransfer) return;

		const moduleNode: Node = {
			...createEmptyNode("default"),
			type: "module",
			data: {
				isInput: false,
				variant: "module",
				moduleName: tree.atomic,
				isVariable: false,
				location: "",
				isTuple: tree.output_collection,
			},
		};

		modelSelector.draggedType = moduleNode;
		event.dataTransfer.effectAllowed = "move";

		const preview = createDragPreview(tree.name);
		event.dataTransfer.setDragImage(preview, 0, 0);
		setTimeout(() => preview.remove(), 100);
	}
</script>

<ul class="tree w-full {depth === 0 ? 'pl-0' : 'pl-5'}">
	<li class="tree w-full {depth === 0 ? '!border-none' : ''}">
		<button
			ondragstart={onDragStart}
			onclick={() => tree.submodules && (tree.expanded = !tree.expanded)}
			draggable={true}
			class="group"
		>
			<div class="icon-container">
				{#if tree.submodules}
					<div class="chevron">
						{#if tree.expanded}
							<ChevronDown size={12} class="text-primary" />
						{:else}
							<ChevronRight size={12} class="text-primary" />
						{/if}
					</div>
				{/if}
				<div class="grip">
					<GripVertical size={14} class="text-gray-400" />
				</div>
			</div>
			<span class="name">
				{tree.name}
			</span>
		</button>

		{#if tree.submodules && tree.expanded}
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
	</li>
</ul>

<style lang="postcss">
	.tree li {
		@apply border-t;
	}

	.tree li button {
		@apply w-full flex items-center cursor-grab p-3 relative;
	}

	.tree li button:hover {
		@apply !font-bold;
	}

	.icon-container {
		@apply relative w-5 flex items-center;
	}

	.chevron {
		@apply absolute transition-opacity duration-200;
	}

	.grip {
		@apply absolute opacity-0 transition-all duration-200 -translate-x-1;
	}

	.group:hover .chevron {
		@apply opacity-0;
	}

	.group:hover .grip {
		@apply opacity-100 translate-x-0;
	}

	.name {
		@apply transition-all duration-200;
	}

	.group:hover .name {
		@apply translate-x-1;
	}
</style>
