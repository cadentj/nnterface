<script lang="ts">
    import { onMount } from "svelte";
    import * as Plot from "@observablehq/plot";

    let div: HTMLDivElement;

    let {
        dataToGraph,
    } = $props();

    onMount(() => {
        plot();
    });

    $effect(() => {
        div?.firstChild?.remove();
        plot();
    });

    function plot() {
        if (!div || !dataToGraph.length) return;

        const flatData = dataToGraph.flatMap((row, y) =>
            row.map((value, x) => ({ x, y, value }))
        );

        const width = dataToGraph[0].length * 25;
        const height = dataToGraph.length * 25;

        const plot = Plot.plot({
            width: width,
            height: height,
            padding: 0,
            margin: 0,
            style: {
                fontSize: "8px",
            },
            x: {
                label: null,
                tickFormat: (d) => d.toString(),
                tickSize: 0,
            },
            y: {
                label: null,
                tickFormat: (d) => d.toString(),
                tickSize: 0, 
            },
            color: {
                type: "linear",
                scheme: "Viridis", 
                label: "Value",
            },
            marks: [
                Plot.cell(flatData, {
                    x: "x",
                    y: "y",
                    fill: "value",
                    inset: 0.5,
                }),
            ],
        });

        div.innerHTML = "";
        div.append(plot);
    }
</script>

<div bind:this={div} role="img"></div>