<template>
    <div class="forgot-password-container">
        <v-img class="mx-auto my-6" max-width="228"
            src="https://www.pngkit.com/png/full/364-3642224_clarity-ecommerce-logo-logo-e-commerce-png.png"></v-img>
        <v-card class="mx-auto pa-12 pb-8" elevation="1" max-width="448" rounded="lg">

            <div class="text-subtitle-1 text-medium-emphasis">Correo electrónico</div>

            <v-text-field v-model="email" density="compact" placeholder="Correo electrónico"
                prepend-inner-icon="mdi-email-outline" variant="underlined"></v-text-field>

            <v-btn block class="mb-8" color="blue" size="large" variant="outlined" @click="resetPassword">
                Restablecer contraseña
            </v-btn>

            <v-card-text class="text-center">
                <a class="text-grey text-decoration-none" href="./login" rel="noopener noreferrer" target="_blank">
                    ¿Recuerdas tu contraseña? Inicia sesión. <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
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
        };
    },
    methods: {
        async resetPassword() {
            try {
                const response = await axios.get('http://localhost:3006/users');
                const users = response.data;
                const userExists = users.some(user => user.email === this.email);

                if (!userExists) {
                    Swal.fire('Error', 'El correo electrónico no está registrado.', 'error');
                } else {
                    Swal.fire('Enviado', 'Correo de restablecimiento de contraseña enviado a: ' + this.email, 'success');
                    this.$router.push('/login');
                }
            } catch (error) {
                Swal.fire('Error', 'Error al verificar el correo electrónico: ' + error, 'error');
            }
        },
    },
};
definePageMeta({
    layout: "blank",
});
</script>
  
<style scoped>
.forgot-password-container {

    justify-content: center;
    align-items: center;
    height: 150vh;
    padding-top: 130px;
}

.forgot-password-container v-card {
    width: 100%;
}
</style>
  