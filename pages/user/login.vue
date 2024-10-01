<template>
  <div class="container" style="width: 60%;">
    <h2>Login</h2>
    <br >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" placeholder="Enter your username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" placeholder="Enter your password" required>
      </div>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <button type="submit" style="margin-right: 15px;">Login</button>
      <button type="button" @click="redirectToRegister">Register</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  try {
    const response = await $fetch('/api/user/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    });
    // Handle successful login
  } catch (error) {
    errorMessage.value = 'Invalid username or password';
  }
};

const redirectToRegister = () => {
  window.location.href = '/user/register';
};
</script>
<style>
button {
  border-radius: 4px;
}
</style>