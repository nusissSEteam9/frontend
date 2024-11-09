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
</style>
