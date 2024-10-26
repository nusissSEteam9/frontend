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
            <th scope="col">Recipe</th>
            <th scope="col">Rating</th>
            <th scope="col">Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(review, index) in reviews" :key="review.reviewId">
            <th scope="row">{{ index + 1 }}</th>
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

<style scoped>
/* Container Styling */

.container {
  max-width: 1200px; /* Set a max width to limit wasted space */
  margin-top: 2rem;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

/* Table Styling */
.table {
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  table-layout: fixed; /* Ensure table cells adjust properly */
}

.table th,
.table td {
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #e0e0e0;
  word-wrap: break-word; /* Allow text to wrap */
}

.table th {
  background-color: transparent;
  color: #000000;
  font-weight: bold;
  border: 1px solid #d0d0d0;
  border-top-left-radius: 8px; /* Add rounded corners to header */
}

.table-hover tbody tr:hover {
  background-color: #e6f7f5;
}

/* Link Styling */
.table a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.table a:hover {
  color: #0056b3;
}

/* Rating Stars Styling */
.checked {
  color: #ffc107;
}

.bi-star,
.bi-star-fill {
  font-size: 1.25rem;
  color: #ffc107;
  margin-right: 2px;
}

/* Comment Column Styling */
.table td {
  font-size: 1rem;
  color: #3f3f3f;
}

/* No Reviews Message Styling */
.text-center {
  font-size: 1.5rem;
  font-weight: bold;
  color: #757575;
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .container {
    width: 90%;
  }

  h2 {
    font-size: 1.5rem;
  }

  .table th,
  .table td {
    padding: 0.5rem;
  }

  .bi-star,
  .bi-star-fill {
    font-size: 1rem;
  }
}

/* Adjust table column widths to make better use of space */
.table th:nth-child(1),
.table td:nth-child(1) {
  width: 5%;
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 10%;
}

.table th:nth-child(3),
.table td:nth-child(3) {
  width: 25%;
}

.table th:nth-child(4),
.table td:nth-child(4) {
  width: 20%;
}

.table th:nth-child(5),
.table td:nth-child(5) {
  width: 40%;
  word-break: break-word; /* Ensure long comments break properly */
}
</style>
