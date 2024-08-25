<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { getContext } from "svelte";

	export let tree;
	const dispatch = createEventDispatcher();
	const toggleExpansion = () => {
		tree.expanded = !tree.expanded;
	};

	// const toggleCheck = () => {
	// 	// update the current node's state here, the UI only need to represent it,
	// 	// don't need to bind the check state to the UI
	// 	tree.checked = !tree.checked;

	// 	// emit node 'toggle' event, notify parent compnent to rebuild the entire tree's state
	// 	dispatch("toggle", {
	// 		node: tree,
	// 	});
	// };

	const type = getContext("type");

	const onDragStart = (event: DragEvent, name: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		type.set(name);

		event.dataTransfer.effectAllowed = "move";
	};
</script>

<ul>
	<li>
		{#if tree.submodules}
			<!-- <input
				type="checkbox"
				data-label={tree.name}
				checked={tree.checked}
				indeterminate={tree.indeterminate}
				on:click={toggleCheck}
			/> -->
			<span
				on:click={toggleExpansion}
				class="arrow"
				class:arrowDown={tree.expanded}
			/>
			<span
				on:dragstart={(event) => onDragStart(event, tree.name)}
				draggable={true}
			>
				{tree.name}
			</span>
			{#if tree.expanded}
				{#each tree.submodules as child}
					<svelte:self tree={child} on:toggle />
				{/each}
			{/if}
		{:else}
			<!-- <input
				type="checkbox"
				data-label={tree.name}
				checked={tree.checked}
				indeterminate={tree.indeterminate}
				on:click={toggleCheck}
			/> -->
			<span
				on:dragstart={(event) => onDragStart(event, tree.name)}
				draggable={true}
			>
				{tree.name}
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 1.2rem;
		user-select: none;
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
