<script lang="ts">
	import { getContext } from "svelte";
	

	export let tree;
	const toggleExpansion = () => {
		tree.expanded = !tree.expanded;
	};

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
			<button
				on:click={toggleExpansion}
				class="arrow"
				class:arrowDown={tree.expanded}
			/>
			<button
				on:dragstart={(event) => onDragStart(event, tree.atomic)}
				draggable={true}
				class="node"
			>
				<span class="submodule-name">{tree.name}</span>
				<small
					>&lbrace; input: {tree.input}, output: {tree.output} &rbrace;</small
				>
			</button>
			{#if tree.expanded}
				{#each tree.submodules as child}
					<svelte:self tree={child} on:toggle />
				{/each}
			{/if}
		{:else}
			<button
				on:dragstart={(event) => onDragStart(event, tree.atomic)}
				draggable={true}
				class="node"
			>
				<span class="submodule-name">{tree.name}</span>
				<small>{tree.input} {tree.output}</small>
			</button>
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

	li {
		padding: 3px;
	}

	.node {
		padding: 2px;
		font-family: monospace;
	}

	.submodule-name {
		padding: 2px;
		background-color: rgba(22, 101, 52, 0.5);
	}
</style>
