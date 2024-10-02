<template>
  <div class="container" style="width: 60%;">
    <h2>Register New Account</h2>
    <br >
    <form id="registerForm" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" placeholder="Enter username" @blur="checkIfUsernameAvailable">
        <span v-if="usernameError" style="color: red;">{{ usernameError }}</span>
        <span id="userAlrExistError" style="color: red;">{{ userAlrExistError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" placeholder="Enter password">
        <span v-if="passwordError" style="color: red;">{{ passwordError }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="text" placeholder="Enter email">
        <span v-if="emailError" style="color: red;">{{ emailError }}</span>
      </div>
      <button type="submit">Register</button>
      <nuxt-link to="/user/login">
        <button type="button" class="button-right">Go back Login</button>
      </nuxt-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const email = ref('');
const usernameError = ref('');
const passwordError = ref('');
const emailError = ref('');
const userAlrExistError = ref('');

const checkIfUsernameAvailable = async () => {
  try {
    const data = await $fetch('/user/checkIfUsernameAvailable', {
      method: 'POST',
      body: { username: username.value }
    });
    if (data.userAlrExists) {
      userAlrExistError.value = "The username is taken, please enter another username.";
    } else {
      userAlrExistError.value = "";
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
  }
};

const handleSubmit = async () => {
  if (userAlrExistError.value) {
    alert('Please resolve the errors before submitting the form.');
    return;
  }

  try {
    const response = await $fetch('/user/register', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
        email: email.value
      }
    });
    // Handle successful registration
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

</script>

<style scoped>
button {
  border-radius: 4px;
}
button.button-right {
  margin-left: 15px;
}
</style>