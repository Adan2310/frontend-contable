<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Barra de usuario -->
    <div class="user-bar">
      <span class="icon">👤</span>
      <span class="user-name" @click="openUserDialog">
        {{ nombreUsuario || "Usuario" }}
      </span>
    </div>

    <!-- Diálogo de usuario -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>Información del Usuario</h3>
        <form @submit.prevent="updateUser">
          <!-- Mostrar imagen actual si existe -->
          <div v-if="editableUser.profileImage">
            <label>Foto de perfil actual:</label>
            <img
              :src="getFullImageUrl(editableUser.profileImage)"
              alt="Imagen de perfil"
              class="profile-image-preview"
            />
          </div>
          <div>
            <label for="profileImage">Cambiar Foto de perfil:</label>
            <input type="file" id="profileImage" @change="onFileChange" />
          </div>
          <div>
            <label for="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              v-model="editableUser.usuario"
              required
            />
          </div>
          <div>
            <label for="apodo">Apodo:</label>
            <input
              type="text"
              id="apodo"
              v-model="editableUser.apodo"
              required
            />
          </div>
          <div class="button-group">
            <button type="submit">Guardar Cambios</button>
            <button type="button" @click="closeUserDialog">Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showDialog: false,
      nombreUsuario: "",
      editableUser: {
        usuario: "",
        apodo: "",
        profileImage: null,
      },
      profileImage: null,
      backendUrl: "http://localhost:3000", // Cambiar según tu entorno
    };
  },
  created() {
    const storedUser = localStorage.getItem("usuario")?.replace(/^"|"$/g, "");
    this.nombreUsuario = storedUser || "Usuario";
  },
  methods: {
    onFileChange(event) {
      this.profileImage = event.target.files[0];
    },
    async openUserDialog() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        if (!userId || !token) {
          alert("No se encontró el ID del usuario o el token en el almacenamiento local.");
          return;
        }

        const response = await axios.get(
          `${this.backendUrl}/api/usuario/getbyId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.editableUser = response.data; // Carga los datos del usuario
        this.showDialog = true;
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        alert("No se pudieron cargar los datos del usuario");
      }
    },
    closeUserDialog() {
      this.showDialog = false;
    },
    getFullImageUrl(imagePath) {
      return `${this.backendUrl}${imagePath}`;
    },
    async updateUser() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        if (!userId || !token) {
          alert("No se encontró el ID del usuario o el token en el almacenamiento local.");
          return;
        }

        const formData = new FormData();
        formData.append("usuario", this.editableUser.usuario);
        formData.append("apodo", this.editableUser.apodo);
        if (this.profileImage) {
          formData.append("profileImage", this.profileImage);
        }

        await axios.put(`${this.backendUrl}/api/usuario/update/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Actualizar localStorage
        localStorage.setItem("usuario", this.editableUser.usuario);

        alert("Información actualizada correctamente");
        this.closeUserDialog();
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("No se pudo actualizar la información");
      }
    },
  },
};
</script>

<style scoped>
.user-bar {
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: #333333;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 1000;
  border-radius: 8px;
}

.user-name {
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.user-name:hover {
  color: #d3d3d3;
}

.dialog-overlay {
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

.dialog {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 450px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.dialog h3 {
  margin-bottom: 25px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.dialog form > div {
  margin-bottom: 20px;
}

.dialog label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  font-size: 14px;
}

.dialog input[type="text"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.profile-image-preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 10px auto 15px;
  border: 3px solid #f5f5f5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button[type="submit"] {
  background-color: #084c75;
  color: white;
}

button[type="submit"]:hover {
  background-color: #083d5e;
}

button[type="button"] {
  background-color: #f5f5f5;
  color: #333;
}

button[type="button"]:hover {
  background-color: #e5e5e5;
}
</style>
