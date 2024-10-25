<template>
  <div>
    <!-- Page Header -->
    <div class="container my-4" style="width: 60%">
      <h2>My Review List</h2>
    </div>

    <!-- Reviews Section -->
    <div class="container" style="text-align: center; width: 70%; margin: auto">
      <!-- No Reviews Message -->
      <p v-if="reviews.length === 0" class="text-center">No Reviews Yet</p>

      <!-- Reviews Table -->
      <table v-else class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Recipe</th>
            <th scope="col">Rating</th>
            <th scope="col">Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(review, index) in reviews" :key="review.reviewId">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ review.reviewId }}</td>
            <td>
              <a :href="`/recipe/detail/${review.recipeId}`">
                {{ review.recipeName }}
              </a>
            </td>
            <td>
              <span
                v-for="i in review.rating"
                :key="i"
                class="bi bi-star-fill"
                :class="{ checked: i <= review.rating }"
              ></span>
              <span
                v-for="i in 5 - review.rating"
                :key="i"
                class="bi bi-star"
              ></span>
            </td>
            <td>{{ review.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const reviewExample = {
  reviewId: 1,
  recipeName: 'recipe1Name',
  recipeId: 1,
  rating: 0,
  comment: 'testReview1',
};
const authStore = useAuthStore();
const reviews = ref<(typeof reviewExample)[]>([]);

// Function to fetch reviews
const fetchReviews = async () => {
  try {
    // Replace with your actual API endpoint
    reviews.value = await $fetch('/api/user/member/myReview', {
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Optionally, handle error (e.g., show a notification)
  }
};

// Fetch reviews when the component is mounted
onMounted(() => {
  fetchReviews();
});
</script>

<style scoped></style>
