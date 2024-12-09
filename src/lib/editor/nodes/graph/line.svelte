<script lang="ts">
    import Chart from "chart.js/auto";

    let chartObject: any = null;

    let { dataToGraph = $bindable() } = $props();



    function chart(node: HTMLCanvasElement, data: number[]) {
        function setupChart(_data: number[]) {
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
                    labels: _data.map((_: any, i: number) => i),
                    datasets: [
                        {
                            data: _data,
                        },
                    ],
                },
            });
            node.style.width = '325px'; // Set desired width
            node.style.height = '170px'; // Set desired height
        }
        setupChart($state.snapshot(data));
        return {
            update(newData: number[]) {
                chartObject.destroy();
                setupChart($state.snapshot(newData));
            },
            destroy() {
                chartObject.destroy();
            },
        };
    }
</script>


<canvas class="chart" use:chart={dataToGraph}></canvas>