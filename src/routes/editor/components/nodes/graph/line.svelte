<script lang="ts">
    import { Chart, type ChartConfiguration } from "chart.js/auto";
    import { onMount, afterUpdate } from "svelte";

    export let data: number[];

    let ctx: CanvasRenderingContext2D | null;
    let chartCanvas: HTMLCanvasElement;
    let chart: Chart | null = null;
    
    function createOrUpdateChart() {
        if (!ctx) return;
        if (!data) return;  

        console.log('updated');

        const config: ChartConfiguration = {
            type: "line",
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            data: {
                labels: data.map((_, i) => i),
                datasets: [
                    {
                        label: "Acquisitions by year",
                        data: data,
                    },
                ],
            },
        };

        if (chart) {
            chart.data = config.data;
            chart.update();
        } else {
            chart = new Chart(ctx, config);
        }
    }

    onMount(() => {
        ctx = chartCanvas.getContext("2d");
        createOrUpdateChart();
    });

    afterUpdate(() => {
        createOrUpdateChart();
    });

    $$restProps;
</script>

<canvas bind:this={chartCanvas} class="graph p-3"></canvas>

<style>
    .graph {
        width: 300px !important;
    }
</style>