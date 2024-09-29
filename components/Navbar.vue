<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/">Healthier Recipes</NuxtLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- Cuisine -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              Cuisine
            </a>
            <div class="dropdown-menu">
              <NuxtLink class="dropdown-item" to="/recipe/search/african">African</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/american">American</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/asian">Asian</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/italian">Italian</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/mexican">Mexican</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/french">French</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/indian">Indian</NuxtLink>
            </div>
          </li>

          <!-- Type of Dish -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              Type of Dish
            </a>
            <div class="dropdown-menu">
              <NuxtLink class="dropdown-item" to="/recipe/search/appetizers">Appetizers</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/breakfast">Breakfast</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/desserts">Desserts</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/main-dish">Main Dish</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/salads">Salads</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/soup">Soups-Stews</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/snack">Snacks</NuxtLink>
            </div>
          </li>

          <!-- Cooking Method -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              Cooking Method
            </a>
            <div class="dropdown-menu">
              <NuxtLink class="dropdown-item" to="/recipe/search/baking">Baking</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/grilling">Grilling</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/slow">Slow-Cooker</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/stir">Stir-Fry</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/no-cook">No-Cook</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/roasting">Roasting</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/fry">Fry</NuxtLink>
            </div>
          </li>

          <!-- Dietary Considerations -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              Dietary Considerations
            </a>
            <div class="dropdown-menu">
              <NuxtLink class="dropdown-item" to="/recipe/search/vegan">Vegan</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/vege">Vegetarian</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/gluten">Gluten-Free</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/low-carb">Low-Carb</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/diabetic">Diabetic</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/low-fat">Low-Fat</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/high-protein">High-Protein</NuxtLink>
            </div>
          </li>

          <!-- Ingredients -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              Ingredients
            </a>
            <div class="dropdown-menu">
              <NuxtLink class="dropdown-item" to="/recipe/search/chicken">Chicken</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/beef">Beef</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/pasta">Pasta</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/chocolate">Chocolate</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/vegetables">Vegetables</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/pork">Pork</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/cheese">Cheese</NuxtLink>
            </div>
          </li>

          <!-- Occasions and Events -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              Occasions and Events
            </a>
            <div class="dropdown-menu">
              <NuxtLink class="dropdown-item" to="/recipe/search/christmas">Christmas</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/easter">Easter</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/thanksgiving">Thanksgiving</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/birthday">Birthday</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/wedding">Wedding</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/halloween">Halloween</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/new-year">New Year</NuxtLink>
            </div>
          </li>

          <!-- Preparation Time and Difficulty -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false">
              Preparation Time and Difficulty
            </a>
            <div class="dropdown-menu">
              <NuxtLink class="dropdown-item" to="/recipe/search/15">15-Minutes-or-Less</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/30">30-Minutes-or-Less</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/easy">Easy</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/beginner-cook">Beginner-Cook</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/quick-and-easy">Quick-and-Easy</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/kid-friendly">Kid-Friendly</NuxtLink>
              <div class="dropdown-divider"></div>
              <NuxtLink class="dropdown-item" to="/recipe/search/make-ahead">Make-Ahead</NuxtLink>
            </div>
          </li>

          <!-- 用户部分 -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <img src="/user.png" style="width: 25px; height: 25px;" />
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <!-- 用户登录后的部分 -->
              <template v-if="user && user.type !== 'admin'">
                <NuxtLink class="dropdown-item" to="/user/myProfile">My Profile</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink class="dropdown-item" to="/user/member/myRecipeList">My Recipes</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink class="dropdown-item" to="/user/member/savedList">Saved Recipes</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink class="dropdown-item" to="/user/member/myReview">My Reviews</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink class="dropdown-item" to="/user/shoppingList/view">Shopping List</NuxtLink>
              </template>

              <!-- 管理员部分 -->
              <template v-if="user && user.type === 'admin'">
                <NuxtLink class="dropdown-item" to="/user/admin/dashboard">Dashboard</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink class="dropdown-item" to="/user/admin/memberManage">Manage Members</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink class="dropdown-item" to="/user/admin/memberReport">Member Reports</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink class="dropdown-item" to="/user/admin/recipeReport">Recipe Reports</NuxtLink>
                <div class="dropdown-divider"></div>
                <NuxtLink class="dropdown-item" to="/user/admin/generateCsvReport">Generate Csv</NuxtLink>
              </template>

              <!-- 登录和登出选项 -->
              <template v-if="user">
                <NuxtLink class="dropdown-item" to="/user/logout">Logout</NuxtLink>
              </template>
              <template v-else>
                <NuxtLink class="dropdown-item" to="/user/login">Login</NuxtLink>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app'

// 只获取用户数据
const { data: user } = await useAsyncData('user', () =>
  $fetch('/api/user') // 假设此API返回当前用户信息
)
</script>

<style>
/* 根据需要加入样式 */
</style>
