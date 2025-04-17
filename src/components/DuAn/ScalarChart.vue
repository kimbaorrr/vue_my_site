<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" class="inline-flex" style="width: 100%" />

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'MetricsChart',
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March', 'February', 'March'],
                datasets: [{ data: [40, 20, 12, 12, 13], backgroundColor: '#007bff', label: "Accuracy" }]
            },
            chartOptions: {
                indexAxis: 'y',
                responsive: false,
                plugins: {
                    legend: {
                        position: "right"
                    }
                }
            }
        }
    }
}
</script>