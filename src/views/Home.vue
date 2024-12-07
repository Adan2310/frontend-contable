<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="layout">
    <Userbar />
    <BarraLateral />
    <div class="contenido-principal">
      <header class="header">
        <h1 class="title">ACTIVIDAD</h1>
      </header>

      <!-- Gráfica de actividad -->
      <section class="chart-section">
        <LineChart :chartData="chartData" />
      </section>

      <!-- Últimas cotizaciones y contactos -->
      <section class="info-section">
        <div class="info-card">
          <h2>Cotizaciones Nuevas</h2>
          <ul>
            <li v-for="factura in ultimasFacturas" :key="factura.id">
              {{ factura.numeroNota }} - {{ factura.contacto }}
            </li>
          </ul>
        </div>
        <div class="info-card">
          <h2>Últimos Contactos</h2>
          <ul>
            <li v-for="contacto in ultimosContactos" :key="contacto.taxId">
              {{ contacto.nombre }} - {{ contacto.telefono }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Userbar from "@/components/Userbar.vue";
import BarraLateral from "@/components/BarraLateral.vue";
import LineChart from "@/components/LineChart.vue"; 

export default {
  components: {
    Userbar,
    BarraLateral,
    LineChart,
  },
  data() {
    return {
      ultimasFacturas: [],
      ultimosContactos: [],
      chartData: {
        labels: [], 
        datasets: [
          {
            label: "Contactos",
            data: [], 
            backgroundColor: "rgba(15, 76, 117, 0.7)",
          },
          {
            label: "Facturas",
            data: [], 
            backgroundColor: "rgba(50, 130, 184, 0.7)",
          },
        ],
      },
    };
  },
  methods: {
    async fetchData() {
      try {
        // Obtener datos de contactos
        const contactosResponse = await axios.get(
          "http://localhost:3000/api/contacto/list"
        );
        const contactos = contactosResponse.data;

        // Obtener datos de facturas
        const facturasResponse = await axios.get(
          "http://localhost:3000/api/factura/list"
        );
        const facturas = facturasResponse.data;

        this.prepareChartData(contactos, facturas);

        this.ultimasFacturas = facturas
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 3);

        this.ultimosContactos = contactos
          .sort((a, b) => b.nombre.localeCompare(a.nombre))
          .slice(0, 3);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    },
    prepareChartData(contactos, facturas) {
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const contactosPorMes = this.aggregateByMonth(contactos, "nombre");
      const facturasPorMes = this.aggregateByMonth(facturas, "fecha");

      this.chartData.labels = meses;

      this.chartData.datasets[0].data = meses.map(
        (mes, index) => contactosPorMes[index] || 0
      );
      this.chartData.datasets[1].data = meses.map(
        (mes, index) => facturasPorMes[index] || 0
      );
    },
    aggregateByMonth(data, dateField) {
      const counts = Array(12).fill(0); 
      data.forEach((item) => {
        const date = new Date(item[dateField]);
        const month = date.getMonth();
        counts[month]++;
      });
      return counts;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.contenido-principal {
  flex: 1;
  margin-left: 230px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  color: #2c3e50;
  font-weight: bold;
}

.chart-section {
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.info-section {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.info-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.info-card h2 {
  font-size: 18px;
  color: #084c75;
  margin-bottom: 15px;
}

.info-card ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.info-card li {
  font-size: 14px;
  margin-bottom: 10px;
  color: #2c3e50;
}
</style>
