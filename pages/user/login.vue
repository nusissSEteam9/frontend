<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card login-card">
          <div class="card-header">
            <h3>Please Sign In</h3>
          </div>
          <div class="card-body">
            <form id="loginForm" @submit.prevent="handleSubmit">
              <fieldset>
                <div class="form-group">
                  <input
                    id="username"
                    v-model="username"
                    class="form-control"
                    placeholder="Enter your username"
                    type="text"
                    required
                    autofocus
                  />
                </div>
                <div class="form-group">
                  <input
                    id="password"
                    v-model="password"
                    class="form-control"
                    placeholder="Enter your password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <div class="d-grid gap-1">
                  <button type="submit" class="btn btn-primary btn-success">
                    Login
                  </button>
                  <nuxt-link to="/user/register">
                    <button type="button" class="btn btn-success w-100">
                      Register
                    </button>
                  </nuxt-link>
                </div>
              </fieldset>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: 'signin',
});
const auth = useAuth();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  try {
    await auth.login(username.value, password.value);
    router.push('/');
  } catch (error) {
    errorMessage.value = error.response.data.message;
  }
};
</script>
<style>
.btn-success.btn-outline {
  color: #5cb85c;
}
.btn-success.btn-outline:hover {
  color: white;
}
.btn-success {
  margin-bottom: 10px;
}

.login-card {
  margin-top: 25%;
}

.form-group {
  margin-bottom: 15px;
}
</style>
