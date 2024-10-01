import { ref } from 'vue'
import type { Ref } from 'vue'
import { useAsyncData } from '#app'

interface Recipe {
  id: number
  name: string
  description: string
  image: string
  member: {
    id: number
    username: string
  }
}

interface Filters {
  healthScore: boolean
  calorieIntake: boolean
}

export function useRecipeSearch() {
  const results: Ref<Recipe[]> = ref([])
  const currentPage = ref(0)
  const totalPages = ref(0)
  const pageSize = ref(12)
  const lastQuery = ref('')
  const lastSearchType = ref('')
  const lastFilters = ref<Filters>({ healthScore: false, calorieIntake: false })

  const searchRecipes = async (query: string, searchType: string, filters: Filters) => {
    lastQuery.value = query
    lastSearchType.value = searchType
    lastFilters.value = { ...filters }

    const { data, error } = await useAsyncData('recipeSearch', () =>
      $fetch('/api/recipe/search', {
        method: 'POST',
        body: {
          query,
          searchType,
          filters,
          pageNo: currentPage.value,
          pageSize: pageSize.value
        }
      })
    )

    if (error.value) {
      console.error('Error fetching recipes:', error.value)
      results.value = []
    } else if (data.value) {
      results.value = data.value.results
      totalPages.value = data.value.totalPages
    }
  }

  const previousPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--
      searchRecipes(lastQuery.value, lastSearchType.value, lastFilters.value)
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
      currentPage.value++
      searchRecipes(lastQuery.value, lastSearchType.value, lastFilters.value)
    }
  }

  const changePageSize = (newSize: number) => {
    pageSize.value = newSize
    currentPage.value = 0
    searchRecipes(lastQuery.value, lastSearchType.value, lastFilters.value)
  }

  return {
    results,
    currentPage,
    totalPages,
    pageSize,
    searchRecipes,
    previousPage,
    nextPage,
    changePageSize
  }
}