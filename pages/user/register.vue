<template>
  <template v-if="!reqireEmailVerification">
    <div class="container">
      <div class="row justify-content-end">
        <!--        <img class="image-section" src="/images/login-background.png" alt="" />-->
        <div class="image-section" />
        <div class="col-md-4">
          <div class="card register-card">
            <div class="card-header">
              <h3>Register New Account</h3>
            </div>
            <br />
            <div class="card-body">
              <form id="registerForm" @submit.prevent="handleSubmit">
                <div class="form-row">
                  <div class="form-group">
                    <label for="username">Username:</label>
                    <input
                      id="username"
                      v-model="form.username"
                      type="text"
                      placeholder="Enter username"
                      @input="validateUsername"
                      required
                    />
                    <span v-if="errors.username" class="error">{{
                      errors.username
                    }}</span>
                  </div>
                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input
                      id="password"
                      v-model="form.password"
                      type="password"
                      placeholder="Enter password"
                      @blur="validatePassword"
                      required
                    />
                    <span v-if="errors.password" class="error">{{
                      errors.password
                    }}</span>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      placeholder="Enter email"
                      @blur="validateEmail"
                    />
                    <span v-if="errors.email" class="error">{{
                      errors.email
                    }}</span>
                  </div>
                </div>
                <div class="form-row">
                  <button type="submit" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Registering...' : 'Register' }}
                  </button>
                  <button
                    type="button"
                    class="button-right"
                    @click.prevent="goToLogin"
                  >
                    Go back Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div v-if="successMessage" class="success">
            {{ successMessage }}
          </div>
          <div v-if="submissionError" class="error">
            {{ submissionError }}
          </div>
        </div>
      </div>
    </div>
    >
  </template>
  <template v-if="reqireEmailVerification">
    <register-verification :verify="verify"></register-verification>
  </template>
</template>

<script setup lang="ts">
import InvalidateInfoError from '~/utils/invalidateInfoError';

definePageMeta({
  middleware: 'signin',
});

const router = useRouter();
const reqireEmailVerification = ref(false);
const signupCode = ref('');

const form = reactive({
  username: '',
  password: '',
  email: '',
});

const errors = reactive({
  username: '',
  password: '',
  email: '',
});

const isSubmitting = ref(false);
const successMessage = ref('');
const submissionError = ref('');

const validateUsername = () => {
  if (!form.username) {
    errors.username = 'Username is required.';
    return false;
  }
  errors.username = '';
  return true;
};

const validatePassword = () => {
  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
    return false;
  }
  errors.password = '';
  return true;
};

const validateEmail = () => {
  // emtpy email is allowed
  if (!form.email) {
    errors.email = '';
    return true;
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
    return false;
  }
  errors.email = '';
  return true;
};

const handleSubmit = async () => {
  // Validate all fields before submission
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isEmailValid = validateEmail();

  if (!isUsernameValid || !isPasswordValid || !isEmailValid) {
    alert('Please resolve the errors before submitting the form.');
    return;
  }

  isSubmitting.value = true;
  submissionError.value = '';
  successMessage.value = '';

  try {
    const response = await useAuth().register(toRaw(form));
    console.log('Response:', response);
    if (response.code) {
      signupCode.value = response.code;
      console.log('Signup code:', signupCode.value);
      reqireEmailVerification.value = true;
    } else {
      successMessage.value = 'Registration successful. You are now logged in.';
      navigateTo('/');
    }
  } catch (error) {
    if (error instanceof InvalidateInfoError) {
      submissionError.value = error.message;
    } else {
      console.error('Unexpected:', error);
      submissionError.value = 'Registration failed. Unexpected Error.';
    }
  } finally {
    isSubmitting.value = false;
  }
};
const retryTimes = ref(3);
const verify = (code: string) => {
  if (code === signupCode.value) {
    successMessage.value = 'Verification successful.';
    useAuth()
      .verifyEmail(toRaw(form))
      .then(() => {
        navigateTo('/');
      })
      .catch((error) => {
        console.error('Error during email verification:', error);
        alert('Error: cannot create user. Please try again.');
      });
  } else {
    retryTimes.value--;
    if (retryTimes.value === 0) {
      alert('You have exceeded the maximum number of attempts.');
      navigateTo('/user/register');
    }
    alert(
      `Verification code is incorrect. You have ${retryTimes.value} attempts left.`
    );
  }
};
const goToLogin = () => {
  router.push('/user/login');
};
</script>

<style scoped>
.image-section {
  background-image: url('public/images/login-background.png'); /* 替换为实际图片路径 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: 1;
  min-width: 50%; /* 设置宽度，或根据需要调整 */
}

.register-card {
  width: 100%;
  max-width: 400px; /* 设置最大宽度与登录页面一致 */
  min-height: 80vh; /* 保持最小高度一致 */
  display: flex;
  flex-direction: column;
  padding: 0px; /* 统一内边距 */
  background-color: white; /* 白色背景 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 8px; /* 添加圆角 */
}

.card-header {
  text-align: center;
  margin-bottom: 0;
  padding: 10px;
}

.card-body {
  flex-grow: 1; /* 让 body 部分占满剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; /* 垂直方向上平均分布 */
  gap: 20px; /* 表单元素之间的间距 */
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 表单元素之间的间距 */
}

input[type='text'],
input[type='password'],
input[type='email'] {
  width: 100%;
  padding: 15px; /* 统一输入框的高度和内边距 */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 15px; /* 每个表单输入项之间的间距 */
}

button {
  width: 100%;
  padding: 15px; /* 确保按钮的高度一致 */
  background-color: #28a745; /* 与登录页面保持一致的绿色按钮 */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
}

button:hover {
  background-color: #218838; /* 悬停效果一致 */
}

.button-right {
  margin-top: 10px;
  background-color: #007bff; /* 设置次要按钮的颜色 */
  color: white;
  font-size: 1rem;
}

.button-right:hover {
  background-color: #0069d9;
}

.btn-primary {
  background-color: #28a745; /* 与登录页面一致的绿色 */
  border: none;
}

.btn-success {
  background-color: #007bff; /* 设置蓝色按钮 */
  padding: 15px;
}

.btn-success:hover {
  background-color: #0069d9; /* 悬停效果一致 */
}

.d-grid.gap-1 {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 设置表单项之间的间距 */
}

.error {
  color: red;
  font-size: 0.875rem;
}

.success {
  color: green;
  font-size: 0.875rem;
  margin-top: 10px;
}
</style>
