<script lang="ts">
    import Chart from "chart.js/auto";
    import { onDestroy } from 'svelte';

    let chartObject: Chart | null = null;
    let canvas: HTMLCanvasElement;

    let { dataToGraph = $bindable() } = $props();

    function setupChart(node: HTMLCanvasElement, data: number[]) {
        // Destroy existing chart if it exists
        if (chartObject) {
            chartObject.destroy();
        }

        chartObject = new Chart(node, {
            type: "line",
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: false,
                    },
                },
                responsive: true,
                maintainAspectRatio: true,
            },
            data: {
                labels: data.map((_, i) => i),
                datasets: [
                    {
                        data: data,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                ],
            },
        });
    }

    function chart(node: HTMLCanvasElement, data: number[]) {
        canvas = node;
        node.style.width = '325px';
        node.style.height = '170px';
        
        setupChart(node, data);

        return {
            update(newData: number[]) {
                // Only update if the data has actually changed
                if (chartObject && !arraysEqual(chartObject.data.datasets[0].data, newData)) {
                    setupChart(node, newData);
                }
            },
            destroy() {
                if (chartObject) {
                    chartObject.destroy();
                    chartObject = null;
                }
            },
        };
    }

    // Helper function to compare arrays
    function arraysEqual(a: any[], b: any[]): boolean {
        if (a.length !== b.length) return false;
        return a.every((val, index) => val === b[index]);
    }

    // Clean up on component destruction
    onDestroy(() => {
        if (chartObject) {
            chartObject.destroy();
        }
    });
</script>

<canvas class="chart" use:chart={$state.snapshot(dataToGraph)}></canvas>
