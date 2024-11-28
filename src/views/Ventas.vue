<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container">
    <BarraLateral />
    <div class="main-content">
      <Userbar />

      <main class="content">
        <!-- Encabezado -->
        <header class="header">
          <div class="header-left">
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
          <button class="add-button" v-if="selectedSection === 'Facturas'">
            + Agregar nueva Factura
          </button>
        </header>

        <!-- Tabla de Facturas -->
        <section v-if="selectedSection === 'Facturas'" class="table-section">
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
                <td class="actions">
                  <button class="edit-btn" @click="editFactura(factura.id)">
                    ✏️
                  </button>
                  <button class="delete-btn" @click="deleteFactura(factura.id)">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Paginación -->
        <nav v-if="selectedSection === 'Facturas'" class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">«</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
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
        { id: 2, nombre: "Good Shoes", taxId: "ruuning", telefono: "314502365", observaciones: "Ewdgbsbdf" },
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
  margin-left: 250px;
  margin-top: 60px;
  padding: 20px;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.title {
  font-size: 24px;
  color: #084c75;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  padding: 10px 15px;
  background-color: white;
  color: #084c75;
  border: 1px solid #084c75;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 8px;
  overflow: hidden;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content button {
  padding: 10px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
}

.add-button {
  padding: 10px 15px;
  background-color: #3282b8;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.table-section {
  margin-top: 20px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.custom-table th {
  background-color: #084c75;
  color: white;
  text-align: left;
  padding: 10px;
}

.custom-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.actions {
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn {
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  color: white;
}

.edit-btn {
  background-color: #ffdd57;
}

.delete-btn {
  background-color: #ff6347;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #084c75;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
