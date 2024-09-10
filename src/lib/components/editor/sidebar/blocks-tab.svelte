<script lang="ts">
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import type { Node } from "@xyflow/svelte";
	import { createEmptyNode } from "../flow-utils";

	const type: Writable<Node | null> = getContext("type");

	export let blocks: string[] = [];

	// TEMPORARY
	const contexts: string[] = ["run", "batch", "loop"];

	const onDragStart = (event: DragEvent, name: string) => {
		if (event.dataTransfer) {
			let newNode: Node = createEmptyNode(name);

			if (contexts.includes(newNode.type)) {
				newNode.type = "context";
			}

			type.set(newNode);

			event.dataTransfer.effectAllowed = "move";
		}
	};
</script>

<div class="block-container">
	{#each blocks as block}
		<button
			class="my-3 p-2 h-10 bg-secondary border rounded-md"
			draggable="true"
			on:dragstart={(event) => onDragStart(event, block)}
		>
			{block}
		</button>
	{/each}
</div>

<style>
	.block-container {
		display: flex;
		flex-direction: column;
	}
</style>
