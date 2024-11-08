<template>
  <div class="container mt-5" style="max-width: 60%">
    <h2>Add Recipe</h2>
    <br />

    <!-- Recipe Form -->
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <!-- Recipe Name -->
      <div class="mb-3">
        <label for="nameInput" class="form-label fw-bold">Recipe Name:</label>
        <input
          type="text"
          id="nameInput"
          v-model="recipe.name"
          placeholder="Enter recipe name"
          class="form-control"
          required
        />
      </div>

      <!-- Description -->
      <div class="mb-3">
        <label for="descriptionInput" class="form-label fw-bold"
          >Description:</label
        >
        <textarea
          id="descriptionInput"
          v-model="recipe.description"
          rows="5"
          placeholder="Enter recipe description"
          class="form-control"
          required
        ></textarea>
      </div>

      <!-- Servings -->
      <div class="mb-3">
        <label for="servingsInput" class="form-label fw-bold">Servings:</label>
        <input
          type="number"
          id="servingsInput"
          v-model="recipe.servings"
          min="1"
          step="1"
          class="form-control"
          required
        />
      </div>

      <!-- Preparation Time -->
      <div class="mb-3 row">
        <div class="col-md-8">
          <label for="preparationTimeInput" class="form-label fw-bold"
            >Preparation Time:</label
          >
          <input
            type="number"
            id="preparationTimeInput"
            v-model="recipe.preparationTime"
            min="1"
            step="1"
            class="form-control"
            required
          />
        </div>
        <div class="col-md-4">
          <label for="timeUnit" class="form-label fw-bold">Time Unit:</label>
          <select
            v-model="recipe.timeUnit"
            id="timeUnit"
            class="form-select"
            required
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>
      </div>

      <!-- Ingredients Section -->
      <div class="mb-3">
        <label for="addIngredientInput" class="form-label fw-bold"
          >Ingredients:</label
        >
        <div class="input-group">
          <input
            type="text"
            v-model="newIngredient"
            placeholder="Ingredient"
            id="addIngredientInput"
            class="form-control me-2"
            style="flex: 7"
          />
          <input
            type="number"
            v-model="newIngredientQuantity"
            placeholder="Quantity"
            id="addIngredientQuantityInput"
            class="form-control me-2"
            style="flex: 2"
            min="1"
            default="1"
          />
          <input
            type="text"
            v-model="newIngredientUnit"
            placeholder="Unit or None"
            id="addIngredientUnitInput"
            class="form-control me-2"
            style="flex: 2"
          />
          <button
            type="button"
            @click="addIngredient"
            class="btn btn-outline-primary"
          >
            Add
          </button>
        </div>
        <p class="text-danger">{{ ingredientsErrorMessage }}</p>
        <p v-if="isFetching" class="text-warning">Fetching...</p>
        <p class="text-info"></p>
        <!-- Ingredient List -->
        <table class="table table-hover" style="width: 50%">
          <tr v-for="(, index) in recipe.ingredients" :key="index">
            <td>
              <div class="input-group">
                <input
                  type="text"
                  v-model="recipe.ingredients[index].food_text"
                  class="form-control"
                  readonly
                />
                <button
                  @click="removeIngredient(index)"
                  class="btn btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- 显示营养信息表格 -->
      <table
        class="table table-bordered"
        v-if="recipe.ingredients.length > 0"
        style="font-size: x-small"
      >
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Calories</th>
            <th>Carbohydrate (g)</th>
            <th>Fat (g)</th>
            <th>Protein (g)</th>
            <th>Saturated Fat (g)</th>
            <th>Sodium (mg)</th>
            <th>Sugar (g)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingredients, index) in recipe.ingredients" :key="index">
            <td>{{ ingredients.food_text }}</td>
            <td>{{ ingredients.calories }}</td>
            <td>{{ ingredients.carbohydrate }}</td>
            <td>{{ ingredients.fat }}</td>
            <td>{{ ingredients.protein }}</td>
            <td>{{ ingredients.saturated_fat }}</td>
            <td>{{ ingredients.sodium }}</td>
            <td>{{ ingredients.sugar }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{{ recipe.nutrition.calories }}</td>
            <td>{{ recipe.nutrition.carbohydrate }}</td>
            <td>{{ recipe.nutrition.fat }}</td>
            <td>{{ recipe.nutrition.protein }}</td>
            <td>{{ recipe.nutrition.saturated_fat }}</td>
            <td>{{ recipe.nutrition.sodium }}</td>
            <td>{{ recipe.nutrition.sugar }}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Steps Section -->
      <div class="mb-3">
        <label for="addStepInput" class="form-label fw-bold">Steps:</label>
        <div class="d-flex mb-2">
          <input
            type="text"
            v-model="newStep"
            placeholder="Enter a step"
            id="addStepInput"
            class="form-control me-2"
          />
          <button
            type="button"
            @click="addStep"
            class="btn btn-outline-primary"
          >
            Add
          </button>
        </div>
        <p class="text-danger">{{ stepsErrorMessage }}</p>
        <!-- Steps List -->
        <table class="table table-hover">
          <tr v-for="(, index) in recipe.steps" :key="index">
            <td>
              <div class="input-group">
                <span class="input-group-text">{{ index + 1 }}.</span>
                <input
                  type="text"
                  v-model="recipe.steps[index]"
                  class="form-control"
                />
                <button
                  @click="removeStep(index)"
                  class="btn btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Notes -->
      <div class="mb-3">
        <label for="notesInput" class="form-label fw-bold">Notes:</label>
        <textarea
          id="notesInput"
          v-model="recipe.notes"
          rows="5"
          placeholder="Add any additional remarks"
          class="form-control"
        ></textarea>
      </div>

      <!-- Upload Picture -->
      <div class="mb-3">
        <label for="pictureInput" class="form-label fw-bold"
          >Upload Picture:</label
        >
        <input
          type="file"
          @change="previewImage"
          accept="image/*"
          id="pictureInput"
          class="form-control"
        />
        <div id="picturePreview" class="mt-3">
          <img
            v-if="imagePreview"
            :src="imagePreview"
            style="max-width: 300px; max-height: 300px"
          />
        </div>
        <p class="text-danger">{{ pictureInputErrorMessage }}</p>
      </div>

      <!-- Tags -->
      <div class="mb-3">
        <label for="tagsInput" class="form-label fw-bold">Tags:</label>
        <div class="d-flex mb-2">
          <input
            type="text"
            v-model="newTag"
            placeholder="Enter a tag"
            id="tagsInput"
            class="form-control me-2"
            @input="getMatchingTags"
          />
          <button type="button" @click="addTag" class="btn btn-outline-primary">
            Add
          </button>
        </div>
        <p class="text-danger">{{ tagsErrorMessage }}</p>
        <div class="d-flex flex-wrap">
          <button
            v-for="(tag, index) in recipe.tags"
            :key="index"
            class="btn btn-outline-secondary position-relative me-2 mb-2"
            style="border-radius: 20px; margin-top: 5px"
            type="button"
          >
            {{ tag }}
            <span
              class="badge bg-danger text-white position-absolute top-0 start-100 translate-middle"
              @click="removeTag(index)"
              style="
                cursor: pointer;
                display: inline-block;
                border-radius: 50%;
                font-size: 10px;
              "
            >
              &times;
            </span>
          </button>
        </div>
        <div id="tagDropdown"></div>
      </div>

      <!-- Recipe Visibility -->
      <div class="mb-3">
        <label class="fw-bold">Set Recipe as:</label>
        <div class="input-group" style="margin-top: 5px; width: 120px">
          <div class="input-group-text">
            <input
              class="form-check-input mt-0"
              type="radio"
              v-model="recipe.status"
              value="PUBLIC"
              id="public"
            />
          </div>
          <label for="public" class="form-control">Public</label>
        </div>
        <div class="input-group" style="margin-top: 5px; width: 120px">
          <div class="input-group-text">
            <input
              class="form-check-input mt-0"
              type="radio"
              v-model="recipe.status"
              value="PRIVATE"
              id="private"
            />
          </div>
          <label for="private" class="form-control">Private</label>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
console.log(authStore.token);

// Reactive data for the recipe form
const recipe = ref({
  name: '',
  description: '',
  servings: 1,
  preparationTime: 1,
  timeUnit: 'minutes',
  ingredients: [],
  nutrition: {
    calories: 0,
    carbohydrate: 0,
    fat: 0,
    protein: 0,
    saturated_fat: 0,
    sodium: 0,
    sugar: 0,
  },
  steps: [],
  notes: '',
  tags: [],
  status: 'PUBLIC',
});

// For ingredients and steps
const newIngredient = ref('');
const newIngredientQuantity = ref(1);
const newIngredientUnit = ref('');
const isFetching = ref(false);
const newStep = ref('');
const newTag = ref('');
const ingredientsErrorMessage = ref('');
const stepsErrorMessage = ref('');
const tagsErrorMessage = ref('');
const pictureInputErrorMessage = ref('');
const imagePreview = ref(null);
const router = useRouter();

// Add ingredient to the list
const addIngredient = async () => {
  if (newIngredient.value.trim() === '') {
    ingredientsErrorMessage.value = 'Please enter an ingredient';
    return;
  }

  const ingrValue = `${newIngredientQuantity.value} ${newIngredientUnit.value} ${newIngredient.value}`;

  try {
    isFetching.value = true;
    ingredientsErrorMessage.value = '';
    const data = await $fetch(`https://api.edamam.com/api/nutrition-data`, {
      params: {
        app_id: 'a0eca928',
        app_key: '2791c4e7ff627b1a94a4a8e41a6e0a14',
        nutrition_type: 'cooking',
        ingr: ingrValue,
      },
    });
    if (!data.totalNutrients || Object.keys(data.totalNutrients).length === 0) {
      ingredientsErrorMessage.value =
        'This ingredient does not have nutrition data or not exist.';
      return;
    }

    const totalNutrients = data.totalNutrients;
    recipe.value.ingredients.push({
      food_text: ingrValue,
      calories: totalNutrients.ENERC_KCAL?.quantity || 0,
      carbohydrate: totalNutrients.CHOCDF?.quantity || 0,
      fat: totalNutrients.FAT?.quantity || 0,
      protein: totalNutrients.PROCNT?.quantity || 0,
      saturated_fat: totalNutrients.FASAT?.quantity || 0,
      sodium: totalNutrients.NA?.quantity || 0,
      sugar: totalNutrients.SUGAR?.quantity || 0,
    });

    recipe.value.nutrition.calories += totalNutrients.ENERC_KCAL?.quantity || 0;
    recipe.value.nutrition.carbohydrate += totalNutrients.CHOCDF?.quantity || 0;
    recipe.value.nutrition.fat += totalNutrients.FAT?.quantity || 0;
    recipe.value.nutrition.protein += totalNutrients.PROCNT?.quantity || 0;
    recipe.value.nutrition.saturated_fat += totalNutrients.FASAT?.quantity || 0;
    recipe.value.nutrition.sodium += totalNutrients.NA?.quantity || 0;
    recipe.value.nutrition.sugar += totalNutrients.SUGAR?.quantity || 0;

    newIngredient.value = '';
    newIngredientQuantity.value = 1;
    newIngredientUnit.value = '';
    ingredientsErrorMessage.value = '';
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    ingredientsErrorMessage.value = 'Failed to fetch nutrition data';
  } finally {
    isFetching.value = false;
  }
};

// Remove ingredient
const removeIngredient = (index) => {
  recipe.value.ingredients.splice(index, 1);
};

// Add step to the list
const addStep = () => {
  if (newStep.value.trim() === '') {
    stepsErrorMessage.value = 'Please enter a step';
    return;
  }
  recipe.value.steps.push(newStep.value);
  newStep.value = '';
  stepsErrorMessage.value = '';
};

// Remove step
const removeStep = (index) => {
  recipe.value.steps.splice(index, 1);
};

// Add tag
const addTag = () => {
  if (newTag.value.trim() === '') {
    tagsErrorMessage.value = 'Tag cannot be empty.';
    return;
  }

  if (recipe.value.tags.includes(newTag.value.trim().toLowerCase())) {
    tagsErrorMessage.value = 'This tag already exists.';
    return;
  }

  recipe.value.tags.push(newTag.value.trim().toLowerCase());
  newTag.value = '';
  tagsErrorMessage.value = '';
};

// Remove tag
const removeTag = (index) => {
  recipe.value.tags.splice(index, 1);
};

// Preview uploaded image
const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    recipe.value.image = file.name;
    reader.readAsDataURL(file);
  }
};

// Simulate matching tags (you can implement API-based fetching)
const getMatchingTags = (keyword) => {
  // Implement fetching matching tags from the server
  console.log('Fetching matching tags for:', keyword);
};

// Form submit handler
const submitForm = async () => {
  if (validateForm()) {
    const payload = {
      name: recipe.value.name,
      description: recipe.value.description,
      servings: recipe.value.servings,
      preparationTime:
        recipe.value.preparationTimeUnit === 'minutes'
          ? recipe.value.preparationTime
          : recipe.value.preparationTime * 60,
      steps: recipe.value.steps,
      ingredients: recipe.value.ingredients.map((ing) => ({
        food_text: ing.food_text,
        calories: ing.calories,
        carbohydrate: ing.carbohydrate,
        fat: ing.fat,
        protein: ing.protein,
        saturated_fat: ing.saturated_fat,
        sodium: ing.sodium,
        sugar: ing.sugar,
      })),
      nutrition: recipe.value.nutrition,
      notes: recipe.value.notes,
      tags: recipe.value.tags,
      status: recipe.value.status,
      image: recipe.value.image,
    };
    console.log('Submitting recipe:', JSON.stringify(payload));

    try {
      await $fetch('/api/recipe/create', {
        method: 'POST',
        baseURL: useRuntimeConfig().public.backendProxyUrl,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: payload,
      });
      alert('Recipe submitted successfully!');
      router.push('/'); // 提交成功后跳转到首页
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Failed to submit recipe');
    }
  }
};

// Validate form fields
const validateForm = () => {
  // Check if ingredients and steps are filled in
  if (recipe.value.ingredients.length === 0) {
    ingredientsErrorMessage.value = 'Please enter at least 1 ingredient.';
    return false;
  }

  if (recipe.value.steps.length === 0) {
    stepsErrorMessage.value = 'Please enter at least 1 step.';
    return false;
  }

  if (!imagePreview.value) {
    pictureInputErrorMessage.value = 'Please upload a picture.';
    return false;
  }

  return true;
};
</script>

<style scoped>
/* Image preview styling */
#picturePreview img {
  max-width: 100%;
  max-height: 300px;
}
</style>
