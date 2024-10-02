<template>
  <title>Home</title>
  <div class="container" style="text-align: center; width: 80%; margin-top: 2.5%;">
    <!-- 搜索表单 -->
    <form @submit.prevent="searchRecipes" id="searchForm">
      <div style="align-items: center;">
        <div style="position: relative;">
          <input v-model="searchQuery" type="text" id="searchInput" placeholder="Search for healthy recipes here!"
            style="width: 60%;" />
          <select v-model="searchType" style="width: auto;">
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="tag">Tag</option>
          </select>
          <button id="toggleButton" type="button" class="button-style" @click="toggleMenu">☰</button>
          <div id="filterMenu" class="filter-menu" style="text-align: left;">
            <input type="checkbox" id="filter1" v-model="filters.healthScore" /><label for="filter1">&nbsp;&nbsp;Health
              Score ≥ 4</label><br />
            <input type="checkbox" id="filter2" v-model="filters.calorieIntake" /><label for="filter2">&nbsp;&nbsp;Based
              on my calorie intake</label>
          </div>
          <button type="submit" class="button-style" style="margin-bottom: 10px;">Search</button>
        </div>
      </div>
    </form>

    <!-- 搜索结果 -->
    <div v-if="recipes.length > 0" class="row">
      <div v-for="recipe in paginatedRecipes" :key="recipe.id" class="col-md-3">
        <div class="card mt-5" style="width: 18rem;">
          <NuxtLink :to="`/recipe/detail/${recipe.id}`">
            <img class="card-img-top" :src="`/images/${recipe.image}`" alt="Recipe Image"
              style="width: 100%; height: 200px; object-fit: cover;" />
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
                <i class="bi bi-person-circle" style="font-size: 24px; margin-right: 8px;" />
                <NuxtLink :to="`/user/profile/${recipe.member.id}`">{{ recipe.member.username }}</NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 没有搜索结果时的提示 -->
    <p v-if="recipes.length === 0" style="margin-top: 10%;font-size: 40px;font-style: italic;">No Recipes Found</p>

    <!-- 分页控制 -->
    <div v-if="recipes.length > 0" style="margin-top: 30px;">
      <button
        :class="{ 'btn btn-outline-success': currentPage > 1, 'btn btn-outline-secondary disabled': currentPage === 1 }"
        @click="goToPreviousPage" type="button">
        «
      </button>
      <span>&nbsp; Page {{ currentPage }} of {{ totalPages }}&nbsp;</span>
      <button
        :class="{ 'btn btn-outline-success': currentPage < totalPages, 'btn btn-outline-secondary disabled': currentPage === totalPages }"
        @click="goToNextPage" type="button">
        »
      </button>
      <!-- 每页显示数量控制 -->
      <div v-if="recipes.length > 0" style="text-align: center; margin-top: 10px;">
        <select v-model="pageSize" @change="updatePageSize" id="pageSize" class="custom-select-no-arrow"
          style="width: auto; display: inline-block;font-size: small;">
          <option v-for="size in [8, 12, 16]" :key="size" :value="size">{{ size }}</option>
        </select>
        <label for="pageSize" class="col-form-label" style="font-size: small;">&nbsp;per page</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFetch } from 'nuxt/app'

const searchQuery = ref('')
const searchType = ref('name')
const filters = ref({
  healthScore: false,
  calorieIntake: false
})
const recipes = ref([])
const currentPage = ref(1)
const pageSize = ref(8)
const totalPages = ref(1)
const filtersVisible = ref(false)

// 从API获取数据
const fetchRecipes = async () => {
  const { data } = await useFetch('api/recipe/search', {
    params: {
      query: searchQuery.value || '',
      searchtype: searchType.value || '',
      filters: filters.value
    }
  })
  recipes.value = data.value || []
  totalPages.value = Math.ceil(recipes.value.length / pageSize.value)
}

onMounted(() => {
  fetchRecipes()
})

// 分页
const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return recipes.value.slice(start, end)
})

// 搜索
const searchRecipes = async () => {
  await fetchRecipes()
  currentPage.value = 1
  totalPages.value = Math.ceil(recipes.value.length / pageSize.value)
}

// 过滤
const toggleMenu = () => {
  const menu = document.getElementById('filterMenu')
  const toggleButton = document.getElementById('toggleButton')
  if (menu.style.display === 'block') {
    menu.style.display = 'none'
    filtersVisible.value = false
  } else {
    const buttonRect = toggleButton.getBoundingClientRect()
    menu.style.display = 'block'
    menu.style.position = 'fixed'
    menu.style.top = `${buttonRect.bottom + 10}px`
    menu.style.left = `${buttonRect.left}px`
    filtersVisible.value = true
  }
}

// 分页操作
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const updatePageSize = () => {
  totalPages.value = Math.ceil(recipes.value.length / pageSize.value)
  currentPage.value = 1
}
</script>

<style scoped>
a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}

.custom-select-no-arrow {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid #ced4da;
  padding: 5px 10px;
  font-size: 1rem;
  text-align: center;
  background: none;
}

.custom-select-no-arrow::-ms-expand {
  display: none;
}
</style>