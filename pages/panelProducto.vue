<template>
  <div>
    <crear_producto ref="crear_producto"/>
    <products-table ref="productsTable" />
    
  </div>
</template>

<script>
import ProductsTable from '@/components/panel_producto.vue'; // Asegúrate de tener la ruta correcta
import crear_producto from '~/components/crud_producto.vue';

export default {
  components: {
    ProductsTable,
    crear_producto,
  },
  methods: {

  }
};
</script>
