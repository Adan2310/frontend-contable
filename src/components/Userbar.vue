<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Barra de usuario -->
    <div class="user-bar" @click="openUserDialog">
      <img
        :src="userProfileImage || defaultImage"
        alt="Imagen de usuario"
        class="profile-picture"
      />
      <div class="user-info">
        <span class="user-name">{{ nombreUsuario || "USER" }}</span>
        <span class="user-role">{{ userRole || "APODO" }}</span>
      </div>
    </div>

    <!-- Diálogo de usuario -->
    <div v-if="showDialog" class="dialog-overlay">
      <div class="dialog">
        <h3 class="dialog-title">Información del Usuario</h3>
        <form @submit.prevent="updateUser">
          <!-- Imagen de perfil actual -->
          <div class="form-group">
            <img
              :src="userProfileImage || defaultImage"
              alt="Imagen de perfil"
              class="profile-image-preview"
            />
          </div>
          <div class="form-group">
            <label for="profileImage">Actualizar Foto de Perfil:</label>
            <input type="file" id="profileImage" @change="onFileChange" />
          </div>
          <!-- Campo de usuario -->
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              v-model="editableUser.usuario"
              required
            />
          </div>
          <!-- Campo de apodo -->
          <div class="form-group">
            <label for="apodo">Apodo:</label>
            <input
              type="text"
              id="apodo"
              v-model="editableUser.apodo"
              required
            />
          </div>
          <!-- Botones de acción -->
          <div class="button-group">
            <button type="submit" class="save-button">Guardar Cambios</button>
            <button type="button" @click="deleteUser" class="delete-button">
              Eliminar Usuario
            </button>
            <button type="button" @click="closeUserDialog" class="close-button">
              Cerrar
            </button>
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
      nombreUsuario: "USER",
      userRole: "APODO",
      userProfileImage: "",
      defaultImage: "https://via.placeholder.com/50", // Imagen predeterminada
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
    this.loadUserData();
  },
  methods: {
    async loadUserData() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        if (!userId || !token) {
          console.error(
            "No se encontró el ID del usuario o el token en el almacenamiento local."
          );
          return;
        }

        const response = await axios.get(
          `${this.backendUrl}/api/usuario/getbyId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.nombreUsuario = response.data.usuario || "USER";
        this.userRole = response.data.apodo || "APODO";
        this.userProfileImage = this.getFullImageUrl(response.data.profileImage);
        this.editableUser = response.data;
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      }
    },
    async openUserDialog() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        if (!userId || !token) {
          alert(
            "No se encontró el ID del usuario o el token en el almacenamiento local."
          );
          return;
        }

        const response = await axios.get(
          `${this.backendUrl}/api/usuario/getbyId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.editableUser = response.data;
        this.userProfileImage = this.getFullImageUrl(response.data.profileImage);
        this.showDialog = true;
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        alert("No se pudieron cargar los datos del usuario.");
      }
    },
    closeUserDialog() {
      this.showDialog = false;
    },
    getFullImageUrl(imagePath) {
      return `${this.backendUrl}${imagePath}`;
    },
    onFileChange(event) {
      this.profileImage = event.target.files[0];
      this.userProfileImage = URL.createObjectURL(this.profileImage);
    },
    async updateUser() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        if (!userId || !token) {
          alert(
            "No se encontró el ID del usuario o el token en el almacenamiento local."
          );
          return;
        }

        const formData = new FormData();
        formData.append("usuario", this.editableUser.usuario);
        formData.append("apodo", this.editableUser.apodo);
        if (this.profileImage) {
          formData.append("profileImage", this.profileImage);
        }

        await axios.put(
          `${this.backendUrl}/api/usuario/update/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.nombreUsuario = this.editableUser.usuario;
        this.userRole = this.editableUser.apodo;

        alert("Información actualizada correctamente.");
        this.closeUserDialog();
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("No se pudo actualizar la información.");
      }
    },
    async deleteUser() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        if (!userId || !token) {
          alert(
            "No se encontró el ID del usuario o el token en el almacenamiento local."
          );
          return;
        }

        await axios.delete(`${this.backendUrl}/api/usuario/delete/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Usuario eliminado correctamente.");

        localStorage.clear();
        this.$router.push("/");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("No se pudo eliminar el usuario.");
      }
    },
  },
};
</script>

<style scoped>
/* Barra de usuario */
.user-bar {
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(250, 248, 248, 0.1);
  color: white;
  cursor: pointer;
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 1000;
  width: 280px;
}

.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 2px solid #ffffff;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: black;
}

.user-role {
  font-size: 14px;
  color: #0F4C75;
  font-style: italic;
}

/* Diálogo */
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
  z-index: 1100;
}

.dialog {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  width: 400px;
  max-width: 90%;
  max-height: 85vh;
  overflow-y: auto;
}

.dialog h3 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 22px;
  color: #084c75;
  font-weight: bold;
}

/* Imagen de perfil */
.profile-image-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 10px auto;
  border: 2px solid #084c75;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Grupos de formulario */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: bold;
  font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

.form-group input[type="text"]:focus,
.form-group input[type="file"]:focus {
  border-color: #084c75;
  outline: none;
}

/* Botones */
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button {
  background-color: #084c75;
  color: white;
}

.save-button:hover {
  background-color: #063952;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
}

.delete-button:hover {
  background-color: #d12d2f;
}

.close-button {
  background-color: #ccc;
  color: #333;
}

.close-button:hover {
  background-color: #b3b3b3;
}
</style>
