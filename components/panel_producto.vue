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
            <v-btn icon="mdi-pencil" variant="text" @click="openEditarProducto(product.id)"></v-btn>
            <v-btn icon="mdi-delete-off" variant="text" @click="showDeleteConfirmationDialog = true; deletingProduct = product"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <products-edit-dialog v-if="editingProduct !== null" :dialog="isEdit" :product="editingProduct" @update="updateProduct" />
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
  <v-btn @click="loadTestData">Cargar Producto de Prueba</v-btn>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'; 

const products = ref([]);
const isEdit = ref(false);
const editingProduct = ref(null);
const showDeleteConfirmationDialog = ref(false);
const deletingProduct = ref(null);
const router = useRouter();


const editProduct = (product) => {
  if (router) {
    // Obtén el id del producto
    const productId = product.id;
    
    // Navega a la ruta de edición
    router.push(`/editar-producto/`);
  } else {
    console.error('El router es undefined');
  }
};
const loadProducts = async () => {
  const url = "http://localhost:3001/products";
  const { data } = await axios.get(url);
  products.value = data;
};

const deleteProduct = async (product) => {
  const url = `http://localhost:3001/products/${product.id}`;
  await axios.delete(url);
  loadProducts();
};

const deleteProductConfirmation = async (product) => {
  if (product) {
    const isTestProduct = product.id === 9999;

    if (isTestProduct) {
      products.value = products.value.filter(p => p.id !== product.id);
      showDeleteConfirmationDialog.value = false;
      showSuccessAlert();  // Mostrar alerta de éxito para producto de prueba
    } else {
      try {
        await deleteProduct(product);
        showDeleteConfirmationDialog.value = false;
        showSuccessAlert();  // Mostrar alerta de éxito para producto real
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        showErrorAlert();  // Mostrar alerta de error
      }
    }
  }
};

const updateProduct = () => {
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

const loadTestData = () => {
  const testProduct = {
    id: 9999,
    name: "Producto de Prueba",
    description: "Descripción del Producto de Prueba",
    sku: "TESTSKU123",
    price: 99.99,
    stock: 10,
    category: "Prueba",
    image: "test-image.jpg",
  };
  products.value.push(testProduct);
};

onBeforeMount(() => {
  loadProducts();
});
</script>
