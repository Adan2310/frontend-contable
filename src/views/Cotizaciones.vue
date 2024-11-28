<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="page-container">
    <BarraLateral />
    <main class="content">
      <h1>Página de Cotizaciones</h1>
      <p>Aquí irá la información de cotizaciones.</p>
    </main>
  </div>
</template>

<script>
import BarraLateral from "@/components/BarraLateral.vue";

export default {
  components: {
    BarraLateral,
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
}

.content {
  margin-left: 250px;
  padding: 20px;
  flex-grow: 1;
}
</style>
