<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container">
    <BarraLateral />
    <div class="main-content">
      <Userbar />

      <main class="content">
        <header class="header">
          <div class="header-left">
            <h1 class="title">FACTURAS RECURRENTES</h1>
          </div>
          <button
            class="add-contact-button"
            @click="openAddRecurrentInvoiceModal"
          >
            + Agregar nueva Factura Recurrente
          </button>
        </header>

        <!-- Tabla de Facturas Recurrentes -->
        <section class="table-section">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Numeración</th>
                  <th>Observaciones</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="factura in facturasRecurrentes" :key="factura.id">
                  <td>{{ factura.cliente }}</td>
                  <td>{{ factura.numeracion }}</td>
                  <td>{{ factura.observaciones || "N/A" }}</td>
                  <td>{{ factura.total }}</td>
                  <td>
                    <button
                      class="edit-button"
                      @click="editRecurrentInvoice(factura.id)"
                    >
                      ✏️
                    </button>
                    <button
                      class="delete-button"
                      @click="deleteRecurrentInvoice(factura.id)"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Modal para crear/editar facturas recurrentes -->
        <div v-if="showModal" class="modal-overlay fullscreen">
          <div class="modal fullscreen-content">
            <h2 class="modal-title">
              {{ isEditing ? "Editar Factura Recurrente" : "Nueva Factura Recurrente" }}
            </h2>
            <form @submit.prevent="saveRecurrentInvoice">
              <div class="form-header">
                <div class="form-group">
                  <label for="numeracion">Numeración*</label>
                  <input
                    type="text"
                    id="numeracion"
                    v-model="form.numeracion"
                    placeholder="Ingrese una numeración única"
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
              </div>

              <!-- Fechas -->
              <div class="form-row">
                <div class="form-group">
                  <label for="fechaInicio">Fecha de Inicio*</label>
                  <input type="date" id="fechaInicio" v-model="form.fechaInicio" required />
                </div>
                <div class="form-group">
                  <label for="ultimaFecha">Última Fecha*</label>
                  <input type="date" id="ultimaFecha" v-model="form.ultimaFecha" />
                </div>
                <div class="form-group">
                  <label for="termino">Término*</label>
                  <input type="date" id="termino" v-model="form.termino" />
                </div>
                <div class="form-group">
                  <label for="fechaExpiracion">Fecha de Expiración*</label>
                  <input type="date" id="fechaExpiracion" v-model="form.fechaExpiracion" required />
                </div>
                <div class="form-group">
                  <label for="frecuencia">Frecuencia (días)*</label>
                  <input type="number" id="frecuencia" v-model="form.frecuencia" required />
                </div>
                <div class="form-group">
                  <label for="listaPrecio">Lista de Precio*</label>
                  <select id="listaPrecio" v-model="form.listaPrecio" required>
                    <option value="General">General</option>
                    <option value="Especial">Especial</option>
                  </select>
                </div>
              </div>

              <!-- Observaciones -->
              <div class="form-group full-width">
                <label for="observaciones">Observaciones</label>
                <textarea
                  id="observaciones"
                  v-model="form.observaciones"
                  placeholder="Ingresa observaciones adicionales"
                ></textarea>
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
                        <button type="button" @click="removeItem(index)">
                          ❌
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="button" class="add-item-button" @click="addItem">
                  + Agregar nueva fila
                </button>
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
                  <label for="descuento">Descuento*</label>
                  <input
                    type="number"
                    id="descuento"
                    v-model.number="form.descuento"
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

              <!-- Botones -->
              <div class="form-footer">
                <button type="button" class="cancel-button" @click="closeModal">
                  Cancelar
                </button>
                <button type="submit" class="save-button">
                  {{ isEditing ? "Actualizar" : "Guardar" }}
                </button>
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
      facturasRecurrentes: [],
      showModal: false,
      isEditing: false,
      form: {
        numeracion: "",
        cliente: "",
        observaciones: "",
        notasFactura: "",
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
        fechaInicio: "",
        ultimaFecha: "",
        termino: "",
        fechaExpiracion: "",
        frecuencia: 0,
        listaPrecio: "",
        subtotal: 0,
        descuento: 0,
        impuestos: 0,
        total: 0,
      },
      backendUrl: "http://localhost:3000/api/factura-recurrente",
      loading: false,
    };
  },
  methods: {
    async fetchFacturasRecurrentes() {
      try {
        this.loading = true;
        const response = await axios.get(`${this.backendUrl}/list`);
        this.facturasRecurrentes = response.data;
      } catch (error) {
        console.error("Error al obtener las facturas recurrentes:", error);
        alert("Ocurrió un error al obtener las facturas recurrentes.");
      } finally {
        this.loading = false;
      }
    },
    openAddRecurrentInvoiceModal() {
      this.isEditing = false;
      this.resetForm();
      this.showModal = true;
    },
    editRecurrentInvoice(id) {
      const factura = this.facturasRecurrentes.find((f) => f.id === id);
      if (factura) {
        this.isEditing = true;
        this.form = { ...factura };
        this.showModal = true;
      } else {
        alert("Factura recurrente no encontrada.");
      }
    },
    async deleteRecurrentInvoice(id) {
      if (confirm("¿Estás seguro de eliminar esta factura recurrente?")) {
        try {
          this.loading = true;
          await axios.delete(`${this.backendUrl}/delete/${id}`);
          this.facturasRecurrentes = this.facturasRecurrentes.filter(
            (f) => f.id !== id
          );
          alert("Factura recurrente eliminada correctamente.");
        } catch (error) {
          console.error("Error al eliminar la factura recurrente:", error);
          alert("No se pudo eliminar la factura recurrente.");
        } finally {
          this.loading = false;
        }
      }
    },
    async saveRecurrentInvoice() {
      try {
        this.loading = true;

        const facturaData = { ...this.form };

        if (!this.validateForm(facturaData)) {
          alert("Por favor, completa todos los campos requeridos.");
          return;
        }

        if (this.isEditing) {
          await axios.put(
            `${this.backendUrl}/update/${this.form.id}`,
            facturaData
          );
          alert("Factura recurrente actualizada correctamente.");
        } else {
          await axios.post(`${this.backendUrl}/create`, facturaData);
          alert("Factura recurrente creada correctamente.");
        }
        this.closeModal();
        this.fetchFacturasRecurrentes();
      } catch (error) {
        console.error("Error al guardar la factura recurrente:", error);
        alert("Ocurrió un error al guardar la factura recurrente.");
      } finally {
        this.loading = false;
      }
    },
    validateForm(data) {
      if (
        !data.numeracion ||
        !data.cliente ||
        !data.fechaInicio ||
        !data.fechaExpiracion ||
        !data.frecuencia ||
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
        numeracion: "",
        cliente: "",
        observaciones: "",
        notasFactura: "",
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
        fechaInicio: "",
        ultimaFecha: "",
        termino: "",
        fechaExpiracion: "",
        frecuencia: 0,
        listaPrecio: "",
        subtotal: 0,
        descuento: 0,
        impuestos: 0,
        total: 0,
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
    this.fetchFacturasRecurrentes();
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
