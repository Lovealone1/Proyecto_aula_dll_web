<template>
  <v-container>

    <v-dialog v-model="openDialog" max-width="500px">
      <v-card elevation="0">
        <v-card-item>
          <v-card-title class="text-center">Editar Producto</v-card-title>
          <v-card-subtitle class="text-center">Formulario para editar el producto.</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <form action="javascript:void(0)" @submit="saveProduct">
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
  
              <v-btn type="submit" color="blue">
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
import axios from 'axios';
import Swal from 'sweetalert2';

const editingProduct = ref({  })
onBeforeMount(()=> {
  editingProduct.value = props.product
  openDialog.value = props.dialog
})
const openDialog = computed(() => {
  return props.dialog;
});

const saveProduct = async () => {
  const url = `http://localhost:3006/products/${editingProduct.value.id}`
  const result = await axios.put(url, editingProduct.value) 
  console.log(result);
  openDialog.value = false

}
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    dialog:{
      type: Boolean, 
      required: true
    }
  },
  data() {
    return {
      editedProduct: {
        ...this.product
      },
      categories: ['Mouses', 'Teclados', 'Diademas', 'Accesorios', 'Streaming']
    };
  },
  methods: {
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
      this.$emit('update:dialog', false);
      this.resetFields(); // Resetear campos al cerrar el diálogo
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles if needed */
</style>