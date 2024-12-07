<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-page">
    <div class="login-card">
      <h3 class="title">¡Inicia sesión para tener acceso a tus datos más recientes!</h3>
      <form @submit.prevent="handleLogin">
        <input
          v-model="form.usuario"
          type="text"
          placeholder="Usuario"
          class="input-field"
          required
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="input-field"
          required
        />
        <button type="submit" class="login-button">Iniciar Sesión</button>
      </form>
      <div class="extra-options">
        <p>No tienes cuenta. <router-link to="/signup" class="signup-link">Regístrate</router-link></p>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        usuario: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:3000/api/usuario/login", this.form);
        const { token, user } = response.data;

        // Almacenar el token y la información del usuario en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(user.usuario));
        localStorage.setItem("id", user.id);
        if (user.profileImage) {
          localStorage.setItem("profileImage", user.profileImage);
        }

        // Redirigir al Home
        this.$router.push("/home");
      } catch (error) {
        this.errorMessage = error.response?.data?.error || "Ocurrió un error inesperado";
      }
    },
  },
};
</script>

<style scoped>
/* Página principal del login */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3282B8;
  margin: 0;
}

/* Tarjeta de login */
.login-card {
  background: #ffffff;
  padding: 40px; 
  max-width: 270px; 
  width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  text-align: center;
  border-radius: 0px; 
}

/* Título */
.title {
  margin-bottom: 20px;
  color: #333333;
  font-size: 18px; 
  font-weight: bold; 
}

/* Campos de entrada */
.input-field {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc; 
  border-radius: 15px; 
  font-size: 16px;
  background-color: #f9f9f9; 
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #0F4C75; 
  outline: none; 
}

/* Botón de iniciar sesión */
.login-button {
  width: 100%;
  padding: 12px;
  background-color: #0F4C75; 
  color: white;
  border: none;
  border-radius: 15px; 
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #083D5E; 
}

/* Texto adicional */
.extra-options {
  margin-top: 10px;
  font-size: 14px;
  color: #333333;
}

.signup-link {
  color: #0F4C75; 
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.signup-link:hover {
  color: #083D5E; 
  text-decoration: underline;
}

/* Mensaje de error */
.error-message {
  margin-top: 15px;
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
