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
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #428bca;
}

.login-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  margin-bottom: 24px;
  color: #333333;
  font-size: 18px;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #0F4C75;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #083D5E;
}

.extra-options {
  margin-top: 16px;
  font-size: 14px;
}

.signup-link {
  color: #428bca;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}

.error-message {
  margin-top: 16px;
  color: red;
  font-size: 14px;
}
</style>
