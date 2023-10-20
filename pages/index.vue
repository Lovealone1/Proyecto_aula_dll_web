<template>
  <v-container class="header-top" fluid style="height: 50px;">
    <v-row align="center" justify="space-between">
      <v-col style="margin-top: 10px;">
        <!-- Social icons -->
        <v-row dense align="center">
          <a href="#" class="icon-link" style="color: black;">
            <v-icon size="24">mdi-facebook</v-icon>
          </a>
          <a href="#" class="icon-link" style="color: black;">
            <v-icon size="24">mdi-twitter</v-icon>
          </a>
          <a href="#" class="icon-link" style="color: black;">
            <v-icon size="24">mdi-instagram</v-icon>
          </a>
          <a href="#" class="icon-link" style="color: black;">
            <v-icon size="24">mdi-linkedin</v-icon>
          </a>
        </v-row>
      </v-col>
  
      <v-col class="header-alert-news" style="margin-top: 10px; padding-right: 290px;">
        <!-- Alert message -->
        <p class="ma-0">
          <b>Envío gratuito</b> Para compras superiores a $200.000
        </p>
      </v-col>
    </v-row>
  </v-container>
  
  <v-container class="header-main" style="background-color: white;">
      <v-row align="center" justify="space-between">
        <v-col style="padding-right: 250px;">
          <v-img src="https://www.pngkit.com/png/full/364-3642224_clarity-ecommerce-logo-logo-e-commerce-png.png" alt="Logo" max-height="40"></v-img>
        </v-col>
        <v-col>
          <v-text-field
                  v-model="searchQuery"
                  placeholder="Buscar un producto..."
                  style="width: 178%; padding-right: 760px; height: 30px; margin-top: -10px; margin-bottom: 18px;"
                  variant="outlined"
                  append-icon="mdi-magnify"
                  @click:append=""
          ></v-text-field>
        </v-col>
        <v-col>
          <v-row align="center" justify="end" >
            <router-link to="/login">
            <a href="#" class="icon-link" style="margin-right: 15px; color: black;">
              <v-icon size="30">mdi-account-outline</v-icon>
            </a>
          </router-link>
            <a href="#" class="icon-link" style="margin-right: 15px; color: black;">
              <v-icon size="30">mdi-cart-outline</v-icon>
              <v-badge :content="bagCount"></v-badge>
            </a>

            <div>
              <v-icon @click="toggleMenu" size="30">mdi-cog</v-icon>
              <v-menu v-model= "isMenuOpen" :offset-y="menuOffsetY" style="left: 1730px; top: 105px;">
                <v-list elevation="2">
                  <v-list-item v-for="(option, index) in options" :key="index" @click="handleOptionClick(option)">
                    <v-list-item-title>{{ option.text }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  
    <v-container class="nav-menu" fluid style="height: 55px;">
      <!-- Desktop Navigation Menu -->
      <v-row class="desktop-navigation-menu" justify="center" align="center">
        <v-col v-for="(category, index) in categories" :key="index">
          <v-menu offset-y class="v-menu">
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on" class="category-button" variant="plain">{{ category.title }}</v-btn>
            </template>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <Banner />
    <Featured />
    <Footer />
  </template>
    
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        search: '',
        showSearch: false,
        products: [],
        filteredProducts: [],
        heartCount: 0,
        bagCount: 0,
        categories: [
          { title: 'Desktops', subcategories: ['Shirt', 'Shorts & Jeans', 'Safety Shoes', 'Wallet'] },
          { title: 'Displays', subcategories: ['Shirt', 'Shorts & Jeans', 'Safety Shoes', 'Wallet'] },
          { title: 'Laptops', subcategories: ['Dress & Frock', 'Earrings', 'Necklace', 'Makeup Kit'] },
          { title: 'Smartwatchs', subcategories: ['Earrings', 'Couple Rings', 'Necklace', 'Bracelets'] },
          { title: 'Smartphones', subcategories: ['Clothes Perfume', 'Deodorant', 'Flower Fragrance', 'Air Freshener'] },
          { title: '¡Spooky Sale!' }
        ],
        isMenuOpen: false,
        menuOffsetY: 100,
        options: [
        { text: 'Panel de productos', link: '/PanelProducto'},
        { text: 'Panel de usuarios', link: '/PanelUsuarios' },
        { text: 'Cerrar Sesión', link: '/opcion3' }
        ],
        isMobileMenuOpen: false
      };
    },
    methods: {
      toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
      },
      openProductDialog() {
        this.$refs.crudProductoDialog.dialog = true;
      },
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      handleOptionClick(option) {
      // Redirigir a la página correspondiente a la opción seleccionada
      this.$router.push(option.link);
      this.isMenuOpen = false;
      },
      async searchProducts() {
      try {
        if (this.searchTerm !== '') {
          const response = await axios.get(
            `https://api.techspecs.io/v4/all/products`, 
            {
              params: {
                apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19PcWtISXQzTDg1RWF2RSIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNUXF5dkJESWxQbVVQcE1SWUVWdnlLZSIsImlhdCI6MTY5Nzc0NzE0M30.WEwpneXEW5pGsLfIVa01Upjut6kO5UZuf_E-uVIDWRE', // Replace with your TechSpecs API key
                limit: 100,
                nameStartsWith: this.searchTerm, 
              },
            }
          );

          this.filteredProducts = response.data.data.results; // Adjust as needed based on the API response structure
        } else {
          this.filteredProducts = this.products;
        }
      } catch (error) {
        console.error(error);
      }
    },

    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (!this.showSearch) {
        this.searchTerm = '';
      }
    },
  },

  watch: {
    searchTerm(newTerm, oldTerm) {
      if (newTerm === '') {
        this.filteredProducts = this.products;
      }
    },
  },

  beforeCreate() {
    axios.get('https://api.techspecs.io/products?eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19PcWtISXQzTDg1RWF2RSIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNUXF5dkJESWxQbVVQcE1SWUVWdnlLZSIsImlhdCI6MTY5Nzc0NzE0M30.WEwpneXEW5pGsLfIVa01Upjut6kO5UZuf_E-uVIDWRE&limit=100') // Replace with the correct TechSpecs API endpoint and your API key
      .then((response) => {
        this.products = response.data.data.results; 
        this.filteredProducts = this.products;
        console.log(response.data.data.results);
      })
      .catch((error) => console.error(error));
  },
};
</script>
    
<style scoped>
  .header-top {
    background-color: #f0f0f0;
    padding: 5px 10px;
  }

  .header-alert-news {
    display: flex;
    align-items: center;
  }

  .header-alert-news p {
    margin: 0;
    font-size: 14px;
  }

  .nav-menu .desktop-navigation-menu {
    height: 100%;
  }

  .nav-menu {
    background-color: #f0f0f0;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .category-button {
    margin: 0 70px;
    padding: 0 -20px;
  }

  .v-menu {
    right: -10;
  }
</style>
