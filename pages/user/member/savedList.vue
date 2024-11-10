<template>
  <div class="container">
    <h2>Saved Recipes</h2>
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <!-- Iterate through each recipe and display it in a card -->
      <div class="col" v-for="recipe in savedList" :key="recipe.id">
        <div class="card h-100 shadow-sm">
          <img
            :src="recipe.image ? recipe.image : '/images/recipe01.jpg'"
            class="card-img-top"
            alt="Recipe Image"
          />
          <div class="card-body">
            <NuxtLink
              :to="`/recipe/detail/${recipe.id}`"
              class="card-title-link"
            >
              <h5 class="card-title">
                <b>{{ recipe.name }}</b>
              </h5>
            </NuxtLink>
            <p class="card-text">{{ recipe.description }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-success">
                Rating: {{ recipe.rating }}
              </span>
              <span class="badge bg-primary">
                Servings: {{ recipe.servings }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { ref, onMounted } from 'vue';

const authStore = useAuthStore();
const savedList = ref([]);

onMounted(() => {
  fetchSavedList();
});

const fetchSavedList = async () => {
  try {
    console.log('fetch savedList');
    const data = await $fetch('/api/user/member/savedList', {
      method: 'GET',
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    savedList.value = data;
  } catch (error) {
    console.error('Error fetching saved list:', error);
  }
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 5vh auto;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.badge {
  font-size: 0.85rem;
}
.card-title-link {
  text-decoration: none;
  color: inherit;
}
.card-title-link:hover {
  color: #007bff;
}
.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits the description to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* Adds ellipsis if text overflows */
  height: 2.6em;
  line-height: 1.3em;
}

/* Header Styling */
h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
