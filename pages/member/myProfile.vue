<template>
  <div class="container mt-5" style="max-width: 60%;">
    <h2 class="mb-4">My Profile</h2>

    <!-- Profile Form -->
    <form @submit.prevent="submitProfile" class="needs-validation" novalidate>
      <input type="hidden" v-model="profile.id" />
      <input type="hidden" v-model="profile.age" />
      <input type="hidden" v-model="profile.memberStatus" />
      <input type="hidden" v-model="profile.calorieIntake" />
      <input type="hidden" v-model="profile.registrationDate" />

      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" v-model="profile.username" @blur="checkUsername" class="form-control" required>
        <div class="invalid-feedback" v-if="userAlrExistError">{{ userAlrExistError }}</div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" v-model="profile.password" class="form-control" required>
        <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" v-model="profile.email" class="form-control">
        <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
      </div>

      <div class="mb-3">
        <label for="birthdate" class="form-label">Birthdate</label>
        <input type="date" id="birthdate" v-model="profile.birthdate" class="form-control" required>
      </div>

      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <select id="gender" v-model="profile.gender" class="form-select" required>
          <option value="" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div class="invalid-feedback" v-if="!profile.gender">Gender is required</div>
      </div>

      <div class="mb-3">
        <label for="height" class="form-label">Height (in cm)</label>
        <input type="number" id="height" v-model="profile.height" class="form-control" required>
      </div>

      <div class="mb-3">
        <label for="weight" class="form-label">Weight (in kg)</label>
        <input type="number" id="weight" v-model="profile.weight" step=".1" class="form-control" required>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="userAlrExistError">Save</button>
      <button type="button" class="btn btn-secondary" @click="cancelChange">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// Reactive profile data
const profile = reactive({
  id: '',            // Set these values based on the data you fetch
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
  weight: ''
})

// Reactive errors object
const errors = reactive({
  username: '',
  password: '',
  email: ''
})

// For username validation
const userAlrExistError = ref('')

// Router for redirection
const router = useRouter()

// Function to check if the username already exists
const checkUsername = async () => {
  try {
    if (profile.username) {
      const response = await fetch('/api/user/checkIfUsernameAvailable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: profile.username }),
      })
      const data = await response.json()
      if (data.userAlrExists) {
        userAlrExistError.value = 'The username is taken, please choose another one.'
      } else {
        userAlrExistError.value = ''
      }
    }
  } catch (error) {
    console.error('Error checking username:', error)
  }
}

// Function to handle form submission
const submitProfile = async () => {
  if (userAlrExistError.value) {
    alert('Please resolve the errors before submitting the form.')
    return
  }

  try {
    const response = await fetch('/api/user/saveProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    })

    if (response.ok) {
      alert('Profile saved successfully!')
      router.push('/') // Redirect to home after successful submission
    } else {
      const data = await response.json()
      console.log(data)
      alert('There was an issue saving the profile. Please try again.')
    }
  } catch (error) {
    console.error('Error saving profile:', error)
    alert('Failed to save profile.')
  }
}

const cancelChange = () => {
  router.back();
};
</script>

<style scoped>
button {
  border-radius: 4px;
  margin-right: 10px;
}
</style>
