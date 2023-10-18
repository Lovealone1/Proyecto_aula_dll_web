<template>
    <div class="semi-header">
      <h3>PANEL DE USUARIOS</h3>
    </div>
    <div class="mt-3 center-content">
      <v-table class="custom-table">
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Nombre Completo</th>
            <th class="text-left">E-Mail</th>
            <th class="text-left">Rol</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.id }}</td>
            <td>
              <v-btn icon="mdi-pencil" variant="text" @click="editUser(user)"></v-btn>
              <v-btn icon="mdi-delete-off" variant="text" @click="showDeleteConfirmationDialog = true; deletingUser = user"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <edit-usuario v-if="editingUser != null" :dialog="isEdit" :user="editingUser" @updateUsuario="updateUser"/>
    </div>
  
    <!-- Cuadro de diálogo de confirmación para eliminar tarea -->
    <v-dialog v-model="showDeleteConfirmationDialog" max-width="400">
      <v-card elevation="0">
        <v-card-title class="headline">Confirmar eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar esta tarea?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteUserConfirmation(deletingUser)">Confirmar</v-btn>
          <v-btn @click="showDeleteConfirmationDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script setup>
  import axios from "axios";
  import { ref, onBeforeMount } from "vue";
  import Swal from 'sweetalert2';
  import EditUsuario from './edit_usuario.vue';

  const users = ref([]);
  const isEdit = ref(false);
  const editingUser = ref(null);
  const showDeleteConfirmationDialog = ref(false);
  const deletingUser = ref(null);
  
  onBeforeMount(() => {
    loadUsers();
  });
  
  const loadUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3006/users");
      users.value = data;
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };
  
  const deleteUser = async (user) => {
    const url = `http://localhost:3006/users/${user.id}`;
    try {
      await axios.delete(url);
      
      showSuccessAlert();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      showErrorAlert();
    }
    loadUsers();
  };
  
  const deleteUserConfirmation = async (user) => {
    if (user) {
      await deleteUser(user);
      showDeleteConfirmationDialog.value = false;
    }
  };
  
  const editUser = async (user) => {
    isEdit.value = true;
    editingUser.value = { ...user };
  };
  
  const updateUser = (isUpdated) => {
    console.log(isUpdated);
    isEdit.value = false;
    editingUser.value = null;
    loadUsers();
  };
  
  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Usuario eliminado',
      text: 'El usuario ha sido eliminado exitosamente.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    });
  };
  
  const showErrorAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al eliminar el usuario.',
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
  
  .custom-table th, .custom-table td {
    padding: 10px; /* Espacio interno dentro de las celdas */
  }
  </style>