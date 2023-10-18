<template>
    <div>
        <v-dialog v-model="openDialog" max-width="500px">
            <v-card elevation="0">
                <v-card-item>
                    <v-card-title>Edicion de usuarios</v-card-title>
                    <v-card-subtitle>Formulario para la gestión usuarios</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <form action="javascript:void(0)" @submit="saveUser">
  
                        <v-text-field
                        label="Nombre Completo"
                        v-model="editingUser.fullName"
                        :rules="[v => !!v || 'Este campo es obligatorio']"
                        required
                        placeholder="Ingrese el nombre del usuario"
                        variant="outlined"
                        ></v-text-field>
  
                        <v-text-field
                          label="SKU"
                          v-model="editingUser.email"
                          :rules="[v => !!v || 'Este campo es obligatorio']"
                          required
                          placeholder="Ingrese el SKU"
                          variant="outlined"
                        ></v-text-field>
  
                        <v-text-field
                          label="Contraseña"
                          v-model="editingUser.password"
                          :rules="[v => !!v || 'Este campo es obligatorio', v => /^\d+(\.\d{1,2})?$/.test(v) || 'Ingrese un valor numérico válido']"
                          required
                          placeholder="Ingrese el precio"
                          variant="outlined"
                        ></v-text-field>
  
                        <v-card-actions>
                          <v-btn type="submit" block color="blue" variant="outlined">Actualizar Usuario</v-btn>
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
  import { defineProps, ref, onBeforeMount, computed } from "vue";
  import axios from "axios";
  import Swal from 'sweetalert2';  

  const props = defineProps(["dialog", "user"]); 

  const editingUser = ref({});
  const openDialog = computed(() => props.dialog);

  const emit = defineEmits(['updateUsuario']);

  onBeforeMount(() => {
    editingUser.value = props.user;
    openDialog.value = props.dialog;
  });
  const saveUser = async () => {
  const url = `http://localhost:3006/users/${editingUser.value.id}`;
  try {
    const result = await axios.put(url, editingUser.value);
    console.log(result);
    Swal.fire({
      icon: 'success',
      title: 'Usuario actualizado',
      text: 'El usuario ha sido actualizado exitosamente.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
    emit("updateUsuario", true);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al actualizar el usuario.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Cerrar'
    });
  }
};
</script>
  
  <style scoped>

  .container {
    max-width: 500px;
  }
  
  /* Agrega otros estilos necesarios aquí */
  </style>
  
  
  
  
  
  
  