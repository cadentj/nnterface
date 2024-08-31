<script lang="ts">
	import { getContext } from "svelte";

	const type = getContext("type");

	export let blocks: string[] = [];

	const onDragStart = (event: DragEvent, name: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		type.set(name);

		event.dataTransfer.effectAllowed = "move";
	};
</script>

<div>
	{#each blocks as block}
		<button
			class="block"
			draggable="true"
			on:dragstart={(event) => onDragStart(event, block)}
		>
			{block}
		</button>
	{/each}
</div>

<style>
	.block {
		display: inline-block;
		padding: 10px 20px;
		margin: 5px;
		border-radius: 5px;
		background-color: #ffb347;
		border: 1px solid #ffa500;
		cursor: move;
	}
</style>