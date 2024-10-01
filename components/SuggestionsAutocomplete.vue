<template>
  <div>
    <label for="autocomplete">Search: </label>
    <input
      id="autocomplete"
      v-model="searchTerm"
      :class="{ 'loading': isLoading }"
      @input="getSuggestions"
    >
    <ul v-if="suggestions.length > 0" class="suggestions-list">
      <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFetch } from '#app'

const searchTerm = ref('')
const suggestions = ref([])
const isLoading = ref(false)

const getSuggestions = async () => {
  if (searchTerm.value.length < 1) {
    suggestions.value = []
    return
  }

  isLoading.value = true
  const { data, error } = await useFetch('/api/search', {
    method: 'GET',
    params: { term: searchTerm.value }
  })

  if (error.value) {
    console.error('Error fetching suggestions:', error.value)
    suggestions.value = []
  } else {
    suggestions.value = data.value
  }
  isLoading.value = false
}

const selectSuggestion = (suggestion) => {
  searchTerm.value = suggestion
  suggestions.value = []
}

// Debounce the API call to avoid too many requests
let debounceTimer
watch(searchTerm, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(getSuggestions, 300)
})
</script>

<style scoped>
.loading {
  background-color: #f0f0f0;
}

.suggestions-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
}

.suggestions-list li {
  padding: 5px 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>