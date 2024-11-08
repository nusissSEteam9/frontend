<template>
  <div class="container">
    <div class="row">
      <!-- Recipe Title & Rating Section -->
      <div class="col-12" id="page-top">
        <!-- Recipe Name -->
        <h1 class="display-4">
          <b>{{ recipe.name }}</b>
        </h1>
        <br />

        <!-- Created By and Submitted On -->
        <div class="d-flex align-items-center text-muted mb-3">
          <span class="me-3">
            <b>Created By: </b>
            <NuxtLink :to="'/user/profile/' + createdByUserId">
              <u class="text-info">{{ createdBy }}</u>
            </NuxtLink>
          </span>
          <span> <b>Submitted on:</b> {{ recipe.submittedDate }} </span>
        </div>

        <!-- Star Rating and Other Info -->
        <div class="d-flex align-items-center mt-2">
          <!-- Star Rating -->
          <div class="star-rating d-inline-flex align-items-center me-3">
            <span>{{ recipe.rating }}&nbsp;</span>
            <span v-for="i in 5" :key="i">
              <i
                v-if="recipe.rating >= i"
                class="bi bi-star-fill text-warning"
              />
              <i
                v-else-if="recipe.rating >= i - 0.5"
                class="bi bi-star-half text-warning"
              />
              <i v-else class="bi bi-star text-muted" />
            </span>
          </div>

          <!-- Number of Reviews -->
          <span class="badge bg-primary me-3">
            {{ recipe.numberOfRating }} Reviews
          </span>

          <!-- Number of Saved -->
          <span class="badge bg-success me-3">
            {{ recipe.numberOfSaved }} Saved
          </span>

          <!-- Health Score -->
          <div>
            <b>Health Score: </b>
            <span
              class="badge"
              :class="{
                'bg-success': recipe.healthScore >= 4,
                'bg-warning': recipe.healthScore >= 2 && recipe.healthScore < 4,
                'bg-danger': recipe.healthScore < 2,
              }"
            >
              {{ recipe.healthScore }} / 6
            </span>
          </div>
        </div>
      </div>

      <!-- Recipe Details and Nutritional Info -->
      <div class="row mt-4">
        <!-- Recipe Image and Actions -->
        <div class="col-md-6">
          <img
            :src="selectImageByRecipeId(recipe.id)"
            alt="Recipe Image"
            class="img-fluid rounded shadow-sm"
          />
          <div class="btn-group mt-3" role="group" aria-label="Recipe Actions">
            <button
              type="button"
              class="btn btn-primary"
              @click="scrollToReviewForm"
              v-if="!showReviewForm"
            >
              Add Review</button
            >&nbsp;&nbsp;
            <button
              v-if="!isSaved"
              type="button"
              class="btn btn-secondary"
              @click="saveRecipe(recipe.id)"
            >
              Save</button
            >&nbsp;&nbsp;
            <button
              v-else
              type="button"
              class="btn btn-secondary"
              @click="unsaveRecipe(recipe.id)"
            >
              Unsave</button
            >&nbsp;&nbsp;
            <button
              type="button"
              class="btn btn-danger"
              @click="reportRecipe(recipe.id)"
            >
              Report
            </button>
          </div>
        </div>

        <!-- Nutritional Info -->
        <div class="col-md-6">
          <h4><b>Nutritional Info</b></h4>
          <table
            class="table table-bordered table-striped table-hover table-sm text-center"
          >
            <thead class="table-dark">
              <tr>
                <th>Nutrient</th>
                <th>% Daily Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Calories</td>
                <td>
                  {{ recipe.calories ? recipe.calories + ' kcal' : 'none' }}
                </td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>{{ recipe.protein || 'none' }}</td>
              </tr>
              <tr>
                <td>Carbohydrate</td>
                <td>{{ recipe.carbohydrate || 'none' }}</td>
              </tr>
              <tr>
                <td>Sugar</td>
                <td>{{ recipe.sugar || 'none' }}</td>
              </tr>
              <tr>
                <td>Sodium</td>
                <td>{{ recipe.sodium || 'none' }}</td>
              </tr>
              <tr>
                <td>Fat</td>
                <td>{{ recipe.fat || 'none' }}</td>
              </tr>
              <tr>
                <td>Saturated Fat</td>
                <td>{{ recipe.saturatedFat || 'none' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Ingredients & Directions Section -->
      <div class="row mt-4">
        <div class="col-md-6">
          <h4><b>Ingredients</b></h4>
          <ul class="list-group list-group-flush shadow-sm">
            <li
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              class="list-group-item"
            >
              {{ ingredient.foodText }}
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h4><b>Directions</b></h4>
          <div class="card shadow-sm">
            <ul class="list-group list-group-flush">
              <li
                v-for="(step, index) in recipe.steps"
                :key="index"
                class="list-group-item"
              >
                <b>Step {{ index + 1 }}:</b>
                <p>{{ step }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="row mt-4">
        <div class="col-12">
          <h4><b>Reviews</b></h4>
          <hr />
          <p v-if="reviews.length === 0" class="text-muted">No Reviews Yet</p>
          <div v-else>
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="card mt-2"
            >
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <img
                      src="/user.png"
                      class="rounded-circle me-2"
                      style="width: 40px; height: 40px"
                    />
                    <NuxtLink :to="'/user/profile/' + review.memberId">
                      <h5 class="card-title mb-0">
                        {{ review.memberUsername }}
                      </h5>
                    </NuxtLink>
                  </div>
                  <div class="star-rating d-inline-flex align-items-center">
                    <span v-for="i in 5" :key="i">
                      <i
                        v-if="review.rating >= i"
                        class="bi bi-star-fill text-warning"
                      />
                      <i
                        v-else-if="review.rating >= i - 0.5"
                        class="bi bi-star-half text-warning"
                      />
                      <i v-else class="bi bi-star text-muted" />
                    </span>
                  </div>
                </div>
                <small class="text-muted">{{ review.reviewDate }}</small>
                <p class="card-text mt-2">{{ review.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Review Form Section -->
      <div
        v-if="showReviewForm"
        style="margin-top: 20px"
        class="row mt-4 review-form"
        id="review-form"
      >
        <h4><b>Submit Your Review</b></h4>
        <form @submit.prevent="submitReview">
          <div class="form-group" style="display: flex; align-items: center">
            <label for="rating" style="margin-right: 10px">Rating:</label>
            <span
              v-for="i in 5"
              :key="i"
              @click="setRating(i)"
              @mouseover="hoverRating = i"
              @mouseleave="hoverRating = null"
              style="cursor: pointer"
            >
              <i
                :class="
                  i <= (hoverRating || newReview.rating)
                    ? 'bi bi-star-fill'
                    : 'bi bi-star'
                "
                style="color: gold"
              ></i>
            </span>
            <span class="text-muted" style="margin-left: 10px">
              {{ hoverRating || newReview.rating || 'No Rating' }}
            </span>
          </div>

          <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea
              v-model="newReview.comment"
              id="comment"
              class="form-control"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="btn btn-success"
            style="margin-top: 10px; margin-right: 10px"
          >
            Submit Review
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            style="margin-top: 10px"
            @click="cancelReview"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useNuxtApp } from '#app';

const selectImageByRecipeId = useNuxtApp().$selectImageByRecipeId;
const authStore = useAuthStore();
console.log(authStore.token);
const route = useRoute();
const recipeId = route.params.id;

const recipe = ref({});
const reviews = ref([]);
const isSaved = ref(); // 假设从API得知用户是否已保存此食谱
const createdBy = ref('');
const createdByUserId = ref(null);
const hoverRating = ref(null);

const showReviewForm = ref(false);
const newReview = ref({
  rating: '',
  comment: '',
});

const fetchRecipeDetails = async () => {
  const recipeData = await $fetch(`/api/recipe/detail/${recipeId}`, {
    method: 'GET',
    baseURL: useRuntimeConfig().public.backendProxyUrl,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  });
  recipe.value = recipeData.recipe || {};
  reviews.value = recipeData.reviews || [];
  createdBy.value = recipeData.createdBy || 'Unknown';
  createdByUserId.value = recipeData.createdByUserId || null;
  isSaved.value = recipeData.isSaved || false;
};

onMounted(() => {
  fetchRecipeDetails();
});

const scrollToReviewForm = async () => {
  showReviewForm.value = true;
  await nextTick();
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.scrollIntoView({ behavior: 'smooth' });
  }
};

const setRating = (rating) => {
  newReview.value.rating = rating;
};

const cancelReview = () => {
  showReviewForm.value = false;
  const pageTop = document.getElementById('page-top');
  if (pageTop) {
    pageTop.scrollIntoView({ behavior: 'smooth' });
  }
};

const submitReview = async () => {
  const payload = {
    rating: newReview.value.rating,
    comment: newReview.value.comment,
    recipe: {
      id: recipeId,
    },
  };
  try {
    await $fetch('/api/review/create', {
      method: 'POST',
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: payload,
    });
    fetchRecipeDetails();
    newReview.value = {
      rating: '',
      comment: '',
    };
    showReviewForm.value = false;
    recipe.value.numberOfRating++;
    alert('Review submitted successfully.');
  } catch (error) {
    alert('Error submitting review.');
    console.error(error);
  }
};

const saveRecipe = async () => {
  try {
    await $fetch(`/api/user/member/saveRecipe/${recipeId}`, {
      method: 'POST',
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    isSaved.value = true;
    recipe.value.numberOfSaved++;
  } catch (error) {
    console.error(error);
  }
  isSaved.value = true;
};

const unsaveRecipe = async () => {
  try {
    await $fetch(`/api/user/member/removeSavedRecipe/${recipeId}`, {
      method: 'POST',
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    isSaved.value = false;
    recipe.value.numberOfSaved--;
  } catch (error) {
    console.error(error);
  }
};

const reportRecipe = (id) => {
  window.location.href = `/report/reportRecipe/${id}`;
};
</script>

<style scoped>
a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}

.star-rating {
  display: flex;
  font-size: 15px;
}

.star-rating-input i {
  font-size: 24px;
  cursor: pointer;
  color: gold;
}

.star-rating-input i:hover,
.star-rating-input i.bi-star-fill {
  color: orange;
}

.img-fluid {
  max-width: 75%;
  height: auto;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: block;
}

.badge {
  font-size: 0.9rem;
  padding: 0.5em;
}

.text-muted {
  color: #6c757d !important;
}

.review-form {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
}

/* table {
    border: 1px solid black;
    border-collapse: collapse;
    width: 100%;
}

tr {
    border: 1px solid black;
}

td {
    border: 1px solid black;
} */
</style>
