<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type { Node } from "@xyflow/svelte";
	import { createEmptyNode } from "../../utils";

	export let tree;
	export let nLayers: number = 0;
	export let depth: number = 0; // New prop to keep track of the current depth

	const maxExpandDepth = 3; // Maximum depth to expand by default

	let isVariable: boolean = tree.atomic.includes(".0");
	if (isVariable) {
		tree.name = tree.name.replace(".0", `.[0-${nLayers}]`);
		tree.atomic = tree.atomic.replace(".0", `.<VAR>`);
	}

	if (tree.atomic[0] === ".") {
		tree.atomic = "model" + tree.atomic;
	}

	// Set initial expansion based on depth
	$: tree.expanded = depth < maxExpandDepth;

	const toggleExpansion = () => {
		tree.expanded = !tree.expanded;
	};

	const type: Writable<Node | null> = getContext("type");

	const onDragStart = (event: DragEvent, name: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		const newNode: Node = createEmptyNode("default");
		const moduleNode = {
			...newNode,
			type: "module",
			data: {
				variant: "module",
				moduleName: name,
				isVariable: isVariable,
				location: "output",
				index: tree.output_collection,
			},
		};
		type.set(moduleNode);

		event.dataTransfer.effectAllowed = "move";
	};
</script>

<ul class={depth === 0 ? "pl-0" : "pl-5"}>
	<li>
		{#if tree.submodules}
			<button
				on:dragstart={(event) => onDragStart(event, tree.atomic)}
				on:click={toggleExpansion}
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
				{#each tree.submodules as child}
					<svelte:self
						tree={child}
						{nLayers}
						depth={depth + 1}
						on:toggle
					/>
				{/each}
			{/if}
		{:else}
			<button
				on:dragstart={(event) => onDragStart(event, tree.atomic)}
				draggable={true}
				class="p-3 flex items-center"
			>
				<small class="submodule-name">{tree.name}</small>
			</button>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		user-select: none;
	}

	li {
		@apply border-t;
	}

	.arrow::before {
		--tw-content: "+";
		content: var(--tw-content);
		display: inline-block;
		cursor: pointer;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
			"Liberation Mono", "Courier New", monospace;
		font-size: 1rem;
		line-height: 1.5rem;
	}
	.arrowDown::before {
		--tw-content: "-";
		content: var(--tw-content);
	}
</style>
