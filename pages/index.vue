<template>
  <div
    class="container"
    style="text-align: center; width: 80%; margin-top: 2.5%"
  >
    <title>Home</title>
    <!-- 搜索表单 -->
    <form id="searchForm" @submit.prevent="searchRecipes">
      <div style="align-items: center">
        <div style="position: relative">
          <input
            id="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search for healthy recipes here!"
            style="width: 60%"
          />
          <select v-model="searchType" style="width: auto">
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="tag">Tag</option>
          </select>
          <button
            id="toggleButton"
            type="button"
            class="button-style"
            @click="toggleMenu"
          >
            ☰
          </button>
          <div id="filterMenu" class="filter-menu" style="text-align: left">
            <input id="filter1" v-model="filters.healthScore" type="checkbox" />
            <label for="filter1" style="display: inline-block"
              >&nbsp;Health Score ≥ 4</label
            >
            <br />
            <input
              id="filter2"
              v-model="filters.calorieIntake"
              type="checkbox"
            />
            <label for="filter2" style="display: inline-block"
              >&nbsp;Based on my calorie intake</label
            >
            <input
              id="filter2"
              v-model="filters.calorieIntake"
              type="checkbox"
            />
            <label for="filter2" style="display: inline-block"
              >&nbsp;Based on my calorie intake</label
            >
          </div>
          <button
            type="submit"
            class="button-style"
            style="margin-bottom: 10px"
          >
            Search
          </button>
        </div>
      </div>
    </form>

    <!-- 搜索结果 -->
    <div v-if="recipes.length > 0" class="row">
      <div v-for="recipe in recipes" :key="recipe.id" class="col-md-3">
        <div class="card mt-5" style="width: 18rem">
          <NuxtLink :to="`/recipe/detail/${recipe.id}`">
            <img
              class="card-img-top"
              :src="`/images/${recipe.image}`"
              alt="Recipe Image"
              style="width: 100%; height: 200px; object-fit: cover"
            />
          </NuxtLink>
          <div class="card-body" style="min-height: 105px">
            <h5 class="card-title">
              <NuxtLink :to="`/recipe/detail/${recipe.id}`">{{
                recipe.name
              }}</NuxtLink>
            </h5>
            <p
              class="card-text text-truncate"
              style="max-height: 3.6em; overflow: hidden"
            >
              {{ recipe.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 没有搜索结果时的提示 -->
    <p
      v-if="recipes.length === 0"
      style="margin-top: 10%; font-size: 40px; font-style: italic"
    >
      No Recipes Found
    </p>

    <!-- 分页控制 -->
    <div v-if="recipes.length > 0" style="margin-top: 30px">
      <button
        :class="{
          'btn btn-outline-success': currentPage > 0,
          'btn btn-outline-secondary disabled': currentPage === 0,
        }"
        type="button"
        @click="goToPreviousPage"
      >
        «
      </button>
      <span>&nbsp; Page {{ currentPage }} of {{ totalPages }}&nbsp;</span>
      <button
        :class="{
          'btn btn-outline-success': currentPage < totalPages - 1,
          'btn btn-outline-secondary disabled': currentPage === totalPages - 1,
        }"
        type="button"
        @click="goToNextPage"
      >
        »
      </button>
      <!-- 每页显示数量控制 -->
      <div
        v-if="recipes.length > 0"
        style="text-align: center; margin-top: 10px"
      >
        <select
          id="pageSize"
          v-model="pageSize"
          style="width: auto; display: inline-block; font-size: small"
          class="custom-select-no-arrow"
          @change="updatePageSize"
        >
          <option v-for="size in [8, 12, 16]" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <label for="pageSize" style="font-size: small; display: inline-block"
          >&nbsp;per page</label
        >
        <label for="pageSize" style="font-size: small; display: inline-block"
          >&nbsp;per page</label
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
console.log(authStore.token);
const searchQuery = ref('');
const searchType = ref('');
const filters = ref({
  healthScore: false,
  calorieIntake: false,
});
const recipes = ref([]);
const currentPage = ref(0);
const totalPages = ref(1);
const pageSize = ref(8);
const route = useRoute();

// 从API获取数据
const searchRecipes = async () => {
  const params = new URLSearchParams({
    query: searchQuery.value || '',
    searchtype: searchType.value || '',
    filter1: filters.value.healthScore ? true : false,
    filter2: filters.value.calorieIntake ? true : false,
    pageNo: currentPage.value,
    pageSize: pageSize.value,
  });
  try {
    const data = await $fetch(`/api/recipe/search?${params.toString()}`, {
      method: 'POST',
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    console.log(data);
    recipes.value = data.results;
    totalPages.value = data.totalPages;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  const query = route.query.query || '';
  if (query) {
    searchQuery.value = query;
    console.log('Searching for:', searchQuery.value);
    searchRecipes();
  } else {
    searchRecipes();
  }
});

watch(
  () => route.query.query,
  (newQuery) => {
    if (newQuery) {
      searchQuery.value = newQuery;
      console.log('URL changed, searching for:', searchQuery.value);
      searchRecipes();
    }
  }
);

// 过滤菜单的显示位置
const toggleMenu = () => {
  const menu = document.getElementById('filterMenu');
  const toggleButton = document.getElementById('toggleButton');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    const buttonRect = toggleButton.getBoundingClientRect();
    menu.style.display = 'block';
    menu.style.position = 'fixed';
    menu.style.top = `${buttonRect.bottom + 10}px`;
    menu.style.left = `${buttonRect.left}px`;
  }
};

// 分页操作
const goToPreviousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    searchRecipes();
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    searchRecipes();
  }
};

const updatePageSize = () => {
  currentPage.value = 0;
  searchRecipes();
};
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

button {
  padding: 5px 10px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #4cae4c;
}

.button-style {
  border-radius: 4px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'],
input[type='password'],
input[type='date'],
input[type='number'],
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#toggleButton {
  margin-left: 10px;
  margin-right: 10px;
}

textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
}

#filterMenu {
  display: none;
  position: fixed;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
