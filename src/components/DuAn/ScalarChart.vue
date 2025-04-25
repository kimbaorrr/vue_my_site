<template>
    <Bar :options="this.chartOptions" :data="this.chartData" class="inline-flex" style="width: 100%" :key="chartKey" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { randomColor } from 'randomcolor';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'ScalarChart',
    props: {
        projectData: Object,
        selectedIndex: String
    },
    components: { Bar },
    data() {
        return {
            chartKey: 0,
            chartData: {},
            chartOptions: {}
        }
    },
    mounted() {
        const metrics = this.projectData?.evaluationMetrics || {};

        const labels = Object.keys(metrics).slice(0, 4).map(label => label.toLowerCase());
        const data = Object.values(metrics).map(val => parseFloat(val) * 100 || 0).slice(0, 4);
        const backgroundColor = labels.map(() => randomColor());

        this.chartData.labels = labels;
        this.chartData.datasets[0].data = data;
        this.chartData.datasets[0].backgroundColor = backgroundColor;

        this.chartKey++;

    },
    created() {
        this.chartData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: []
            }]
        };
        this.chartOptions = {
            indexAxis: 'y',
            responsive: false,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }

        }
    }
}
</script>