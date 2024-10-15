<template>
  <template v-if="!reqireEmailVerification">
    <div class="container">
      <h2>Register New Account</h2>
      <br />
      <form id="registerForm" @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="username">Username:</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Enter username"
              @blur="checkIfUsernameAvailable"
              @input="validateUsername"
              required
            />
            <span v-if="errors.username" class="error">{{
              errors.username
            }}</span>
            <span v-if="errors.usernameAvailability" class="error">
              {{ errors.usernameAvailability }}
            </span>
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
              required
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>
        </div>
        <div class="form-row">
          <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </button>
          <button type="button" class="button-right" @click.prevent="goToLogin">
            Go back Login
          </button>
        </div>
      </form>
      <div v-if="successMessage" class="success">
        {{ successMessage }}
      </div>
      <div v-if="submissionError" class="error">
        {{ submissionError }}
      </div>
    </div>
  </template>
  <template v-if="reqireEmailVerification">
    <register-verification verify-code="verify"></register-verification>
  </template>
</template>

<script setup>
import { reactive, ref } from 'vue';

const router = useRouter();
const reqireEmailVerification = ref(false);
const verifyCode = ref('');
const form = reactive({
  username: '',
  password: '',
  email: '',
});

const errors = reactive({
  username: '',
  usernameAvailability: '',
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

const checkIfUsernameAvailable = async () => {
  if (!validateUsername()) return;

  errors.usernameAvailability = '';
  try {
    const response = await $fetch('/api/user/checkIfUsernameAvailable', {
      method: 'POST',
      body: { username: form.username },
    });
    if (response.userAlrExists) {
      errors.usernameAvailability =
        'The username is taken, please enter another username.';
    }
  } catch (error) {
    console.error('Error checking username availability:', error);
    errors.usernameAvailability =
      'Unable to verify username availability. Please try again later.';
  }
};

const handleSubmit = async () => {
  // Validate all fields before submission
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isEmailValid = validateEmail();

  if (
    !isUsernameValid ||
    !isPasswordValid ||
    !isEmailValid ||
    errors.usernameAvailability
  ) {
    alert('Please resolve the errors before submitting the form.');
    return;
  }

  isSubmitting.value = true;
  submissionError.value = '';
  successMessage.value = '';

  try {
    const response = await useAuth().register({
      username: form.username,
      password: form.password,
      email: form.email,
    });
    if (response.code) {
      verifyCode.value = response.code;
      reqireEmailVerification.value = true;
    } else {
      successMessage.value =
        'Registration successful. Please check your email for verification code.';
      navigateTo('/');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    submissionError.value = 'Registration failed. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const goToLogin = () => {
  router.push('/user/login');
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
}

h2 {
  text-align: center;
  color: #333;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
  width: 100%;
  margin-top: 1rem;
}

.form-group {
  display: contents;
}

label {
  grid-column: 1;
  align-self: center;
}

input {
  grid-column: 2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  display: block;
  margin-top: 5px;
  grid-column: 2;
}

.success {
  color: green;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  grid-column: span 2;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4cae4c;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

button.button-right {
  background-color: #d9534f;
}

button.button-right:hover {
  background-color: #c9302c;
}
</style>
