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
            
            <a href="#" class="icon-link" style="margin-right: 20px; color: black;">
              <v-icon size="30">mdi-heart-outline</v-icon>
              <v-badge :content="heartCount"></v-badge>
            </a>
            <a href="#" class="icon-link" style="margin-right: 15px; color: black;">
              <v-icon size="30">mdi-cart-outline</v-icon>
              <v-badge :content="bagCount"></v-badge>
            </a>
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

  </template>
    
  <script>
  import CrudProductoDialog from "@/components/crud_producto.vue";
  export default {
    
    data() {
      return {
        currency: 'usd',
        language: 'en-US',
        search: '',
        heartCount: 0,
        bagCount: 0,
        categories: [
          { title: 'Teclados', subcategories: ['Shirt', 'Shorts & Jeans', 'Safety Shoes', 'Wallet'] },
          { title: 'Diademas', subcategories: ['Shirt', 'Shorts & Jeans', 'Safety Shoes', 'Wallet'] },
          { title: 'Mouses', subcategories: ['Dress & Frock', 'Earrings', 'Necklace', 'Makeup Kit'] },
          { title: 'Accesorios', subcategories: ['Earrings', 'Couple Rings', 'Necklace', 'Bracelets'] },
          { title: 'Streaming', subcategories: ['Clothes Perfume', 'Deodorant', 'Flower Fragrance', 'Air Freshener'] },
          { title: '¡Ofertas!' }
        ],
        currencyOptions: ['USD', 'EUR'],
        languageOptions: ['English', 'Español', 'Français'],
        isMobileMenuOpen: false
      };
    },
    methods: {
      toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
      },
      openProductDialog() {
        this.$refs.crudProductoDialog.dialog = true;
      }
    }
  };
  </script>
    
    <style scoped>
    .header-top {
    background-color: #f0f0f0; /* Add your desired background color */
    padding: 5px 10px; /* Adjust padding as needed */
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
    height: 100%; /* Establece la altura al 100% del contenedor */
    }
  .nav-menu {
    background-color: #f0f0f0; 
  }

  .nav-menu {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .category-button {
    margin: 0 70px;
    padding: 0 -20px;
  }
    </style>
    