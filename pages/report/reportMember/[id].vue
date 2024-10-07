<template>
  <div class="container" style="width: 60%">
    <br />
    <h2><b>Report User</b></h2>
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

      <!-- 隐藏字段，包含被举报的用户和报告人 -->
      <input type="hidden" :value="report.member" />
      <input type="hidden" :value="report.memberReported" />

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
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from 'nuxt/app';

const route = useRoute();
const router = useRouter();
const memberId = route.params.id;

const report = ref({
  member: '', // 举报人
  memberReported: '', // 被举报人
});
const reason = ref('');

const fetchReportData = async () => {
  const { data } = await useFetch(`/api/report/reportMember/${memberId}`);
  report.value.member = data.value.member;
  report.value.memberReported = data.value.memberReported;
};

const submitReport = async () => {
  const payload = {
    reason: reason.value,
    member: report.value.member,
    memberReported: report.value.memberReported,
  };
  try {
    await $fetch('/api/report/reportMember', {
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
