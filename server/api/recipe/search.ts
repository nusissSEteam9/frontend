import { defineEventHandler, readBody } from 'h3'

// Mock data for demonstration purposes
const mockRecipes = [
  { id: 1, name: 'Pasta Carbonara', description: 'Classic Italian pasta dish', image: 'pasta.jpg', member: { id: 1, username: 'chef1' } },
  { id: 2, name: 'Chicken Curry', description: 'Spicy Indian curry', image: 'curry.jpg', member: { id: 2, username: 'chef2' } },
  { id: 3, name: 'Caesar Salad', description: 'Fresh and crispy salad', image: 'salad.jpg', member: { id: 3, username: 'chef3' } },
  // Add more mock recipes here
]

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { query, searchType, filters, pageNo, pageSize } = body

  // Filter recipes based on search query and type
  let filteredRecipes = mockRecipes.filter(recipe => {
    if (searchType === 'name') {
      return recipe.name.toLowerCase().includes(query.toLowerCase())
    } else if (searchType === 'description') {
      return recipe.description.toLowerCase().includes(query.toLowerCase())
    }
    // Add more search types if needed
    return true
  })

  // Apply filters
  if (filters.healthScore) {
    // Mock implementation: assume recipes with even IDs have health score >= 4
    filteredRecipes = filteredRecipes.filter(recipe => recipe.id % 2 === 0)
  }
  if (filters.calorieIntake) {
    // Mock implementation: assume recipes with IDs divisible by 3 fit calorie intake
    filteredRecipes = filteredRecipes.filter(recipe => recipe.id % 3 === 0)
  }

  // Calculate pagination
  const totalRecipes = filteredRecipes.length
  const totalPages = Math.ceil(totalRecipes / pageSize)
  const start = pageNo * pageSize
  const end = start + pageSize

  // Return paginated results
  return {
    results: filteredRecipes.slice(start, end),
    totalPages,
    currentPage: pageNo
  }
})