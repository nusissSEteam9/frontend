<template>
  <div class="container" style="text-align: center; width: 80%;">
    <form id="searchForm" @submit.prevent="performSearch">
      <div style="align-items: center;">
        <div style="position: relative;">
          <input id="searchInput" v-model="searchQuery" type="text" placeholder="Enter your search query" style="width: 60%;">
          <button id="toggleButton" type="button" class="button-style" @click="toggleMenu">☰</button>
          <div v-show="showFilterMenu" id="filterMenu" class="filter-menu" style="text-align: left;">
            <input id="filter1" v-model="filters.healthScore" type="checkbox"><label for="filter1">&nbsp;&nbsp;Health Score ≥ 4</label><br >
            <input id="filter2" v-model="filters.calorieIntake" type="checkbox"><label for="filter2">&nbsp;&nbsp;Based on my calorie intake</label>
          </div>
          <select v-model="searchType" style="width: 8%;">
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="tag">Tag</option>
          </select>
          <button type="submit" class="button-style" style="margin-bottom: 10px;">Search</button>
        </div>
      </div>
      <p v-if="results.length === 0">No Recipes Found</p>
      <div v-else class="row">
        <div v-for="recipe in results" :key="recipe.id" class="col-md-3">
          <div class="card mt-5" style="width: 18rem;">
            <div class="card" style="width: 18rem;">
              <NuxtLink :to="`/recipe/detail/${recipe.id}`">
                <img class="card-img-top" :src="`/images/${recipe.image}`" alt="Recipe Image" style="width: 100%; height: 200px; object-fit: cover;">
              </NuxtLink>
              <div class="card-body" style="min-height: 105px;">
                <h5 class="card-title">
                  <NuxtLink :to="`/recipe/detail/${recipe.id}`">{{ recipe.name }}</NuxtLink>
                </h5>
                <p class="card-text text-truncate" style="max-height: 3.6em; overflow: hidden;">{{ recipe.description }}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div class="user-profile" style="display: flex; align-items: center; justify-content: center;">
                    <img src="/user.png" style="width: 24px; height: 24px; margin-right: 8px;">
                    <NuxtLink :to="`/user/profile/${recipe.member.id}`">{{ recipe.member.username }}</NuxtLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br >
      <div v-if="results.length > 0" style="text-align: center;">
        <span>
          <a :class="{ 'disabled': currentPage === 0 }" @click="previousPage">Previous</a>
        </span>&emsp;
        <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>&emsp;
        <span>
          <a :class="{ 'disabled': currentPage === totalPages - 1 }" @click="nextPage">Next</a>
        </span>
      </div>
      <div v-if="results.length > 0" style="text-align: center;">
        <label for="pageSize" class="col-form-label">Recipes per page:</label>
        <div>
          <select :value="pageSize" @change="updatePageSize($event)">
            <option v-for="size in [12, 24, 36]" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRecipeSearch } from '~/composables/useRecipeSearch'

const searchQuery = ref('')
const searchType = ref('name')
const showFilterMenu = ref(false)
const filters = reactive({
  healthScore: false,
  calorieIntake: false
})

const { 
  results,
  currentPage,
  totalPages,
  pageSize,
  searchRecipes,
  previousPage,
  nextPage,
  changePageSize
} = useRecipeSearch()

const toggleMenu = () => {
  showFilterMenu.value = !showFilterMenu.value
}

const performSearch = () => {
  searchRecipes(searchQuery.value, searchType.value, filters)
}

const updatePageSize = (event: Event) => {
  const newSize = parseInt((event.target as HTMLSelectElement).value)
  changePageSize(newSize)
}

watch([searchQuery, searchType, filters], () => {
  currentPage.value = 0
})

// Initial search on component mount
performSearch()
</script>

<style scoped>
a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  cursor: pointer;
}

.filter-menu {
  position: absolute;
  top: 100%;
  right: 25%;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 999;
}

.disabled {
  color: gray;
  pointer-events: none;
}
</style>
