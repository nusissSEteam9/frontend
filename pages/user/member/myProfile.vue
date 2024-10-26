<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">My Profile</h2>

    <!-- Profile Card -->
    <div class="card shadow-sm p-4 mb-5 bg-body rounded">
      <div class="card-body">
        <!-- Profile Form -->
        <form
          @submit.prevent="submitProfile"
          class="needs-validation"
          novalidate
        >
          <input type="hidden" v-model="profile.id" />
          <input type="hidden" v-model="profile.age" />
          <input type="hidden" v-model="profile.memberStatus" />
          <input type="hidden" v-model="profile.calorieIntake" />
          <input type="hidden" v-model="profile.registrationDate" />

          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="profile.username"
              @blur="checkUsername"
              class="form-control"
              :class="{ 'is-invalid': userAlrExistError }"
              @input="trackChanges"
              required
            />
            <div class="invalid-feedback">
              {{ userAlrExistError }}
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="profile.password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              @input="trackChanges"
              required
            />
            <div class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="profile.email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              @input="trackChanges"
            />
            <div class="invalid-feedback">
              {{ errors.email }}
            </div>
          </div>

          <!-- Birthdate -->
          <div class="mb-3">
            <label for="birthdate" class="form-label">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              v-model="profile.birthdate"
              class="form-control"
              @input="trackChanges"
              required
            />
          </div>

          <!-- Gender -->
          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select
              id="gender"
              v-model="profile.gender"
              class="form-select"
              @change="trackChanges"
              required
            >
              <option value="" disabled>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div class="invalid-feedback">Gender is required</div>
          </div>

          <!-- Height -->
          <div class="mb-3">
            <label for="height" class="form-label">Height (in cm)</label>
            <input
              type="number"
              id="height"
              v-model="profile.height"
              class="form-control"
              @input="trackChanges"
              required
            />
          </div>

          <!-- Weight -->
          <div class="mb-3">
            <label for="weight" class="form-label">Weight (in kg)</label>
            <input
              type="number"
              id="weight"
              v-model="profile.weight"
              step=".1"
              class="form-control"
              @input="trackChanges"
              required
            />
          </div>

          <!-- Buttons -->
          <div class="d-flex justify-content-between mt-4">
            <button
              type="submit"
              class="btn btn-primary"
              :class="{
                'btn-disabled-custom': !hasChanges || userAlrExistError,
              }"
              :disabled="!hasChanges"
            >
              <i class="bi bi-save"></i> Save
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancelChange"
            >
              <i class="bi bi-x-circle"></i> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

// Reactive profile data
const profile = reactive({
  id: '', // Set these values based on the data you fetch
  age: '',
  memberStatus: '',
  calorieIntake: '',
  registrationDate: '',
  username: '',
  password: '',
  email: '',
  birthdate: '',
  gender: '',
  height: '',
  weight: '',
});

// 原始的profile数据用于比较修改
const originalProfile = reactive({ ...profile });

// Reactive errors object
const errors = reactive({
  username: '',
  password: '',
  email: '',
});

// For username validation
const userAlrExistError = ref('');

// 是否有修改标志
const hasChanges = ref(false);

// Router for redirection
const router = useRouter();

// Function to check if the username already exists
const checkUsername = async () => {
  if (!hasChanges) {
    return;
  }
  try {
    if (profile.username) {
      const exists = await $fetch(
        `/api/user/validate-username/${profile.username}`,
        {
          method: 'GET',
        }
      );
      if (exists) {
        userAlrExistError.value =
          'The username is taken, please choose another one.';
      } else {
        userAlrExistError.value = '';
      }
      trackChanges();
    }
  } catch (error) {
    console.error('Error checking username:', error);
  }
};

const loadProfile = async () => {
  try {
    const data = await $fetch('/api/user/member/myProfile');
    Object.assign(profile, data);
    Object.assign(originalProfile, data);
    trackChanges();
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

// Function to track changes in the form
const trackChanges = () => {
  hasChanges.value =
    JSON.stringify(profile) !== JSON.stringify(originalProfile);
  console.log('hasChanges:', hasChanges.value);
};

// Function to handle form submission
const submitProfile = async () => {
  if (userAlrExistError.value || !hasChanges.value) {
    alert('Please resolve the errors before submitting the form.');
    return;
  }

  try {
    await $fetch('/api/user/member/saveProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: profile,
    });

    alert('Profile saved successfully!');
    Object.assign(originalProfile, profile);
    hasChanges.value = false;
    router.push('/'); // 成功后跳转到主页
  } catch (error) {
    console.error('Error saving profile:', error);
    alert('Failed to save profile.');
  }
};

const cancelChange = () => {
  Object.assign(profile, originalProfile);
  hasChanges.value = false;
  router.back();
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
.container {
  max-width: 70%;
  margin: 0 auto;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Header Styling */
h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;
}

button {
  border-radius: 4px;
  margin-right: 10px;
}

.btn-disabled-custom {
  background-color: #cccccc !important;
  border-color: #cccccc !important;
  color: #666666 !important;
  cursor: not-allowed;
}

@media (max-width: 992px) {
  .container {
    max-width: 92%;
  }
}
</style>
