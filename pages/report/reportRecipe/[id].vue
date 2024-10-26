<template>
  <div class="container" style="max-width: 60%">
    <br />
    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-center"><b>Report Recipe</b></h2>
        <p class="card-text text-muted text-center">
          Please provide the reason for reporting this recipe.
        </p>

        <form @submit.prevent="submitReport">
          <div class="mb-3">
            <label for="reason" class="form-label fw-bold"
              >Type your reason here:</label
            >
            <textarea
              id="reason"
              v-model="reason"
              rows="5"
              class="form-control"
              placeholder="Explain why you are reporting this recipe"
              required
            ></textarea>
          </div>

          <!-- Hidden field for the reported recipe ID -->
          <input type="hidden" :value="report.recipeReportedId" />

          <!-- Buttons -->
          <div class="d-flex justify-content-between mt-4">
            <button type="submit" class="btn btn-danger">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>Submit Report
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancelReport"
            >
              <i class="bi bi-x-circle-fill me-2"></i>Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
console.log(authStore.token);

const route = useRoute();
const router = useRouter();
const recipeReportedId = route.params.id;

const report = ref({
  recipeReported: recipeReportedId, // 被举报食谱
});
const reason = ref(''); // 用户输入的举报理由

const submitReport = async () => {
  const payload = {
    reason: reason.value,
    recipeReportedId: report.value.recipeReported,
  };
  console.log(payload);
  try {
    await $fetch('/api/report/reportRecipe', {
      method: 'POST',
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: payload,
    });
    alert('Report submitted successfully.');
    router.push('/recipe/detail/' + recipeReportedId);
  } catch (error) {
    alert('Error submitting report.');
    console.error(error);
  }
};

const cancelReport = () => {
  router.push('/');
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}

.card {
  padding: 20px;
  border-radius: 10px;
  background-color: #f8f9fa;
}

.card-title {
  font-size: 1.75rem;
  color: #dc3545;
}

.card-text {
  margin-bottom: 20px;
}

textarea {
  resize: none;
}

button i {
  margin-right: 5px;
}
</style>
