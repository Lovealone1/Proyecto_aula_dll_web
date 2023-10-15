<template>
  <v-container>
    <v-btn color="primary" @click="dialog = true">
      Crear producto
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card elevation="0">
        <v-card-item>
          <v-card-title class="text-center">Gestión de productos</v-card-title>
          <v-card-subtitle class="text-center">Formulario para la gestión de productos.</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <form @submit.prevent="submitForm">
            <v-text-field
              label="Nombre del Producto"
              v-model="product.name"
              :rules="[v => !!v || 'Este campo es obligatorio']"
              required
              placeholder="Ingrese el nombre del producto"
              variant="outlined"
            ></v-text-field>

            <v-textarea
              label="Descripción"
              v-model="product.description"
              placeholder="Ingrese la descripción del producto"
              variant="outlined"
            ></v-textarea>

            <v-text-field
              label="SKU"
              v-model="product.sku"
              :rules="[v => !!v || 'Este campo es obligatorio']"
              required
              placeholder="Ingrese el SKU"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              label="Precio"
              v-model="product.price"
              :rules="[v => !!v || 'Este campo es obligatorio', v => /^\d+(\.\d{1,2})?$/.test(v) || 'Ingrese un valor numérico válido']"
              required
              type="number"
              placeholder="Ingrese el precio"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              label="Cantidad en Stock"
              v-model="product.stock"
              :rules="[v => !!v || 'Este campo es obligatorio', v => /^\d+$/.test(v) || 'Ingrese un valor numérico válido']"
              required
              type="number"
              placeholder="Ingrese la cantidad en stock"
              variant="outlined"
            ></v-text-field>

            <v-select
              v-model="product.category"
              :items="categories"
              label="Categoría"
              required
              variant="outlined"
            ></v-select>

            <v-file-input
              label="Subir imagen"
              v-model="product.image"
              accept="image/*"
              variant="outlined"
            ></v-file-input>
            <v-card-actions>
            <v-btn type="submit" block color="blue" variant="outlined">Guardar Producto</v-btn>
            </v-card-actions>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" block @click="dialog = false" variant="plain">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        sku: '',
        price: null,
        stock: null,
        category: null,
        image: null
      },
      dialog: false,
      initialProduct: {
        name: '',
        description: '',
        sku: '',
        price: null,
        stock: null,
        category: null,
        image: null
      },
      categories: ['Mouses', 'Teclados', 'Diademas', 'Accesorios','Streaming'] // Ejemplo de categorías
    };
  },
  methods: {
    async submitForm() {
      try {
        // Realizar una solicitud POST para guardar el producto
        const response = await axios.post('http://localhost:3006/products', this.product);
        
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Producto guardado con éxito',
            showConfirmButton: false,
            timer: 1500
          });

          // Resetear campos a su estado inicial
          this.product = { ...this.initialProduct };
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al guardar el producto',
            text: 'Inténtelo nuevamente más tarde.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        console.error('Error al guardar el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al guardar el producto',
          text: 'Inténtelo nuevamente más tarde.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      }

      this.dialog = false;
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles if needed */
</style>
