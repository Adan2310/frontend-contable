<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container">
    <BarraLateral />
    <div class="main-content">
      <Userbar />
      <main class="content">
        <h1>Clientes</h1>
        <!-- Contenedor del botón alineado a la derecha -->
        <div class="add-contact-container">
          <button class="add-contact-button" @click="openAddContactModal">
            + Agregar nuevo Contacto
          </button>
        </div>
        <div class="table-container">
          <table>
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
              <tr v-for="contact in contacts" :key="contact.id">
                <td>{{ contact.nombre }}</td>
                <td>{{ contact.taxId }}</td>
                <td>{{ contact.telefono }}</td>
                <td>{{ contact.observaciones }}</td>
                <td>
                  <button class="edit-button" @click="editContact(contact.id)">
                    ✏️
                  </button>
                  <button class="delete-button" @click="deleteContact(contact.id)">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ isEditing ? "Editar Contacto" : "Agregar Contacto" }}</h2>
        <form @submit.prevent="saveContact">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="form.nombre"
              placeholder="Ingresa el nombre del cliente"
              required
            />
          </div>
          <div class="form-group">
            <label for="taxId">Tax ID</label>
            <input
              type="text"
              id="taxId"
              v-model="form.taxId"
              placeholder="Ingresa el Tax ID"
              required
            />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input
              type="text"
              id="telefono"
              v-model="form.telefono"
              placeholder="Ingresa el teléfono"
              required
            />
          </div>
          <div class="form-group">
            <label for="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              v-model="form.observaciones"
              placeholder="Ingresa las observaciones"
            ></textarea>
          </div>
          <div class="button-group">
            <button type="submit" class="save-button">
              {{ isEditing ? "Actualizar" : "Guardar" }}
            </button>
            <button type="button" class="cancel-button" @click="closeModal">
              Cancelar
            </button>
          </div>
        </form>
      </div>
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
      contacts: [],
      showModal: false,
      isEditing: false,
      form: {
        id: null,
        nombre: "",
        taxId: "",
        telefono: "",
        observaciones: "",
      },
      backendUrl: "http://localhost:3000/api/contacto",
      loading: false,
    };
  },
  methods: {
    async fetchContacts() {
      try {
        this.loading = true;
        const response = await axios.get(`${this.backendUrl}/list`);
        this.contacts = response.data;
      } catch (error) {
        console.error("Error al obtener los contactos:", error);
        alert("Ocurrió un error al obtener los contactos.");
      } finally {
        this.loading = false;
      }
    },
    openAddContactModal() {
      this.isEditing = false;
      this.resetForm();
      this.showModal = true;
    },
    editContact(contactId) {
      const contact = this.contacts.find((c) => c.id === contactId);
      if (contact) {
        this.isEditing = true;
        this.form = { ...contact };
        this.showModal = true;
      } else {
        alert("Contacto no encontrado.");
      }
    },
    async deleteContact(contactId) {
      if (confirm("¿Estás seguro de eliminar este contacto?")) {
        try {
          this.loading = true;
          await axios.delete(`${this.backendUrl}/delete/${contactId}`);
          this.contacts = this.contacts.filter((c) => c.id !== contactId);
          alert("Contacto eliminado correctamente.");
        } catch (error) {
          console.error("Error al eliminar el contacto:", error);
          alert("No se pudo eliminar el contacto.");
        } finally {
          this.loading = false;
        }
      }
    },
    async saveContact() {
      try {
        this.loading = true;

        const contactData = {
          nombre: this.form.nombre,
          taxId: this.form.taxId,
          telefono: this.form.telefono,
          observaciones: this.form.observaciones,
        };

        if (this.isEditing) {
          await axios.put(`${this.backendUrl}/update/${this.form.id}`, contactData);
          alert("Contacto actualizado correctamente.");
        } else {
          await axios.post(`${this.backendUrl}/create`, contactData);
          alert("Contacto creado correctamente.");
        }
        this.closeModal();
        this.fetchContacts();
      } catch (error) {
        console.error("Error al guardar el contacto:", error);
        alert("Ocurrió un error al guardar el contacto.");
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id: null,
        nombre: "",
        taxId: "",
        telefono: "",
        observaciones: "",
      };
    },
  },
  mounted() {
    this.fetchContacts();
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

.add-contact-container {
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 20px; 
}

.add-contact-button {
  background-color: #3282B8;
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
  background-color: #3282B8;
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
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 450px;
  max-width: 90%;
  animation: fadeIn 0.3s ease-in-out;
}

.modal h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #084c75;
  font-size: 18px;
  font-weight: bold;
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
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #084c75;
  background-color: white;
  outline: none;
  box-shadow: 0px 0px 8px rgba(8, 76, 117, 0.2);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
