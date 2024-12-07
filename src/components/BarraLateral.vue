<template>
  <div class="barra-lateral">
    <!-- Logo -->
    <div class="logo">
      <img src="@/assets/image.png" alt="Logo" class="logo-img" />
      <span class="logo-text">JAVB</span>
    </div>
    
    <!-- Menú -->
    <ul>
      <li>
        <router-link to="/home" class="menu-item" active-class="active">
          HOME
        </router-link>
      </li>
      <li>
        <router-link to="/contactos" class="menu-item" active-class="active">
          CONTACTOS
        </router-link>
      </li>
      <li>
        <router-link to="/ventas" class="menu-item" active-class="active">
          FACTURAS
        </router-link>
      </li>
      <li>
        <router-link to="/facturas-recurrentes" class="menu-item" active-class="active">
          FACTURAS RECURRENTES
        </router-link>
      </li>
      <li>
        <router-link to="/cotizaciones" class="menu-item" active-class="active">
          COTIZACIONES
        </router-link>
      </li>
    </ul>

    <!-- Botón de Logout -->
    <div class="settings-section">
      <button @click="logout" class="logout-btn">
        CERRAR SESIÓN
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear(); 
      this.$router.push('/'); 
    },
  },
};
</script>

<style scoped>
/* Contenedor general */
.barra-lateral {
  width: 250px;
  height: 100vh;
  background: #0F4C75; 
  color: white;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Logo */
.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo-img {
  width: 100px;
  height: auto;
  display: block;
  margin: 0 auto 10px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
}

/* Menú */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 10px 0;
}

.menu-item {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #3282B8; 
}

.active {
  background-color: #BBE1FA; 
  color: #0F4C75;
}

/* Botón de Logout */
.settings-section {
  margin-top: auto;
  padding: 20px;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background-color: #d9534f; 
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c9302c;
}
</style>
