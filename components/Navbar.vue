<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand" to="/">Healthier Recipes</nuxt-link>
      <button
        class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"/>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto justify-content-center">
          <li v-for="(item, index) in menuItems" :key="index" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">{{ item.title }}</a>
            <div class="dropdown-menu">
              <nuxt-link v-for="(subItem, subIndex) in item.subItems" :key="subIndex" class="dropdown-item" :to="subItem.link">{{ subItem.name }}</nuxt-link>
              <div v-if="subIndex < item.subItems.length - 1" class="dropdown-divider"/>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarDropdown" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-person-circle" style="font-size: 18px;"/>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <template v-if="!isAdmin">
                <nuxt-link class="dropdown-item" to="/user/myProfile">My Profile</nuxt-link>
                <div class="dropdown-divider"/>
                <nuxt-link class="dropdown-item" to="/user/member/myRecipeList">My Recipes</nuxt-link>
                <div class="dropdown-divider"/>
                <nuxt-link class="dropdown-item" to="/user/member/savedList">Saved Recipes</nuxt-link>
                <div class="dropdown-divider"/>
                <nuxt-link class="dropdown-item" to="/user/member/myReview">My Reviews</nuxt-link>
                <div class="dropdown-divider"/>
                <nuxt-link class="dropdown-item" to="/user/shoppingList/view">Shopping List</nuxt-link>
                <div class="dropdown-divider"/>
              </template>
              <template v-if="isAdmin">
                <nuxt-link class="dropdown-item" to="/user/admin/dashboard">Dashboard</nuxt-link>
                <div class="dropdown-divider"/>
                <nuxt-link class="dropdown-item" to="/user/admin/memberManage">Manage Members</nuxt-link>
                <div class="dropdown-divider"/>
                <nuxt-link class="dropdown-item" to="/user/admin/memberReport">Member Reports</nuxt-link>
                <div class="dropdown-divider"/>
                <nuxt-link class="dropdown-item" to="/user/admin/recipeReport">Recipe Reports</nuxt-link>
                <div class="dropdown-divider"/>
                <nuxt-link class="dropdown-item" to="/user/admin/generateCsvReport">Generate Csv</nuxt-link>
                <div class="dropdown-divider"/>
              </template>
              <template v-if="isLoggedIn">
                <nuxt-link class="dropdown-item" to="/user/logout">Logout</nuxt-link>
              </template>
              <template v-else>
                <nuxt-link class="dropdown-item" to="/user/login">Login</nuxt-link>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive } from 'vue';

const menuItems = reactive([
  {
    title: 'Cuisine',
    subItems: [
      { name: 'African', link: '/recipe/search/african' },
      { name: 'American', link: '/recipe/search/american' },
      { name: 'Asian', link: '/recipe/search/asian' },
      { name: 'Italian', link: '/recipe/search/italian' },
      { name: 'Mexican', link: '/recipe/search/mexican' },
      { name: 'French', link: '/recipe/search/french' },
      { name: 'Indian', link: '/recipe/search/indian' }
    ]
  },
  {
    title: 'Type of Dish',
    subItems: [
      { name: 'Appetizers', link: '/recipe/search/appetizers' },
      { name: 'Breakfast', link: '/recipe/search/breakfast' },
      { name: 'Desserts', link: '/recipe/search/desserts' },
      { name: 'Main Dish', link: '/recipe/search/main-dish' },
      { name: 'Salads', link: '/recipe/search/salads' },
      { name: 'Soups-Stews', link: '/recipe/search/soup' },
      { name: 'Snacks', link: '/recipe/search/snack' }
    ]
  },
  {
    title: 'Cooking Method',
    subItems: [
      { name: 'Baking', link: '/recipe/search/baking' },
      { name: 'Grilling', link: '/recipe/search/grilling' },
      { name: 'Slow-Cooker', link: '/recipe/search/slow' },
      { name: 'Stir-Fry', link: '/recipe/search/stir' },
      { name: 'No-Cook', link: '/recipe/search/no-cook' },
      { name: 'Roasting', link: '/recipe/search/roasting' },
      { name: 'Fry', link: '/recipe/search/fry' }
    ]
  },
  {
    title: 'Dietary Considerations',
    subItems: [
      { name: 'Vegan', link: '/recipe/search/vegan' },
      { name: 'Vegetarian', link: '/recipe/search/vege' },
      { name: 'Gluten-Free', link: '/recipe/search/gluten' },
      { name: 'Low-Carb', link: '/recipe/search/low-carb' },
      { name: 'Diabetic', link: '/recipe/search/diabetic' },
      { name: 'Low-Fat', link: '/recipe/search/low-fat' },
      { name: 'High-Protein', link: '/recipe/search/high-protein' }
    ]
  },
  {
    title: 'Ingredients',
    subItems: [
      { name: 'Chicken', link: '/recipe/search/chicken' },
      { name: 'Beef', link: '/recipe/search/beef' },
      { name: 'Pasta', link: '/recipe/search/pasta' },
      { name: 'Chocolate', link: '/recipe/search/chocolate' },
      { name: 'Vegetables', link: '/recipe/search/vegetables' },
      { name: 'Pork', link: '/recipe/search/pork' },
      { name: 'Cheese', link: '/recipe/search/cheese' }
    ]
  },
  {
    title: 'Occasions and Events',
    subItems: [
      { name: 'Christmas', link: '/recipe/search/christmas' },
      { name: 'Easter', link: '/recipe/search/easter' },
      { name: 'Thanksgiving', link: '/recipe/search/thanksgiving' },
      { name: 'Birthday', link: '/recipe/search/birthday' },
      { name: 'Wedding', link: '/recipe/search/wedding' },
      { name: 'Halloween', link: '/recipe/search/halloween' },
      { name: 'New Year', link: '/recipe/search/new-year' }
    ]
  },
  {
    title: 'Preparation Time and Difficulty',
    subItems: [
      { name: '15-Minutes-or-Less', link: '/recipe/search/15' },
      { name: '30-Minutes-or-Less', link: '/recipe/search/30' },
      { name: 'Easy', link: '/recipe/search/easy' },
      { name: 'Beginner-Cook', link: '/recipe/search/beginner-cook' },
      { name: 'Quick-and-Easy', link: '/recipe/search/quick-and-easy' },
      { name: 'Kid-Friendly', link: '/recipe/search/kid-friendly' },
      { name: 'Make-Ahead', link: '/recipe/search/make-ahead' }
    ]
  }
]);

const isAdmin = ref(false); // Replace with actual logic to determine if the user is an admin
const isLoggedIn = ref(false); // Replace with actual logic to determine if the user is logged in
</script>

<style scoped>
.nav-item {
    position: relative;
}

.navbar-collapse {
    justify-content: center;
}

.no-caret .dropdown-toggle::after {
    display: none;
}

.dropdown-menu {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.nav-item:hover .dropdown-menu {
    display: block;
    opacity: 1;
}

.nav-item a:hover {
    background-color: #4cae4c;
    color: white;
    transition: background-color 0.3s ease;
}

.dropdown-submenu {
    position: relative;
}

.dropdown-submenu .dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -1px;
}
</style>