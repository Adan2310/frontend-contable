<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signup-container">
    <div class="signup-card">
      <h2>Registrarse</h2>

      <form @submit.prevent="handleSignup" class="signup-form">
        <input
          v-model="form.usuario"
          type="text"
          placeholder="usuario"
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
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirmar Password"
          class="input-field"
          required
        />
        <input
          v-model="form.apodo"
          type="text"
          placeholder="Apodo"
          class="input-field"
          required
        />
        <button type="submit" class="signup-button">Registrarse</button>
      </form>

      <p class="login-prompt">
        Tienes cuenta. <router-link to="/" class="login-link">Inicia Sesión</router-link>
      </p>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
        confirmPassword: "",
        apodo: "",
      },
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleSignup() {
      try {
        if (this.form.password !== this.form.confirmPassword) {
          this.errorMessage = "Las contraseñas no coinciden.";
          this.successMessage = "";
          return;
        }

        if (!this.form.usuario || !this.form.password || !this.form.apodo) {
          this.errorMessage = "Todos los campos son obligatorios.";
          this.successMessage = "";
          return;
        }

        const response = await axios.post("http://localhost:3000/api/usuario/create", {
          usuario: this.form.usuario,
          password: this.form.password,
          apodo: this.form.apodo,
        });

        this.successMessage = "Usuario registrado exitosamente.";
        this.errorMessage = "";
        console.log("Respuesta del servidor:", response.data);

        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error || "Ocurrió un error inesperado.";
        this.successMessage = "";
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0F4C75;
  padding: 0 20px;
  margin: 0;
  box-sizing: border-box;
}

/* Tarjeta del formulario */
.signup-card {
  background: white;
  padding: 40px;
  border-radius: 0;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  max-width: 750px; 
  width: 100%;
  text-align: left;
}

/* Título */
h2 {
  font-size: 24px;
  color: #000000;
  margin-bottom: 30px;
  font-weight: bold;
  text-align: left; 
}

/* Formulario */
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Campos de entrada */
.input-field {
  width: 95%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #f5f5f5;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #084c75;
  background-color: #fff;
  outline: none;
  box-shadow: 0px 0px 5px rgba(8, 76, 117, 0.3);
}

/* Botón */
.signup-button {
  width: 55%;
  padding: 15px;
  font-size: 16px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
}

.signup-button:hover {
  background-color: #333;
}

/* Texto inferior */
.login-prompt {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.login-link {
  color: #084c75;
  font-weight: bold;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

/* Mensajes */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.success-message {
  color: green;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
</style>
