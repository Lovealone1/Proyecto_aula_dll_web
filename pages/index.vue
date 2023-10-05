<template>
    <v-container>
      <v-app>
        <v-app-bar class="header">
          <v-toolbar-title>
            <v-img
              src="https://cdn-icons-png.flaticon.com/512/869/869687.png"
              alt="Logo"
              max-height="40"
            />
          </v-toolbar-title>
  
          <v-spacer></v-spacer>
  
          <div class="search-bar-container">
            <v-card-text>
                <v-text-field
                :loading="loading"
                density="compact"
                variant="solo"
                label="Buscar productos"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="onClick"
                color="#D3DBE0"
                ></v-text-field>
            </v-card-text>
          </div>
  
          <v-spacer></v-spacer> <!-- Agregamos otro spacer para empujar los botones a la derecha -->
  
          <v-btn icon>
            <v-icon @click="goToCart">mdi-cart</v-icon>
          </v-btn>
  
          <v-btn icon>
            <v-icon @click="goToUser">mdi-account</v-icon>
          </v-btn>
        </v-app-bar>
  
        <v-row>
          <v-col>
            <!-- Contenido de tu página -->
          </v-col>
        </v-row>
      </v-app>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: '',
      };
    },
    methods: {
      goToCart() {
        console.log('Ir al carrito');
      },
      goToUser() {
      console.log('Ir al perfil de usuario');
      // Redirecciona al componente de login
      this.$router.push({ name: 'login' });
    },
    },
  };
  </script>
  
  <style scoped>
  .search-bar-container {
    flex: 1; /* Aprovecha el espacio disponible */
    display: flex;
    justify-content: left;
    align-items: left;
  }
  
  /* Estilo adicional para asegurar que el ícono en la barra de búsqueda no se mueva hacia la derecha */
  .search-bar-container .v-input__icon {
    left: 0;
  }
  
  /* Estilo adicional para ajustar el ícono en la barra de búsqueda */
  .search-bar-container {
    margin-left: -450px; /* Ajusta el margen según sea necesario */
  }

  </style>
  