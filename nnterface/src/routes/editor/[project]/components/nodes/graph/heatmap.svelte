<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
    import * as Plot from "@observablehq/plot";

    let div: HTMLDivElement;
    export let data: number[][];

    onMount(() => {
        plot();
    });

    afterUpdate(() => {
        div?.firstChild?.remove();
        console.log('test');
        plot();
    });

    function plot() {
        if (!div || !data.length) return;

        const flatData = data.flatMap((row, y) =>
            row.map((value, x) => ({ x, y, value }))
        );

        const width = data[0].length * 25;
        const height = data.length * 25;

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