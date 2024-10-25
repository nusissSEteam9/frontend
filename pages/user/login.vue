<template>
  <div class="container">
    <div class="row justify-content-end">
      <div class="image-section"></div>
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
.image-section {
  background-image: url('public/images/login-background.png'); /* 替换为实际图片路径 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: 1;
  min-width: 50%; /* 设置宽度，或根据需要调整 */
}

.login-card {
  width: 100%;
  max-width: 400px; /* 登录框的最大宽度 */
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.card-body {
  flex-grow: 1; /* 让 body 部分占满剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; /* 让表单内容在垂直方向上平均分布 */
  height: 100%;
}

.d-grid.gap-1 {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 设置表单项之间的间距 */
}

.card-header {
  text-align: center;
  margin-bottom: 20px; /* 顶部标题和表单的间距 */
}

.form-group {
  margin-bottom: 15px; /* 每个表单输入项之间的间距 */
  flex-grow: 1;
}

.btn-success {
  margin-bottom: 10px;
  padding: 15px;
}

.btn-success.btn-outline {
  color: #5cb85c;
}

.btn-success.btn-outline:hover {
  color: white;
}

.form-group input {
  padding: 15px; /* 确保输入框的高度 */
}
</style>
