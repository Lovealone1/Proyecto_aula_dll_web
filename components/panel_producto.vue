<template>
  <div class="mt-3">
    <h3>Listado de Productos</h3>
    <v-table>
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
          <td>{{ product.image }}</td>
          <td>
            <v-btn icon="mdi-pencil" variant="text" @click="editProduct(product)"></v-btn>
            <v-btn icon="mdi-delete-off" variant="text" @click="showDeleteConfirmationDialog = true; deletingProduct = item"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <edit-producto v-if="editingProduct != null" :dialog="isEdit" :product="editingProduct" @update="updateProduct"/>
  </div>

  <!-- Cuadro de diálogo de confirmación para eliminar tarea -->
  <v-dialog v-model="showDeleteConfirmationDialog" max-width="400">
    <v-card>
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
import crear_producto from '~/components/crud_producto.vue';

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
    loadProducts();
    showSuccessAlert();
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    showErrorAlert();
  }
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crear-producto-card {
  margin-left: auto; /* Esto lo moverá a la derecha */
}
</style>