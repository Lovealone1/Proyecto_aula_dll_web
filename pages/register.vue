<template>
  <div class="login-container">
    <v-img class="mx-auto my-6" max-width="228"
      src="https://www.pngkit.com/png/full/364-3642224_clarity-ecommerce-logo-logo-e-commerce-png.png"></v-img>
    <v-card class="mx-auto pa-12 pb-8" elevation="2" max-width="448" rounded="lg">
      <form @submit.prevent="register">
        <div class="text-subtitle-1 text-medium-emphasis">Nombre completo</div>

        <v-text-field v-model="fullName" density="compact" placeholder="Nombre completo"
          prepend-inner-icon="mdi-account-outline" variant="underlined" :rules="[v => !!v || 'Este campo es obligatorio']"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Correo electrónico</div>

        <v-text-field
          v-model="email"
          density="compact"
          placeholder="Correo electrónico"
          prepend-inner-icon="mdi-email-outline"
          variant="underlined"
          :rules="emailRules"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Contraseña</div>

        <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingresa tu contraseña"
          prepend-inner-icon="mdi-lock-outline" variant="underlined"
          @click:append-inner="visible = !visible" :rules="[v => !!v || 'Este campo es obligatorio']"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Confirmar Contraseña</div>

        <v-text-field v-model="confirmPassword" :append-inner-icon="confirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="confirmVisible ? 'text' : 'password'" density="compact" placeholder="Confirma tu contraseña"
          prepend-inner-icon="mdi-lock-outline" variant="underlined"
          @click:append-inner="confirmVisible = !confirmVisible" :rules="[v => !!v || 'Este campo es obligatorio']"></v-text-field>

        <v-btn type="submit" block class="mb-8" color="blue" size="large" variant="outlined">
          Registrarse
        </v-btn>
      
      </form>
      

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

let nextUserId = 3;  // Contador para el ID secuencial

export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      visible: false,
      confirmVisible: false,
      users: [],
      emailRules: [
        v => !!v || 'El correo electrónico es obligatorio',
        v => /.+@.+\..+/.test(v) || 'Correo electrónico debe contener un @'
      ]
    };
  },
  computed: {
    isFormValid() {
      return (
        !!this.fullName &&
        !!this.email &&
        !!this.password &&
        !!this.confirmPassword &&
        this.password === this.confirmPassword
      );
    }
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
  // Verificar que todos los campos estén completos
  if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, complete todos los campos.'
    });
    return;
  }

  await this.getUsers();

  // Verificar si el correo electrónico ya está registrado
  const emailExists = this.users.some(user => user.email === this.email);

  if (emailExists) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El correo electrónico ya está registrado.'
    });
  } else if (this.password !== this.confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Las contraseñas no coinciden.'
    });
  } else {
    const userId = nextUserId;
    nextUserId++;

    const newUser = {
      id: userId,
      fullName: this.fullName,
      email: this.email,
      password: this.password
    };

    await this.addUser(newUser);

    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Usuario registrado correctamente.'
    });

    this.$router.push('/');
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