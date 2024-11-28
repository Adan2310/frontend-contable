<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container">
    <BarraLateral />
    <div class="main-content">
      <Userbar />

      <main class="content">
        <!-- Encabezado -->
        <header class="header">
          <div>
            <h1 class="title">VENTAS</h1>
            <div class="dropdown">
              <button class="dropdown-button">
                {{ selectedSection }}
              </button>
              <div class="dropdown-content">
                <button @click="changeSection('Facturas')">Facturas</button>
                <button @click="changeSection('Facturas Recurrentes')">Facturas Recurrentes</button>
                <button @click="changeSection('Cotizaciones')">Cotizaciones</button>
              </div>
            </div>
          </div>
          <button class="add-button" v-if="selectedSection === 'Facturas'">+ Agregar nueva Factura</button>
        </header>

        <!-- Sección dinámica -->
        <section v-if="selectedSection === 'Facturas'" class="table-section">
          <!-- Tabla de Facturas -->
          <table class="custom-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tax ID</th>
                <th>Teléfono</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="factura in facturas" :key="factura.id">
                <td>{{ factura.nombre }}</td>
                <td>{{ factura.taxId }}</td>
                <td>{{ factura.telefono }}</td>
                <td>{{ factura.observaciones }}</td>
                <td>
                  <button class="edit-btn" @click="editFactura(factura.id)">✏️</button>
                  <button class="delete-btn" @click="deleteFactura(factura.id)">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section v-if="selectedSection === 'Facturas Recurrentes'" class="table-section">
          <h2>Facturas Recurrentes</h2>
          <p>Aquí irá el contenido de facturas recurrentes.</p>
        </section>

        <section v-if="selectedSection === 'Cotizaciones'" class="table-section">
          <h2>Cotizaciones</h2>
          <p>Aquí irá el contenido de cotizaciones.</p>
        </section>

        <!-- Paginación -->
        <nav v-if="selectedSection === 'Facturas'" class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">«</button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">»</button>
        </nav>
      </main>
    </div>
  </div>
</template>

<script>
import BarraLateral from "@/components/BarraLateral.vue";
import Userbar from "@/components/Userbar.vue";

export default {
  components: {
    BarraLateral,
    Userbar,
  },
  data() {
    return {
      selectedSection: "Facturas",
      facturas: [
        { id: 1, nombre: "Good Shoes", taxId: "ruuning", telefono: "314502365", observaciones: "Ewdgbsbdf" },
        // Agregar más datos simulados...
      ],
      currentPage: 1,
      totalPages: 5,
    };
  },
  methods: {
    changeSection(section) {
      this.selectedSection = section;
    },
    editFactura(id) {
      console.log("Editar factura", id);
    },
    deleteFactura(id) {
      console.log("Eliminar factura", id);
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.content {
  margin-left: 250px; /* Espacio para la barra lateral */
  margin-top: 60px; /* Espacio para la barra de usuario */
  padding: 20px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  color: #084c75;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  padding: 10px 15px;
  background-color: #084c75;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 150px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content button {
  color: #084c75;
  padding: 8px 12px;
  text-decoration: none;
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.add-button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.add-button:hover {
  background-color: #45a049;
}

.table-section {
  margin-top: 20px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.custom-table th {
  background-color: #084c75;
  color: white;
  text-align: left;
}

.edit-btn {
  background-color: #FFD700;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-btn {
  background-color: #FF6347;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
