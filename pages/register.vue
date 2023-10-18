<template>
  <div class="login-container">
    <v-img class="mx-auto my-6" max-width="228"
      src="https://www.pngkit.com/png/full/364-3642224_clarity-ecommerce-logo-logo-e-commerce-png.png"></v-img>
    <v-card class="mx-auto pa-12 pb-8" elevation="2" max-width="448" rounded="lg">

      <div class="text-subtitle-1 text-medium-emphasis">Nombre completo</div>

      <v-text-field v-model="fullName" density="compact" placeholder="Nombre completo"
        prepend-inner-icon="mdi-account-outline" variant="underlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Correo electrónico</div>

      <v-text-field v-model="email" density="compact" placeholder="Correo electrónico"
        prepend-inner-icon="mdi-email-outline" variant="underlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Contraseña</div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingresa tu contraseña"
        prepend-inner-icon="mdi-lock-outline" variant="underlined"
        @click:append-inner="visible = !visible"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Confirmar Contraseña</div>

      <v-text-field v-model="confirmPassword" :append-inner-icon="confirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="confirmVisible ? 'text' : 'password'" density="compact" placeholder="Confirma tu contraseña"
        prepend-inner-icon="mdi-lock-outline" variant="underlined"
        @click:append-inner="confirmVisible = !confirmVisible"></v-text-field>

      <v-btn block class="mb-8" color="blue" size="large" variant="outlined" @click="register">
        Registrarse
      </v-btn>

      <v-card-text class="text-center">
        <router-link to="/login">
          <a class="text-grey text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
            ¿Ya tienes una cuenta? Inicia sesión <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </router-link>

      </v-card-text>

    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      visible: false,
      confirmVisible: false,
      users: []
    };
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:3006/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    },
    async register() {
      await this.getUsers();

      // Expresión regular para validar el formato del correo electrónico
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

      if (!emailRegex.test(this.email)) {
        Swal.fire('Error', 'El formato del correo electrónico no es válido.', 'error');
      } else {
        const emailExists = this.users.some(user => user.email === this.email);

        if (emailExists) {
          Swal.fire('Error', 'El correo electrónico ya está registrado.', 'error');
        } else if (this.password !== this.confirmPassword) {
          Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
        } else {
          const userId = uuidv4();  // Generate a new UUID
          const newUser = {
            id: userId,
            fullName: this.fullName,
            email: this.email,
            password: this.password
          };
          await this.addUser(newUser);
          Swal.fire('Registro exitoso', 'Te has registrado correctamente.', 'success');
          this.$router.push('/');
        }
      }
    },
    async addUser(user) {
      try {
        const response = await axios.post('http://localhost:3006/users', user);
        console.log('Usuario agregado:', response.data);
      } catch (error) {
        console.error('Error al agregar usuario:', error.response.data);
      }
    }

  }
};
definePageMeta({
  layout: "blank",
});
</script>

<style scoped>
.login-container {
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 75px;
}

.login-container v-card {
  width: 100%;
  /* Ajusta el ancho de la tarjeta al 100% del contenedor */
}
</style>