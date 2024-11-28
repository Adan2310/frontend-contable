<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container">
    <BarraLateral />
    <div class="main-content">
      <Userbar />
      <main class="content">
        <h1>Página de Contactos</h1>
        <p>Aquí irá la información de contactos.</p>
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
  margin-left: 250px; /* Espacio para la barra lateral */
  margin-top: 60px;  /* Espacio para la barra de usuario */
  padding: 20px;
  box-sizing: border-box;
}
</style>
