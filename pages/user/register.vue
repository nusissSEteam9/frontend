<template>
  <div class="row justify-content-center">
    <div class="col-md-4">
      <div class="card register-card">
        <div class="card-header">
          <h3>Create an account</h3>
        </div>
        <div class="card-body">
          <form id="registerForm" @submit.prevent="handleSubmit">
            <fieldset>
              <div class="form-group">
                <label for="username">Username:</label>
                <input id="username" v-model="username" class="form-control" type="text" placeholder="Enter username"
                  @blur="checkIfUsernameAvailable">
                <span v-if="usernameError" style="color: red;">{{ usernameError }}</span>
                <span id="userAlrExistError" style="color: red;font-size: small;">{{ userAlrExistError }}</span>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input id="password" v-model="password" class="form-control" type="password" placeholder="Enter password">
                <span v-if="passwordError" style="color: red;">{{ passwordError }}</span>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input id="email" v-model="email" class="form-control" type="text" placeholder="Enter email" @blur="checkEmailSyntax">
                <span v-if="emailError" style="color: red;font-size: small;">{{ emailError }}</span>
              </div>
              <p class="d-inline-flex gap-1">
                <button type="submit" class="btn btn-primary">Register</button>
                <nuxt-link to="/user/login">
                  <button type="button" class="btn btn-secondary">Go back Login</button>
                </nuxt-link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
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
    const data = await $fetch('http://localhost:8080/user/checkIfUsernameAvailable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username.value })
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

const checkEmailSyntax = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = "Please enter a valid email address.";
  } else {
    emailError.value = "";
  }
};

</script>

<style scoped>
.register-card {
  margin-top: 25%;
}
</style>