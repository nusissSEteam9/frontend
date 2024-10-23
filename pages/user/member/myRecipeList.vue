<template>
  <div class="container mt-5">
    <!-- Title -->
    <h2 class="mb-4">My Recipes</h2>

    <!-- Button to Add Recipe -->
    <div class="d-flex justify-content-end mb-4">
      <button class="btn btn-primary" @click="goToCreateRecipe">
        Add Recipe
      </button>
    </div>

    <!-- Display message if no recipes exist -->
    <p v-if="recipes.length === 0" class="text-center">No Recipes Created</p>

    <!-- Recipes Grid -->
    <div v-if="recipes.length > 0" class="row g-4" style="text-align: center">
      <div v-for="recipe in recipes" :key="recipe.id" class="col-md-3">
        <!-- Card for each recipe -->
        <div class="card h-100">
          <!-- Recipe Image -->
          <NuxtLink :to="`/recipe/detail/${recipe.id}`">
            <img
              :src="`/images/${recipe.image}`"
              class="card-img-top"
              alt="Recipe Image"
              style="height: 200px; object-fit: cover"
            />
          </NuxtLink>
          <!-- Card Body -->
          <div class="card-body">
            <h5 class="card-title">
              <NuxtLink :to="`/recipe/detail/${recipe.id}`">{{
                recipe.name
              }}</NuxtLink>
            </h5>
            <p class="card-text text-truncate">{{ recipe.description }}</p>
          </div>
          <!-- Card Footer Buttons -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-around">
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="goToEditRecipe(recipe.id)"
              >
                Edit
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="promptDelete(recipe.id)"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Router for navigation
const router = useRouter();

// Reactive data
const recipes = ref([]);
const loading = ref(true);

// Fetch recipes from the API when the component is mounted
onMounted(async () => {
  loading.value = true;
  try {
    const data = await $fetch('/api/user/member/myRecipeList');
    recipes.value = data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
  } finally {
    loading.value = false;
  }
});

// Navigate to create recipe page
const goToCreateRecipe = () => {
  router.push('/recipe/create');
};

// Navigate to edit recipe page
const goToEditRecipe = (id) => {
  router.push(`/recipe/edit/${id}`);
};

// Delete confirmation prompt
const promptDelete = async (id) => {
  if (window.confirm('Confirm deletion?')) {
    try {
      await $fetch(`/api/recipe/${id}`, {
        method: 'DELETE',
      });
      // 从本地移除已删除的菜谱
      recipes.value = recipes.value.filter((recipe) => recipe.id !== id);
      alert('Recipe deleted successfully.');
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      alert('Failed to delete recipe.');
    }
  }
};
</script>

<style scoped>
.card {
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
</style>
