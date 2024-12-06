<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container">
    <BarraLateral />
    <div class="main-content">
      <Userbar />

      <main class="content">
        <header class="header">
          <div class="header-left">
            <h1 class="title">COTIZACIONES</h1>
          </div>
          <button
            class="add-contact-button"
            @click="openAddCotizacionModal"
          >
            + Agregar nueva Cotización
          </button>
        </header>

        <!-- Tabla de Cotizaciones -->
        <section class="table-section">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Número Cotización</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cotizacion in cotizaciones" :key="cotizacion.id">
                  <td>{{ cotizacion.numeroCotizacion }}</td>
                  <td>{{ cotizacion.cliente }}</td>
                  <td>{{ cotizacion.telefono }}</td>
                  <td>{{ cotizacion.total }}</td>
                  <td>{{ cotizacion.estado }}</td>
                  <td>
                    <button
                      class="edit-button"
                      @click="editCotizacion(cotizacion.id)"
                    >
                      ✏️
                    </button>
                    <button
                      class="delete-button"
                      @click="deleteCotizacion(cotizacion.id)"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Modal para crear/editar cotizaciones -->
        <div v-if="showModal" class="modal-overlay fullscreen">
          <div class="modal fullscreen-content">
            <h2 class="modal-title">
              {{ isEditing ? "Editar Cotización" : "Nueva Cotización" }}
            </h2>
            <form @submit.prevent="saveCotizacion">
              <!-- Información General -->
              <div class="form-header">
                <div class="form-group">
                  <label for="numeroCotizacion">Número Cotización*</label>
                  <input
                    type="text"
                    id="numeroCotizacion"
                    v-model="form.numeroCotizacion"
                    placeholder="Ingrese un número único"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="cliente">Cliente*</label>
                  <input
                    type="text"
                    id="cliente"
                    v-model="form.cliente"
                    placeholder="Buscar cliente"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="idImpuesto">ID Impuesto*</label>
                  <input
                    type="text"
                    id="idImpuesto"
                    v-model="form.idImpuesto"
                    placeholder="Ingrese el ID de Impuesto del cliente"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="telefono">Teléfono*</label>
                  <input
                    type="text"
                    id="telefono"
                    v-model="form.telefono"
                    required
                  />
                </div>
              </div>

              <!-- Fechas -->
              <div class="form-row">
                <div class="form-group">
                  <label for="fechaCreacion">Fecha de Creación*</label>
                  <input type="date" id="fechaCreacion" v-model="form.fechaCreacion" required />
                </div>
                <div class="form-group">
                  <label for="fechaVencimiento">Fecha de Vencimiento*</label>
                  <input type="date" id="fechaVencimiento" v-model="form.fechaVencimiento" required />
                </div>
                <div class="form-group">
                  <label for="estado">Estado*</label>
                  <select id="estado" v-model="form.estado" required>
                    <option value="activa">Activa</option>
                    <option value="expirada">Expirada</option>
                  </select>
                </div>
              </div>

              <!-- Items -->
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Referencia</th>
                      <th>Precio</th>
                      <th>Desc%</th>
                      <th>Impuesto</th>
                      <th>Descripción</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in form.items" :key="index">
                      <td>
                        <input v-model="item.referencia" type="text" />
                      </td>
                      <td>
                        <input v-model.number="item.precio" type="number" />
                      </td>
                      <td>
                        <input v-model.number="item.descuento" type="number" />
                      </td>
                      <td>
                        <input v-model.number="item.impuesto" type="number" />
                      </td>
                      <td>
                        <input v-model="item.descripcion" type="text" />
                      </td>
                      <td>
                        <input v-model.number="item.cantidad" type="number" />
                      </td>
                      <td>
                        <input v-model.number="item.total" type="number" />
                      </td>
                      <td>
                        <button type="button" @click="removeItem(index)">❌</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="button" class="add-item-button" @click="addItem">+ Agregar nueva fila</button>
              </div>

              <!-- Totales -->
              <div class="form-row">
                <div class="form-group">
                  <label for="subtotal">Subtotal*</label>
                  <input
                    type="number"
                    id="subtotal"
                    v-model.number="form.subtotal"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="impuestos">Impuestos*</label>
                  <input
                    type="number"
                    id="impuestos"
                    v-model.number="form.impuestos"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="total">Total*</label>
                  <input
                    type="number"
                    id="total"
                    v-model.number="form.total"
                    required
                  />
                </div>
              </div>

              <!-- Notas -->
              <div class="form-group full-width">
                <label for="notas">Notas</label>
                <textarea
                  id="notas"
                  v-model="form.notas"
                  placeholder="Agregar notas adicionales"
                ></textarea>
              </div>

              <!-- Botones -->
              <div class="form-footer">
                <button type="button" class="cancel-button" @click="closeModal">Cancelar</button>
                <button type="submit" class="save-button">{{ isEditing ? "Actualizar" : "Guardar" }}</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BarraLateral from "@/components/BarraLateral.vue";
import Userbar from "@/components/Userbar.vue";

export default {
  components: {
    BarraLateral,
    Userbar,
  },
  data() {
    return {
      cotizaciones: [],
      showModal: false,
      isEditing: false,
      form: {
        numeroCotizacion: "",
        cliente: "",
        idImpuesto: "",
        telefono: "",
        fechaCreacion: "",
        fechaVencimiento: "",
        estado: "activa",
        items: [
          {
            referencia: "",
            precio: 0,
            descuento: 0,
            impuesto: 0,
            descripcion: "",
            cantidad: 0,
            total: 0,
          },
        ],
        subtotal: 0,
        impuestos: 0,
        total: 0,
        notas: "",
      },
      backendUrl: "http://localhost:3000/api/cotizacion",
      loading: false,
    };
  },
  methods: {
    async fetchCotizaciones() {
      try {
        this.loading = true;
        const response = await axios.get(`${this.backendUrl}/list`);
        this.cotizaciones = response.data;
      } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
        alert("Ocurrió un error al obtener las cotizaciones.");
      } finally {
        this.loading = false;
      }
    },
    openAddCotizacionModal() {
      this.isEditing = false;
      this.resetForm();
      this.showModal = true;
    },
    editCotizacion(id) {
      const cotizacion = this.cotizaciones.find((c) => c.id === id);
      if (cotizacion) {
        this.isEditing = true;
        this.form = { ...cotizacion };
        this.showModal = true;
      } else {
        alert("Cotización no encontrada.");
      }
    },
    async deleteCotizacion(id) {
      if (confirm("¿Estás seguro de eliminar esta cotización?")) {
        try {
          this.loading = true;
          await axios.delete(`${this.backendUrl}/delete/${id}`);
          this.cotizaciones = this.cotizaciones.filter((c) => c.id !== id);
          alert("Cotización eliminada correctamente.");
        } catch (error) {
          console.error("Error al eliminar la cotización:", error);
          alert("No se pudo eliminar la cotización.");
        } finally {
          this.loading = false;
        }
      }
    },
    async saveCotizacion() {
      try {
        this.loading = true;

        const cotizacionData = { ...this.form };

        if (!this.validateForm(cotizacionData)) {
          alert("Por favor, completa todos los campos requeridos.");
          return;
        }

        if (this.isEditing) {
          await axios.put(`${this.backendUrl}/update/${this.form.id}`, cotizacionData);
          alert("Cotización actualizada correctamente.");
        } else {
          await axios.post(`${this.backendUrl}/create`, cotizacionData);
          alert("Cotización creada correctamente.");
        }
        this.closeModal();
        this.fetchCotizaciones();
      } catch (error) {
        console.error("Error al guardar la cotización:", error);
        alert("Ocurrió un error al guardar la cotización.");
      } finally {
        this.loading = false;
      }
    },
    validateForm(data) {
      if (
        !data.numeroCotizacion ||
        !data.cliente ||
        !data.telefono ||
        !data.fechaCreacion ||
        !data.fechaVencimiento ||
        !data.items.length
      ) {
        return false;
      }
      for (const item of data.items) {
        if (
          !item.referencia ||
          !item.precio ||
          !item.descuento ||
          !item.impuesto ||
          !item.descripcion ||
          !item.cantidad ||
          !item.total
        ) {
          return false;
        }
      }
      return true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        numeroCotizacion: "",
        cliente: "",
        idImpuesto: "",
        telefono: "",
        fechaCreacion: "",
        fechaVencimiento: "",
        estado: "activa",
        items: [
          {
            referencia: "",
            precio: 0,
            descuento: 0,
            impuesto: 0,
            descripcion: "",
            cantidad: 0,
            total: 0,
          },
        ],
        subtotal: 0,
        impuestos: 0,
        total: 0,
        notas: "",
      };
    },
    addItem() {
      this.form.items.push({
        referencia: "",
        precio: 0,
        descuento: 0,
        impuesto: 0,
        descripcion: "",
        cantidad: 0,
        total: 0,
      });
    },
    removeItem(index) {
      if (index > -1 && index < this.form.items.length) {
        this.form.items.splice(index, 1);
      }
    },
  },
  mounted() {
    this.fetchCotizaciones();
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
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
  font-weight: bold;
}

.add-contact-button {
  background-color: #3282b8;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-contact-button:hover {
  background-color: #083d5e;
  transform: scale(1.05);
}

.table-container {
  overflow-x: auto;
  background-color: white;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead tr th:first-child {
  border-top-left-radius: 15px;
}

thead tr th:last-child {
  border-top-right-radius: 15px;
}

thead tr th {
  background-color: #3282b8;
  color: white;
  text-transform: uppercase;
  font-size: 14px;
}

tr:hover td {
  background-color: #f2f2f2;
}

.edit-button {
  background-color: #ffa500;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-right: 10px;
}

.edit-button:hover {
  background-color: #e59400;
  transform: scale(1.1);
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.delete-button:hover {
  background-color: #d93a3b;
  transform: scale(1.1);
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 1200px;
  max-height: 90%;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-in-out;
}

.modal h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #084c75;
  font-size: 20px;
  font-weight: bold;
}

.items-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.items-table th,
.items-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.items-table th {
  background-color: #3282b8;
  color: white;
}

.add-row-button {
  margin-top: 10px;
  background-color: #3282b8;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-row-button:hover {
  background-color: #083d5e;
  transform: scale(1.05);
}

.remove-row-button {
  background-color: #ff4d4f;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.remove-row-button:hover {
  background-color: #d93a3b;
  transform: scale(1.05);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #084c75;
  background-color: white;
  outline: none;
  box-shadow: 0px 0px 8px rgba(8, 76, 117, 0.2);
}

.save-button {
  background-color: #084c75;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.save-button:hover {
  background-color: #083d5e;
  transform: scale(1.05);
}

.cancel-button {
  background-color: #ddd;
  color: #555;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cancel-button:hover {
  background-color: #ccc;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
