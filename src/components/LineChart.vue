<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartType: {
      type: String,
      default: "bar", 
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    Chart.register(...registerables);

    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy(); 
      }

      const ctx = this.$refs.chartCanvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true, 
            },
          },
        },
      });
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.renderChart();
      },
    },
    chartType: {
      handler() {
        this.renderChart(); 
      },
    },
  },
};
</script>

<style>
canvas {
  max-width: 100%;
}
</style>
