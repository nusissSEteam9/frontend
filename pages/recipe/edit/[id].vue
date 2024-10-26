<template>
  <div class="container">
    <h2>Edit Recipe</h2>
    <form @submit.prevent="submitForm">
      <input type="hidden" v-model="recipe.id" />
      <input type="hidden" v-model="recipe.calories" />
      <input type="hidden" v-model="recipe.carbohydrate" />
      <input type="hidden" v-model="recipe.fat" />
      <input type="hidden" v-model="recipe.healthScore" />
      <input type="hidden" v-model="recipe.numberOfSaved" />
      <input type="hidden" v-model="recipe.protein" />
      <input type="hidden" v-model="recipe.rating" />
      <input type="hidden" v-model="recipe.saturatedFat" />
      <br />

      <div class="form-group">
        <label for="nameInput" style="font-weight: bold">Recipe Name:</label>
        <input
          type="text"
          id="nameInput"
          v-model="recipe.name"
          placeholder="Enter recipe name"
          required
        />
      </div>
      <br />

      <div class="form-group">
        <label for="descriptionInput" style="font-weight: bold"
          >Description:</label
        >
        <textarea
          id="descriptionInput"
          v-model="recipe.description"
          cols="40"
          rows="5"
          placeholder="Enter recipe description"
          required
        ></textarea>
      </div>
      <br />

      <div class="form-group">
        <label for="servingsInput" style="font-weight: bold">Servings:</label>
        <input
          type="number"
          id="servingsInput"
          v-model="recipe.servings"
          required
          min="1"
          step="1"
        />
      </div>
      <br />

      <div class="form-group">
        <label for="pictureInput" style="font-weight: bold"
          >Upload Picture:</label
        >
        <input
          type="file"
          id="pictureInput"
          @change="onFileChange"
          accept="image/*"
        />
      </div>
      <div id="pictureInputErrorMessage" style="color: red"></div>

      <div id="picturePreview">
        <img :src="previewImage" alt="Recipe Image" v-if="previewImage" />
      </div>
      <br />

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const route = useRoute();
const { id } = route.params;
const recipe = reactive({
  id: '',
  name: '',
  description: '',
  servings: 1,
  picture: '',
  imageUrl: '',
});

const previewImage = ref(null);
const selectedFile = ref(null);
const router = useRouter();

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {
  try {
    // Validate required fields
    if (!recipe.name || !recipe.description) {
      alert('Please fill out all required fields.');
      return;
    }

    // Step 1: Get a presigned URL from the server
    const { url } = await $fetch('/api/recipe/get-presigned-url', {
      method: 'POST',
      body: {
        fileName: selectedFile.value.name,
        fileType: selectedFile.value.type,
      },
    });

    // Step 2: Upload the image to S3 using the presigned URL
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': selectedFile.value.type,
      },
      body: selectedFile.value,
    });

    // Step 3: Save the image URL and other form data to the backend
    recipe.imageUrl = url.split('?')[0]; // Get the image URL without the query parameters

    // Save recipe data to the backend
    await $fetch('/api/save-recipe', {
      method: 'POST',
      body: recipe,
    });

    // Handle success
    alert('Recipe saved successfully!');
    router.push('/recipes');
  } catch (error) {
    console.error('Failed to save recipe', error);
    alert('Failed to save recipe.');
  }
};
</script>

<style scoped>
.container {
  width: 60%;
  margin: auto;
}

button {
  border-radius: 4px;
}

img {
  max-width: 300px;
  max-height: 300px;
}
</style>
