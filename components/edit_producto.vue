<template>
  <div>
      <v-dialog v-model="openDialog" max-width="500px">
          <v-card elevation="0">
              <v-card-item>
                  <v-card-title>Edicion de tareas</v-card-title>
                  <v-card-subtitle>Formulario para la gestión de tareas de los estudiantes.</v-card-subtitle>
              </v-card-item>
              <v-card-text>
                  <form action="javascript:void(0)" @submit="saveTask">

                    <v-text-field
                      label="Nombre del Producto"
                      v-model="editingProduct.name"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                      required
                      placeholder="Ingrese el nombre del producto"
                      variant="outlined"
                      ></v-text-field>

                      <v-textarea
                        label="Descripción"
                        v-model="editingProduct.description"
                        placeholder="Ingrese la descripción del producto"
                        variant="outlined"
                      ></v-textarea>

                      <v-text-field
                        label="SKU"
                        v-model="editingProduct.sku"
                        :rules="[v => !!v || 'Este campo es obligatorio']"
                        required
                        placeholder="Ingrese el SKU"
                        variant="outlined"
                      ></v-text-field>

                      <v-text-field
                        label="Precio"
                        v-model="editingProduct.price"
                        :rules="[v => !!v || 'Este campo es obligatorio', v => /^\d+(\.\d{1,2})?$/.test(v) || 'Ingrese un valor numérico válido']"
                        required
                        type="number"
                        placeholder="Ingrese el precio"
                        variant="outlined"
                      ></v-text-field>

                      <v-text-field
                        label="Cantidad en Stock"
                        v-model="editingProduct.stock"
                        :rules="[v => !!v || 'Este campo es obligatorio', v => /^\d+$/.test(v) || 'Ingrese un valor numérico válido']"
                        required
                        type="number"
                        placeholder="Ingrese la cantidad en stock"
                        variant="outlined"
                      ></v-text-field>

                      <v-select
                        v-model="editingProduct.category"
                        :items="categories"
                        label="Categoría"
                        required
                        variant="outlined"
                      ></v-select>

                      <v-file-input
                        label="Subir imagen"
                        v-model="editingProduct.image"
                        accept="image/*"
                        variant="outlined"
                      ></v-file-input>
                      <v-card-actions>
                        <v-btn type="submit" block color="blue" variant="outlined">Actualizar Producto</v-btn>
                      </v-card-actions>
                  </form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="black" block @click="dialog = false" variant="plain">Cerrar</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>
<script setup>
import { defineProps, ref, onBeforeMount, computed, defineEmits } from "vue";
import axios from "axios";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update']);  // Define los eventos que emitirá este componente

const editingProduct = ref({});
const openDialog = computed(() => props.dialog);
const categories = ref([]);

onBeforeMount(() => {
  editingProduct.value = props.product;
  openDialog.value = props.dialog;
  loadCategories(); // Cargar categorías al inicio
});

const loadCategories = async () => {
  categories.value = ['Mouses', 'Teclados', 'Diademas', 'Accesorios', 'Streaming'];
};

const saveTask = async () => {
  const url = `http://localhost:3006/products/${editingProduct.value.id}`;
  const result = await axios.put(url, editingProduct.value);
  console.log(result);
  emit('update', true);  // Emite el evento 'update' al componente padre
};

</script>

<style scoped>
/* Estilos para tu componente de edición de producto */
.container {
  max-width: 500px;
}

/* Agrega otros estilos necesarios aquí */
</style>






