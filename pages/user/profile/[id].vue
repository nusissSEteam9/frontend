<template>
  <div class="container">
    <!-- User Profile Section -->
    <title>{{ member.username }}'s Profile</title>
    <br />
    <div style="display: flex; align-items: center; margin-bottom: 15px">
      <img
        src="/user.png"
        alt="User Image"
        style="
          width: 100px;
          height: 100px;
          margin-bottom: 15px;
          margin-right: 15px;
        "
      />
      <div style="display: flex; flex-direction: column">
        <h2>
          <b>{{ member.username }}</b>
        </h2>
        <p>UID: {{ member.id }}</p>
      </div>
    </div>
    <button
      v-if="!isAdmin"
      class="btn btn-danger"
      @click="reportMember(member.id)"
    >
      Report User
    </button>
    <br /><br /><br />

    <!-- Recipes Section -->
    <h4>Recipes created by {{ member.username }}:</h4>
    <hr />
    <div style="text-align: center">
      <p v-if="!publicRecipes.length">No Recipes Created</p>
      <div v-else class="row">
        <div
          v-for="recipe in paginatedRecipes"
          :key="recipe.id"
          class="col-md-3"
        >
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
      <div v-if="totalPages > 1" class="pagination">
        <button
          type="button"
          :disabled="currentPage === 1"
          class="btn btn-outline-primary"
          @click="prevPage"
        >
          &laquo;
        </button>
        <button
          v-for="page in pagesToShow"
          :key="page"
          type="button"
          class="btn btn-outline-secondary"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button
          :disabled="currentPage === totalPages"
          type="button"
          class="btn btn-outline-primary"
          @click="nextPage"
        >
          &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from 'nuxt/app';

const route = useRoute();
const userId = route.params.id;
const member = ref({});
const publicRecipes = ref([]);
const isAdmin = ref(false); // 从API返回值中获取
const currentPage = ref(1);
const itemsPerPage = 8;

const fetchUserProfile = async () => {
  const { data: userData } = await useFetch(
    `http://localhost:8080/user/profile/${userId}`
  );
  member.value = userData.value.member;
  publicRecipes.value = userData.value.publicRecipes || [];
  isAdmin.value = userData.value.ifAdmin;
};

onMounted(() => {
  fetchUserProfile();
});

const reportMember = (id) => {
  window.location.href = `/report/reportMember/${id}`;
};

const paginatedRecipes = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return publicRecipes.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(publicRecipes.value.length / itemsPerPage);
});

const pagesToShow = computed(() => {
  const pages = [];
  if (totalPages.value <= 5) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage.value <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages.value);
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(
        1,
        '...',
        totalPages.value - 3,
        totalPages.value - 2,
        totalPages.value - 1,
        totalPages.value
      );
    } else {
      pages.push(
        1,
        '...',
        currentPage.value - 1,
        currentPage.value,
        currentPage.value + 1,
        '...',
        totalPages.value
      );
    }
  }
  return pages;
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const goToPage = (page) => {
  if (page !== '...') {
    currentPage.value = page;
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination button.active {
  text-decoration: underline;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
</style>
