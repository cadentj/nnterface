<script lang="ts">
	import Self from "./leaf.svelte";
	let {
		nLayers,
		depth = 0,
		tree = $bindable(),
	} = $props();

	const maxExpandDepth = 3;

	if (tree.atomic?.[0] === ".") {
		tree.atomic = "model" + tree.atomic;
	}

	// Set initial expansion based on depth
	tree.expanded = depth < maxExpandDepth;


	const toggleExpansion = () => {
		tree.expanded = !tree.expanded;
	};
</script>

<ul class="tree {depth === 0 ? 'pl-0' : 'pl-5'}">
	<li class="tree">
		{#if tree.submodules}
			<button
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
				draggable={true}
				class="p-3 flex items-center"
			>
				<small class="submodule-name">{tree.name}</small>
			</button>
		{/if}
	</li>
</ul>