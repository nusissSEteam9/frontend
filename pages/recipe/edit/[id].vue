<template>
  <div class="container mt-5" style="max-width: 60%">
    <h2>Update Recipe</h2>
    <br />

    <!-- Recipe Form -->
    <form @submit.prevent="submitUpdateForm" enctype="multipart/form-data">
      <!-- Recipe Name -->
      <div class="mb-3">
        <label for="nameInput" class="form-label fw-bold">Recipe Name:</label>
        <input
          type="text"
          id="nameInput"
          v-model="recipe.name"
          placeholder="Enter recipe name"
          class="form-control"
          :disabled="!isEditMode"
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
          :disabled="!isEditMode"
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
          :disabled="!isEditMode"
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
            :disabled="!isEditMode"
            required
          />
        </div>
        <div class="col-md-4">
          <label for="timeUnit" class="form-label fw-bold">Time Unit:</label>
          <select
            v-model="recipe.timeUnit"
            id="timeUnit"
            class="form-select"
            :disabled="!isEditMode"
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
            :disabled="!isEditMode"
          />
          <input
            type="number"
            v-model="newIngredientQuantity"
            placeholder="Quantity"
            id="addIngredientQuantityInput"
            class="form-control me-2"
            style="flex: 2"
            min="1"
            :disabled="!isEditMode"
          />
          <input
            type="text"
            v-model="newIngredientUnit"
            placeholder="Unit or None"
            id="addIngredientUnitInput"
            class="form-control me-2"
            style="flex: 2"
            :disabled="!isEditMode"
          />
          <button
            type="button"
            @click="addIngredient"
            class="btn btn-outline-primary"
            :disabled="!isEditMode"
          >
            Add
          </button>
        </div>
        <p class="text-danger">{{ ingredientsErrorMessage }}</p>
        <p v-if="isFetching" class="text-warning">Fetching...</p>

        <!-- Ingredient List -->
        <table class="table table-hover" style="width: 50%">
          <tr v-for="(, index) in recipe.ingredients" :key="index">
            <td>
              <div class="input-group">
                <input
                  type="text"
                  v-model="recipe.ingredients[index].foodText"
                  class="form-control"
                  readonly
                />
                <button
                  @click="removeIngredient(index)"
                  type="button"
                  :disabled="!isEditMode"
                  class="btn btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Nutrition Information -->
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
          <tr v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <td>{{ ingredient.foodText }}</td>
            <td>{{ ingredient.calories }}</td>
            <td>{{ ingredient.carbohydrate }}</td>
            <td>{{ ingredient.fat }}</td>
            <td>{{ ingredient.protein }}</td>
            <td>{{ ingredient.saturatedFat }}</td>
            <td>{{ ingredient.sodium }}</td>
            <td>{{ ingredient.sugar }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{{ recipe.nutrition.calories }}</td>
            <td>{{ recipe.nutrition.carbohydrate }}</td>
            <td>{{ recipe.nutrition.fat }}</td>
            <td>{{ recipe.nutrition.protein }}</td>
            <td>{{ recipe.nutrition.saturatedFat }}</td>
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
            :disabled="!isEditMode"
          />
          <button
            type="button"
            @click="addStep"
            class="btn btn-outline-primary"
            :disabled="!isEditMode"
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
                  :disabled="!isEditMode"
                />
                <button
                  @click="removeStep(index)"
                  class="btn btn-outline-danger"
                  type="button"
                  :disabled="!isEditMode"
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
          :disabled="!isEditMode"
        ></textarea>
      </div>

      <!-- Upload Picture -->
      <div class="mb-3">
        <label for="pictureInput" class="form-label fw-bold"
          >Upload Picture (less than 2MB):</label
        >
        <input
          type="file"
          @change="previewImage"
          accept="image/*"
          id="pictureInput"
          class="form-control"
          :disabled="!isEditMode"
        />
        <div id="picturePreview" class="mt-3">
          <img
            :src="imagePreview || recipe.image"
            v-if="imagePreview || recipe.image"
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
            :disabled="!isEditMode"
            @input="getMatchingTags"
          />
          <button
            type="button"
            @click="addTag"
            class="btn btn-outline-primary"
            :disabled="!isEditMode"
          >
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
            :disabled="!isEditMode"
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
              :disabled="!isEditMode"
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
              :disabled="!isEditMode"
            />
          </div>
          <label for="private" class="form-control">Private</label>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        class="btn btn-warning fullwidth"
        type="button"
        v-if="!isEditMode"
        @click="toggleEditMode"
      >
        Edit
      </button>
      <button
        class="btn btn-secondary fullwidth"
        type="button"
        v-if="isEditMode"
        @click="router.back"
      >
        Cancel
      </button>
      <button type="submit" class="btn btn-primary" :disabled="!isEditMode">
        Update
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const isEditMode = ref(false);

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
    saturatedFat: 0,
    sodium: 0,
    sugar: 0,
  },
  steps: [],
  notes: '',
  tags: [],
  status: 'PUBLIC',
  image: null,
});

// For ingredients, steps, and tags
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
const selectedFile = ref(null);

// Fetch the existing recipe data on mount
onMounted(async () => {
  const recipeId = route.params.id;
  try {
    const data = await $fetch(`/api/recipe/detail/${recipeId}`, {
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    recipe.value.name = data.recipe.name;
    recipe.value.description = data.recipe.description;
    recipe.value.servings = data.recipe.servings;
    recipe.value.preparationTime = data.recipe.preparationTime;
    recipe.value.timeUnit = 'minutes';
    recipe.value.ingredients = data.recipe.ingredients;
    for (const ingredient of recipe.value.ingredients) {
      recipe.value.nutrition.calories += ingredient.calories;
      recipe.value.nutrition.carbohydrate += ingredient.carbohydrate;
      recipe.value.nutrition.fat += ingredient.fat;
      recipe.value.nutrition.protein += ingredient.protein;
      recipe.value.nutrition.saturatedFat += ingredient.saturatedFat;
      recipe.value.nutrition.sodium += ingredient.sodium;
      recipe.value.nutrition.sugar += ingredient.sugar;
    }
    recipe.value.steps = data.recipe.steps;
    recipe.value.notes = data.recipe.notes;
    recipe.value.tags = data.recipe.tags;
    recipe.value.status = data.recipe.status;
    recipe.value.image = data.recipe.image;

    console.log(recipe.value);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    alert('Failed to load recipe data');
  }
});

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
};

// Methods for ingredients, steps, and tags (similar to the add page)
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
      foodText: ingrValue,
      calories: totalNutrients.ENERC_KCAL?.quantity || 0,
      carbohydrate: totalNutrients.CHOCDF?.quantity || 0,
      fat: totalNutrients.FAT?.quantity || 0,
      protein: totalNutrients.PROCNT?.quantity || 0,
      saturatedFat: totalNutrients.FASAT?.quantity || 0,
      sodium: totalNutrients.NA?.quantity || 0,
      sugar: totalNutrients.SUGAR?.quantity || 0,
    });

    recipe.value.nutrition.calories += totalNutrients.ENERC_KCAL?.quantity || 0;
    recipe.value.nutrition.carbohydrate += totalNutrients.CHOCDF?.quantity || 0;
    recipe.value.nutrition.fat += totalNutrients.FAT?.quantity || 0;
    recipe.value.nutrition.protein += totalNutrients.PROCNT?.quantity || 0;
    recipe.value.nutrition.saturatedFat += totalNutrients.FASAT?.quantity || 0;
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

const removeIngredient = (index) => {
  recipe.value.nutrition.calories -= recipe.value.ingredients[index].calories;
  recipe.value.nutrition.carbohydrate -=
    recipe.value.ingredients[index].carbohydrate;
  recipe.value.nutrition.fat -= recipe.value.ingredients[index].fat;
  recipe.value.nutrition.protein -= recipe.value.ingredients[index].protein;
  recipe.value.nutrition.saturatedFat -=
    recipe.value.ingredients[index].saturatedFat;
  recipe.value.nutrition.sodium -= recipe.value.ingredients[index].sodium;
  recipe.value.nutrition.sugar -= recipe.value.ingredients[index].sugar;
  recipe.value.ingredients.splice(index, 1);
};
const addStep = () => {
  if (newStep.value.trim() === '') {
    stepsErrorMessage.value = 'Please enter a step';
    return;
  }
  recipe.value.steps.push(newStep.value);
  newStep.value = '';
  stepsErrorMessage.value = '';
};
const removeStep = (index) => {
  recipe.value.steps.splice(index, 1);
};
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
const removeTag = (index) => {
  recipe.value.tags.splice(index, 1);
};
const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      pictureInputErrorMessage.value = 'File size exceeds 2MB.';
      return;
    }
    pictureInputErrorMessage.value = '';
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
const getMatchingTags = (keyword) => {
  // Implement fetching matching tags from the server
  console.log('Fetching matching tags for:', keyword);
};

// Form submit handler
const submitUpdateForm = async () => {
  if (validateForm()) {
    const payload = {
      name: recipe.value.name,
      description: recipe.value.description,
      servings: recipe.value.servings,
      preparationTime:
        recipe.value.timeUnit === 'minutes'
          ? recipe.value.preparationTime
          : recipe.value.preparationTime * 60,
      steps: recipe.value.steps,
      ingredients: recipe.value.ingredients,
      nutrition: recipe.value.nutrition,
      notes: recipe.value.notes,
      tags: recipe.value.tags,
      status: recipe.value.status,
      image: recipe.value.image,
    };

    if (imagePreview.value) {
      try {
        const keyName = recipe.image.split('/').pop();
        await $fetch(`/api/recipe/presigned-url/deleteObject/${keyName}`, {
          method: 'DELETE',
          baseURL: useRuntimeConfig().public.backendProxyUrl,
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
      } catch (error) {
        console.error('Error deleting original image:', error);
      }

      try {
        const formData = new FormData();
        formData.append('file', selectedFile.value);
        const data = await $fetch('/api/recipe/uploadImage', {
          baseURL: useRuntimeConfig().public.backendProxyUrl,
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        console.log(data.url);
        payload.image = data.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }

    try {
      await $fetch(`/api/recipe/update/${route.params.id}`, {
        method: 'PUT',
        baseURL: useRuntimeConfig().public.backendProxyUrl,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: payload,
      });
      alert('Recipe updated successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe');
    }
  }
};

// Form validation
const validateForm = () => {
  if (recipe.value.ingredients.length === 0) {
    ingredientsErrorMessage.value = 'Please enter at least 1 ingredient.';
    return false;
  }
  if (recipe.value.steps.length === 0) {
    stepsErrorMessage.value = 'Please enter at least 1 step.';
    return false;
  }
  return true;
};
</script>

<style scoped>
button {
  border-radius: 4px;
}

img {
  max-width: 300px;
  max-height: 300px;
}

/* 容器样式 */
.container {
  width: 60%;
  background-color: #f6f7f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}

/* 标题样式 */
h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
}

/* 表单标签样式 */
.form-group label {
  font-size: 16px;
  font-weight: bold;
  color: #555555;
  display: block;
  margin-bottom: 5px;
}

/* 输入框和文本区域样式 */
.form-group input[type='text'],
.form-group input[type='number'],
.form-group textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  color: #333333;
  border: 1px solid #dddddd;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 15px;
  resize: none;
}

/* 文件上传按钮样式 */
.form-group input[type='file'] {
  font-size: 14px;
  color: #333333;
}

.fullwidth {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

/* 错误信息样式 */
#pictureInputErrorMessage {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

/* 图片预览样式 */
#picturePreview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 5px;
  margin-top: 15px;
}

/* 提交按钮样式 */
button[type='submit'] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type='submit']:hover {
  background-color: #218838;
}

button[type='submit']:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button[type='button']:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  border-color: #cccccc;
}
</style>
