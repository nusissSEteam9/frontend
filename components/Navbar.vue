<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand" to="/">Healthier Recipes</nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto justify-content-center">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="nav-item dropdown"
          >
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >{{ item.title }}</a
            >
            <div class="dropdown-menu">
              <nuxt-link
                v-for="(subItem, subIndex) in item.subItems"
                :key="subIndex"
                class="dropdown-item"
                :to="subItem.link"
                >{{ subItem.name }}
                <div
                  v-if="subIndex < item.subItems.length - 1"
                  class="dropdown-divider"
                />
              </nuxt-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle" style="font-size: 18px" />
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <template v-if="!isAdmin">
                <nuxt-link class="dropdown-item" to="/member/myProfile"
                  >My Profile</nuxt-link
                >
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/member/myRecipeList"
                  >My Recipes</nuxt-link
                >
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/member/savedList"
                  >Saved Recipes</nuxt-link
                >
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/member/myReview"
                  >My Reviews</nuxt-link
                >
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/member/shoppingList/view"
                  >Shopping List</nuxt-link
                >
                <div class="dropdown-divider" />
              </template>
              <template v-if="isAdmin">
                <nuxt-link class="dropdown-item" to="/user/admin/dashboard"
                  >Dashboard</nuxt-link
                >
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/admin/memberManage"
                  >Manage Members</nuxt-link
                >
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/admin/memberReport"
                  >Member Reports</nuxt-link
                >
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/admin/recipeReport"
                  >Recipe Reports</nuxt-link
                >
                <div class="dropdown-divider" />
                <nuxt-link
                  class="dropdown-item"
                  to="/user/admin/generateCsvReport"
                  >Generate Csv</nuxt-link
                >
                <div class="dropdown-divider" />
              </template>
              <template v-if="isLoggedIn">
                <nuxt-link class="dropdown-item" to="/user/logout"
                  >Logout</nuxt-link
                >
              </template>
              <template v-else>
                <nuxt-link class="dropdown-item" to="/user/login"
                  >Login</nuxt-link
                >
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
      { name: 'African', link: '/?query=african' },
      { name: 'American', link: '/?query=american' },
      { name: 'Asian', link: '/?query=asian' },
      { name: 'Italian', link: '/?query=italian' },
      { name: 'Mexican', link: '/?query=mexican' },
      { name: 'French', link: '/?query=french' },
      { name: 'Indian', link: '/?query=indian' },
    ],
  },
  {
    title: 'Type of Dish',
    subItems: [
      { name: 'Appetizers', link: '/?query=appetizers' },
      { name: 'Breakfast', link: '/?query=breakfast' },
      { name: 'Desserts', link: '/?query=desserts' },
      { name: 'Main Dish', link: '/?query=main-dish' },
      { name: 'Salads', link: '/?query=salads' },
      { name: 'Soups-Stews', link: '/?query=soup' },
      { name: 'Snacks', link: '/?query=snack' },
    ],
  },
  {
    title: 'Cooking Method',
    subItems: [
      { name: 'Baking', link: '/?query=baking' },
      { name: 'Grilling', link: '/?query=grilling' },
      { name: 'Slow-Cooker', link: '/?query=slow' },
      { name: 'Stir-Fry', link: '/?query=stir' },
      { name: 'No-Cook', link: '/?query=no-cook' },
      { name: 'Roasting', link: '/?query=roasting' },
      { name: 'Fry', link: '/?query=fry' },
    ],
  },
  {
    title: 'Dietary Considerations',
    subItems: [
      { name: 'Vegan', link: '/?query=vegan' },
      { name: 'Vegetarian', link: '/?query=vege' },
      { name: 'Gluten-Free', link: '/?query=gluten' },
      { name: 'Low-Carb', link: '/?query=low-carb' },
      { name: 'Diabetic', link: '/?query=diabetic' },
      { name: 'Low-Fat', link: '/?query=low-fat' },
      { name: 'High-Protein', link: '/?query=high-protein' },
    ],
  },
  {
    title: 'Ingredients',
    subItems: [
      { name: 'Chicken', link: '/?query=chicken' },
      { name: 'Beef', link: '/?query=beef' },
      { name: 'Pasta', link: '/?query=pasta' },
      { name: 'Chocolate', link: '/?query=chocolate' },
      { name: 'Vegetables', link: '/?query=vegetables' },
      { name: 'Pork', link: '/?query=pork' },
      { name: 'Cheese', link: '/?query=cheese' },
    ],
  },
  {
    title: 'Occasions and Events',
    subItems: [
      { name: 'Christmas', link: '/?query=christmas' },
      { name: 'Easter', link: '/?query=easter' },
      { name: 'Thanksgiving', link: '/?query=thanksgiving' },
      { name: 'Birthday', link: '/?query=birthday' },
      { name: 'Wedding', link: '/?query=wedding' },
      { name: 'Halloween', link: '/?query=halloween' },
      { name: 'New Year', link: '/?query=new-year' },
    ],
  },
  {
    title: 'Preparation Time and Difficulty',
    subItems: [
      { name: '15-Minutes-or-Less', link: '/?query=15' },
      { name: '30-Minutes-or-Less', link: '/?query=30' },
      { name: 'Easy', link: '/?query=easy' },
      { name: 'Beginner-Cook', link: '/?query=beginner-cook' },
      { name: 'Quick-and-Easy', link: '/?query=quick-and-easy' },
      { name: 'Kid-Friendly', link: '/?query=kid-friendly' },
      { name: 'Make-Ahead', link: '/?query=make-ahead' },
    ],
  },
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
