<template>
  <div class="login-container">
    <v-img class="mx-auto my-6" max-width="228"
      src="https://www.pngkit.com/png/full/364-3642224_clarity-ecommerce-logo-logo-e-commerce-png.png"></v-img>
    <v-card class="mx-auto pa-12 pb-8" elevation="1" max-width="448" rounded="lg">

      <div class="text-subtitle-1 text-medium-emphasis">Correo electrónico</div>

      <v-text-field v-model="email" density="compact" placeholder="Correo electrónico"
        prepend-inner-icon="mdi-email-outline" variant="underlined" :rules="[v => !!v || 'Este campo es obligatorio']"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Contraseña
        <router-link to="/contraRecuperar">
          <a class="text-body-2 font-weight-regular text-grey" href="#" rel="noopener noreferrer" target="_blank">
            ¿Olvidaste tu contraseña?</a>
        </router-link>
      </div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingresa tu contraseña"
        prepend-inner-icon="mdi-lock-outline" variant="underlined"
        @click:append-inner="visible = !visible" :rules="[v => !!v || 'Este campo es obligatorio']"></v-text-field>

      <v-btn block class="mb-8" color="blue" size="large" variant="outlined" @click="login">
        Iniciar sesión
      </v-btn>

      <v-card-text class="text-center">
        <router-link to="/register">
          <a class="text-grey text-decoration-none" href="./register" rel="noopener noreferrer" target="_blank">
            ¡Registrate ahora! <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </router-link>

      </v-card-text>

    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';


export default {
  data() {
    return {
      email: '',
      password: '',
      visible: false,
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
    async login() {
      await this.getUsers();

      const foundUser = this.users.find(
        user =>
          user.email === this.email && user.password === this.password
      );

      if (foundUser) {
        console.log('Inicio de sesión exitoso para el usuario:', foundUser);
        this.$router.push('/');
        Swal.fire(
          '¡Inicio de sesión exitoso!',
          'Has iniciado sesión correctamente.',
          'success'
        )
      } else {
        console.error('Credenciales incorrectas. Inicio de sesión fallido.');
        Swal.fire(
          'Error',
          'Credenciales incorrectas. Inicio de sesión fallido.',
          'error'
        )
      }
    },

  },
};
definePageMeta({
  layout: "blank",
});
</script>

<style scoped>
.login-container {

  justify-content: center;
  align-items: center;
  height: 150vh;
  padding-top: 130px;
}

.login-container v-card {
  width: 100%;
}
</style>