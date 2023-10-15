<template>
  <div class="mt-3">
    <h3>Listado de productos</h3>
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
            <v-btn icon="mdi-delete-off" variant="text" @click="showDeleteConfirmationDialog = true; deletingProduct = product"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <products-edit-dialog
      v-if="editingProduct != null"
      :dialog="isEdit"
      :product="editingProduct"
      @update="updateProduct"
    />
  </div>

  <v-dialog v-model="showDeleteConfirmationDialog" max-width="400">
    <v-card elevation="0">
      <v-card-title class="headline">Confirmar eliminación</v-card-title>
      <v-card-text>¿Estás seguro de que deseas eliminar este producto?</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="deleteProductConfirmation(deletingProduct)">Confirmar</v-btn>
        <v-btn @click="showDeleteConfirmationDialog = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import Swal from 'sweetalert2'; 
import ProductsEditDialog from './edit_producto.vue';



onBeforeMount(() => {
  loadProducts();
});

const products = ref([]);
const isEdit = ref(false);
const editingProduct = ref(null);
const showDeleteConfirmationDialog = ref(false);
const openDialog = ref(false);

const loadProducts = async () => {
  const url = "http://localhost:3006/products";
  const { data } = await axios.get(url);
  products.value = data;
};

const deleteProduct = async (product) => {
  const url = `http://localhost:3006/products/${product.id}`;
  const { data } = await axios.delete(url);
  loadProducts();
};

const deleteProductConfirmation = async (product) => {
  try {
    await deleteProduct(product);
    showDeleteConfirmationDialog.value = false;
    showSuccessAlert();  // Show success alert for real product
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    showErrorAlert();  // Show error alert
  }
};

const editProduct = async (product)=>{
  console.log('Editing product:', product);
  isEdit.value=true;
  openDialog.value = true;
  editingProduct.value = { ...product };
}

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
</style>
