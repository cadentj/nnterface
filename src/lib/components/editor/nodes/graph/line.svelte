<script lang="ts">
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";
    export let d;

    let ctx: CanvasRenderingContext2D | null;
    let chartCanvas: HTMLCanvasElement;

    onMount(() => {
        ctx = chartCanvas.getContext("2d");

        if (ctx) {
            new Chart(ctx, {
                type: "line",
                options: {
                    plugins : {
                        legend: {
                            display: false
                        }
                    }
                },
                data: {
                    labels: d.map((row) => row.year),
                    datasets: [
                        {
                            label: "Acquisitions by year",
                            data: d.map((row) => row.count),
                        },
                    ],
                },
            });
        }
    });

    $$restProps;
</script>

<canvas bind:this={chartCanvas} class="graph p-3"></canvas>

<style>
    .graph {
        width: 300px !important;
    }
</style>