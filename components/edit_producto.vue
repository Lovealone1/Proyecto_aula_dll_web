<template>
  <v-container>
    <v-btn color="primary" @click="dialog = true">Editar producto</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card elevation="0">
        <v-card-item>
          <v-card-title class="text-center">Editar Producto</v-card-title>
          <v-card-subtitle class="text-center">Formulario para editar el producto.</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <form @submit.prevent="submitForm">
              <v-text-field
                label="Nombre del Producto"
                v-model="editedProduct.name"
                :rules="[v => !!v || 'Este campo es obligatorio']"
                required
                placeholder="Ingrese el nombre del producto"
                variant="outlined"
              ></v-text-field>
  
              <v-textarea
                label="Descripción"
                v-model="editedProduct.description"
                placeholder="Ingrese la descripción del producto"
                variant="outlined"
              ></v-textarea>
  
              <v-text-field
                label="SKU"
                v-model="editedProduct.sku"
                :rules="[v => !!v || 'Este campo es obligatorio']"
                required
                placeholder="Ingrese el SKU"
                variant="outlined"
              ></v-text-field>
  
              <v-text-field
                label="Precio"
                v-model="editedProduct.price"
                :rules="[v => !!v || 'Este campo es obligatorio', v => /^\d+(\.\d{1,2})?$/.test(v) || 'Ingrese un valor numérico válido']"
                required
                type="number"
                placeholder="Ingrese el precio"
                variant="outlined"
              ></v-text-field>
  
              <v-text-field
                label="Cantidad en Stock"
                v-model="editedProduct.stock"
                :rules="[v => !!v || 'Este campo es obligatorio', v => /^\d+$/.test(v) || 'Ingrese un valor numérico válido']"
                required
                type="number"
                placeholder="Ingrese la cantidad en stock"
                variant="outlined"
              ></v-text-field>
  
              <v-select
                v-model="editedProduct.category"
                :items="categories"
                label="Categoría"
                required
                variant="outlined"
              ></v-select>
  
              <v-file-input
                label="Subir imagen"
                v-model="editedProduct.image"
                accept="image/*"
                variant="outlined"
              ></v-file-input>
  
              <v-btn type="submit" color="blue" block>
                Guardar Cambios
              </v-btn>
            </form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="black" block @click="closeDialog" variant="plain">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
  
<script>
import Swal from 'sweetalert2';

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      editedProduct: {
        ...this.product
      },
      categories: ['Mouses', 'Teclados', 'Diademas', 'Accesorios', 'Streaming']
    };
  },
  methods: {
    submitForm() {
      const response = 'success'; // Replace with actual API call to update the product

      if (response === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado con éxito',
          showConfirmButton: false,
          timer: 1500
        });
        this.resetFields(); // Resetear campos después de éxito
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al actualizar el producto',
          text: 'Inténtelo nuevamente más tarde.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      }

      this.dialog = false;
    },
    resetFields() {
      this.editedProduct = {
        name: '',
        description: '',
        sku: '',
        price: null,
        stock: null,
        category: null,
        image: null
      };
    },
    closeDialog() {
      this.dialog = false;
      this.resetFields(); // Resetear campos al cerrar el diálogo
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles if needed */
</style>