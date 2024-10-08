<template>
  <div class="container" style="width: 60%">
    <table style="width: 100%">
      <tbody>
        <tr>
          <td colspan="2">
            <h1>
              <b>{{ recipe.name }}</b>
            </h1>
          </td>
        </tr>
        <tr>
          <td style="width: 450px">
            <div class="star-rating">
              <span v-for="i in 5" :key="i">
                <i v-if="recipe.rating >= i" class="bi bi-star-fill" style="color: gold" />
                <i v-else-if="recipe.rating >= i - 0.5" class="bi bi-star-half" style="color: gold" />
                <i v-else class="bi bi-star" style="color: darkgrey" />
              </span>
              &nbsp;{{ recipe.rating }} &nbsp;|&nbsp;
              {{ recipe.numberOfRating }} &nbsp;<b>Reviews</b> &nbsp;| &nbsp;
              {{ recipe.numberOfSaved }} &nbsp; <b>Saved</b>
            </div>
          </td>
          <td>
            <b>Health Score&nbsp;&nbsp;</b>
            <span :style="{ color: getHealthScoreColor(recipe.healthScore) }" style="text-align: center">
              {{ recipe.healthScore }} / 6
            </span>
          </td>
        </tr>
        <tr>
          <td style="font-size: 15px;">
            <b>Created By: </b>
            <NuxtLink :to="`/user/profile/${createdByUserId}`">&nbsp;{{ createdBy }}
            </NuxtLink>
            &nbsp;&nbsp; |
            &nbsp;&nbsp; Submitted on {{ recipe.submittedDate }}
          </td>
        </tr>
        <tr>
          <td>
            <img :src="`/images/${recipe.image}`" alt="Recipe Image" style="
                width: 350px;
                height: 250px;
                object-fit: contain;
                border: 2px solid #ccc;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              " />
            <br /><br />
            <div class="btn-group" role="group" aria-label="Recipe Actions">
              <button type="button" class="btn btn-primary" @click="goToReview(recipe.id)">
                Add Review</button>&nbsp;&nbsp;
              <button v-if="!isSaved" type="button" class="btn btn-secondary" @click="saveRecipe(recipe.id)">
                Save
              </button>
              <button v-else type="button" class="btn btn-secondary" @click="unsaveRecipe(recipe.id)">
                Unsave</button>&nbsp;&nbsp;
              <button type="button" class="btn btn-danger" @click="reportRecipe(recipe.id)">
                Report
              </button>
            </div>
          </td>
          <td>
            <div>
              <h4><b>Nutritional Info</b></h4>
              <table class="table table-striped table-bordered" style="
                  margin-left: 0;
                  margin-right: auto;
                  width: auto;
                  text-align: center;
                ">
                <thead class="thead-dark">
                  <tr>
                    <th>Nutrient</th>
                    <th>% Daily Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Calories</td>
                    <td>
                      {{
                        recipe.calories !== null
                          ? recipe.calories + ' kcal'
                          : 'none'
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td>
                      {{ recipe.protein !== null ? recipe.protein : 'none' }}
                    </td>
                  </tr>
                  <tr>
                    <td>Carbohydrate</td>
                    <td>
                      {{
                        recipe.carbohydrate !== null
                          ? recipe.carbohydrate
                          : 'none'
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>Sugar</td>
                    <td>{{ recipe.sugar !== null ? recipe.sugar : 'none' }}</td>
                  </tr>
                  <tr>
                    <td>Sodium</td>
                    <td>
                      {{ recipe.sodium !== null ? recipe.sodium : 'none' }}
                    </td>
                  </tr>
                  <tr>
                    <td>Fat</td>
                    <td>{{ recipe.fat !== null ? recipe.fat : 'none' }}</td>
                  </tr>
                  <tr>
                    <td>Saturated Fat</td>
                    <td>
                      {{
                        recipe.saturatedFat !== null
                          ? recipe.saturatedFat
                          : 'none'
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>Tags: </b>
            <span v-for="(tag, index) in recipe.tags" :key="index" class="badge badge-info"
              style="margin-right: 5px; background-color: #17a2b8; color: white">
              {{ tag }}
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>Serving size: </b>{{ recipe.servings }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>Preparation Time: </b>{{ recipe.preparationTime }} minutes
          </td>
        </tr>
      </tbody>
    </table>
    <br /><br />
    <!-- Ingredients and Steps -->
    <div>
      <div style="margin-right: 30px">
        <div>
          <h4><b>Ingredients</b></h4>
          <ul style="margin-top: 20px">
            <li v-for="(ingredient, index) in recipe.ingredients" :key="index" style="margin-bottom: 10px">
              {{ ingredient.foodText }}
            </li>
          </ul>
        </div>
        <br />
        <div>
          <h4><b>Directions</b></h4>
          <table style="margin-left: auto; margin-right: auto; width: 100%">
            <tr v-for="(step, index) in recipe.steps" :key="index">
              <td>
                <b>step {{ index + 1 }}</b>
                <p style="margin-top: 10px">{{ step }}</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <br /><br />
    <!-- Reviews Section -->
    <div>
      <h4><b>Reviews</b></h4>
      <hr />
      <p v-if="reviews.length === 0" style="text-align: left">No Reviews Yet</p>
      <div v-else>
        <div v-for="(review, index) in reviews" :key="index" class="card mt-2">
          <div class="card-body">
            <div class="user-profile" style="display: flex; justify-content: space-between">
              <div class="user-profile" style="display: flex;">
                <img src="/user.png" style="width: 40px; height: 40px; margin-right: 8px;">
                <NuxtLink :to="`/user/profile/${review.memberId}`">
                  <h5 class="card-title">{{ review.memberUsername }}</h5>
                </NuxtLink>
              </div>
            </div>
            <div class="star-rating" style="margin-left: 48px">
              <span v-for="i in 5" :key="i">
                <i v-if="review.rating >= i" class="bi bi-star-fill" style="color: gold" />
                <i v-else-if="review.rating >= i - 0.5" class="bi bi-star-half" style="color: gold" />
                <i v-else class="bi bi-star" style="color: darkgrey" />
              </span>
              &nbsp;{{ review.reviewDate }}
            </div>
            <br />
            <p class="card-text" style="margin-left: 48px;">
              {{ review.comment }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFetch } from 'nuxt/app';

const route = useRoute();
const recipeId = route.params.id;

const recipe = ref({});
const reviews = ref([]);
const isSaved = ref(false); // 假设从API得知用户是否已保存此食谱
const createdBy = ref('');
const createdByUserId = ref(null);

const fetchRecipeDetails = async () => {
  const { data: recipeData } = await useFetch(
    `/api/recipe/detail/${recipeId}`,
  );
  recipe.value = recipeData.value.recipe || {};
  reviews.value = recipeData.value.reviews || [];
  createdBy.value = recipeData.value.createdBy || 'Unknown';
  createdByUserId.value = recipeData.value.createdByUserId || null;
};

onMounted(() => {
  fetchRecipeDetails();
});

const getHealthScoreColor = (score) => {
  if (score >= 4) return 'green';
  if (score >= 2) return 'orange';
  return 'red';
};

const goToReview = (id) => {
  window.location.href = `/recipe/review/${id}`;
};

const saveRecipe = (id) => {
  // API 调用保存食谱
  isSaved.value = true;
};

const unsaveRecipe = (id) => {
  // API 调用取消保存食谱
  isSaved.value = false;
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

.one-third-column {
  width: 30%;
  float: right;
}

.two-thirds-column {
  width: 65%;
  float: left;
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
