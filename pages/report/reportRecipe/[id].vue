<template>
  <div class="container" style="width: 60%">
    <br />
    <h2><b>Report Recipe</b></h2>
    <br />
    <form @submit.prevent="submitReport">
      <div class="mb-3">
        <label for="reason" class="form-label">Type yuor reason here:</label>
        <textarea
          id="reason"
          v-model="reason"
          rows="4"
          class="form-control"
          required
        />
      </div>

      <!-- 隐藏字段，包含被举报的用户和食谱 -->
      <input type="hidden" :value="report.member" />
      <input type="hidden" :value="report.recipeReported" />

      <button type="submit" class="btn btn-primary" style="margin-right: 20px">
        Submit Report
      </button>
      <button type="button" class="btn btn-secondary" @click="cancelReport">
        Cancel
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from 'nuxt/app';

const route = useRoute();
const router = useRouter();
const recipeId = route.params.recipeId;

const report = ref({
  member: '', // 举报人
  recipeReported: '', // 被举报的食谱
});
const reason = ref(''); // 用户输入的举报理由

const fetchReportData = async () => {
  const { data } = await useFetch(`/api/report/reportRecipe/${recipeId}`);
  report.value.member = data.value.member;
  report.value.recipeReported = data.value.recipeReported;
};

const submitReport = async () => {
  const payload = {
    reason: reason.value,
    member: report.value.member,
    recipeReported: report.value.recipeReported,
  };

  try {
    await $fetch('/api/report/reportRecipe', {
      method: 'POST',
      body: payload,
    });
    alert('Report submitted successfully.');
    router.push('/success-page');
  } catch (error) {
    alert('Error submitting report.');
    console.error(error);
  }
};

const cancelReport = () => {
  router.back();
};

onMounted(() => {
  fetchReportData();
});
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
