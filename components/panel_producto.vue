<template>
  <div class="semi-header">
    <h3>PANEL DE PRODUCTOS</h3>
  </div>
  <div class="mt-3 center-content">
    <div class="crear-producto-button">
      <crud-producto @productoGuardado="loadProducts" />
    </div>
    <v-table class="custom-table">
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Descripción</th>
          <th class="text-left">SKU</th>
          <th class="text-left">Precio</th>
          <th class="text-left">Stock</th>
          <th class="text-left">Categoría</th>
          <th class="text-left">Imagen</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.sku }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td><img :src="product.image_url" alt="Product Image" style="max-width: 100px;"></td>
          <td>
            <v-btn icon="mdi-pencil" variant="text" @click="editProduct(product)"></v-btn>
            <v-btn icon="mdi-delete-off" variant="text" @click="showDeleteConfirmationDialog = true; deletingProduct = product"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <edit-producto v-if="editingProduct != null" :dialog="isEdit" :product="editingProduct" @update="updateProduct"/>
  </div>

  <!-- Cuadro de diálogo de confirmación para eliminar tarea -->
  <v-dialog v-model="showDeleteConfirmationDialog" max-width="400">
    <v-card elevation="0">
      <v-card-title class="headline">Confirmar eliminación</v-card-title>
      <v-card-text>¿Estás seguro de que deseas eliminar esta tarea?</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="deleteProductConfirmation(deletingProduct)">Confirmar</v-btn>
        <v-btn @click="showDeleteConfirmationDialog = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import Swal from 'sweetalert2';
import EditProducto from './edit_producto.vue';

const products = ref([]);
const isEdit = ref(false);
const editingProduct = ref(null);
const showDeleteConfirmationDialog = ref(false);
const deletingProduct = ref(null);

onBeforeMount(() => {
  loadProducts();
});

const loadProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:3006/products");
    products.value = data;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
};

const deleteProduct = async (product) => {
  const url = `http://localhost:3006/products/${product.id}`;
  try {
    await axios.delete(url);
    
    showSuccessAlert();
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    showErrorAlert();
  }
  loadProducts();
};

const deleteProductConfirmation = async (product) => {
  if (product) {
    await deleteProduct(product);
    showDeleteConfirmationDialog.value = false;
  }
};

const editProduct = async (product) => {
  isEdit.value = true;
  editingProduct.value = { ...product };
};

const updateProduct = (isUpdated) => {
  console.log(isUpdated);
  isEdit.value = false;
  editingProduct.value = null;
  loadProducts();
};

const showSuccessAlert = () => {
  Swal.fire({
    icon: 'success',
    title: 'Producto eliminado',
    text: 'El producto ha sido eliminado exitosamente.',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Aceptar'
  });
};

const showErrorAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Hubo un error al eliminar el producto.',
    confirmButtonColor: '#d33',
    confirmButtonText: 'Cerrar'
  });
};

</script>
<style scoped>  
.semi-header {
  background-color: #f2f2f2; /* Color de fondo */
  padding: 10px; /* Espacio interno */
  text-align: center; /* Centrar el texto */
}
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200vh;
}

.center-table {
  margin: 0 auto;
}

.custom-table {
  width: 70%; /* Porcentaje de ancho según tus necesidades */
  max-height: 528px; /* Altura máxima según tus necesidades */
  overflow-y: auto; /* Agrega un desplazamiento vertical si es necesario */
  border: 2px solid #000000; /* Borde de 1 píxel sólido color gris claro */
  border-radius: 10px;
  border-collapse: collapse; /* Colapsa los bordes de las celdas para una apariencia uniforme */
}

.crear-producto-button {
  margin-left: 1110px;
  margin-top: 10px; /* Agrega un margen superior para separar del borde */
}
.custom-table th, .custom-table td {
  padding: 10px; /* Espacio interno dentro de las celdas */
}
/* Estilo para el botón de creación de producto */
.crear-producto-card {
  margin-left: auto; /* Moverá a la derecha */
}
</style>