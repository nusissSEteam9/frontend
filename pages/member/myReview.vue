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
          <tr v-for="(review, index) in reviews" :key="review.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ review.id }}</td>
            <td>
              <a :href="`/recipe/detail/${review.recipe.id}`">
                {{ review.recipe.name }}
              </a>
            </td>
            <td>{{ review.rating }}</td>
            <td>{{ review.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Reactive state for reviews
const reviews = ref([]);

// Function to fetch reviews
const fetchReviews = async () => {
  try {
    // Replace with your actual API endpoint
    reviews.value = await $fetch('/api/user/member/myReview');
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

<style scoped>
/* Scoped Styles */

.container {
  /* Additional container styles if needed */
}

/* Button styles are already handled globally via assets/style.css */
</style>
