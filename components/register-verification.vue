<template>
  <form class="container" @submit.prevent="verify">
    <h2>Email Verification</h2>
    <div class="flex-box">
      <div class="form-group">
        <div class="code-inputs">
          <input
            type="text"
            v-model="code1"
            maxlength="1"
            class="code-box"
            autofocus
            @input="focusNext(1)"
            ref="input1"
          />
          <input
            type="text"
            v-model="code2"
            maxlength="1"
            class="code-box"
            @input="focusNext(2)"
            ref="input2"
          />
          <input
            type="text"
            v-model="code3"
            maxlength="1"
            class="code-box"
            @input="focusNext(3)"
            ref="input3"
          />
          <input
            type="text"
            v-model="code4"
            maxlength="1"
            class="code-box"
            @input="focusNext(4)"
            ref="input4"
          />
        </div>
      </div>
      <button
        :disabled="allCodes.length < 4"
        :style="{
          backgroundColor: allCodes.length < 4 ? '#cccccc' : '#007bff',
          borderColor: allCodes.length < 4 ? '#cccccc' : '#007bff',
          width: '300px',
          height: '60px',
          marginTop: '20px',
          fontSize: '20px',
        }"
        class="btn btn-primary"
        type="submit"
      >
        Verify
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  verify: {
    type: Function,
    required: true,
  },
});
const code1 = ref('');
const code2 = ref('');
const code3 = ref('');
const code4 = ref('');
const allCodes = ref('');

const input1 = ref(null);
const input2 = ref(null);
const input3 = ref(null);
const input4 = ref(null);

// Focus the first input on mount
watch([code1, code2, code3, code4], () => {
  allCodes.value = `${code1.value}${code2.value}${code3.value}${code4.value}`;
});

const focusNext = (index) => {
  if (index === 1 && code1.value.length >= 1) {
    input2.value.focus();
  } else if (index === 2 && code2.value.length >= 1) {
    input3.value.focus();
  } else if (index === 3 && code3.value.length >= 1) {
    input4.value.focus();
  }
};
</script>

<style scoped>
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form-group {
  display: flex;
  align-items: center;
  width: 400px; /* Adjust as needed */
  padding: 20px;
  background-color: #ffffff; /* White background for the form */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.label-style {
  flex: 1; /* Takes up 1 part of the space */
  margin-right: 20px;
  font-weight: bold;
  font-size: 16px;
  color: #333333;
}

.code-inputs {
  flex: 3; /* Takes up 3 parts of the space */
  display: flex;
  justify-content: space-between;
}

.code-box {
  width: 60px; /* Increased width for better usability */
  height: 60px;
  text-align: center;
  font-size: 24px;
  border: 2px solid #cccccc;
  border-radius: 4px;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.code-box:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}
</style>
