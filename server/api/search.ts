import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const term = query.term as string

  // This is a mock implementation. In a real-world scenario,
  // you would query your database or external API for suggestions.
  const mockSuggestions = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew'
  ]

  const filteredSuggestions = mockSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(term.toLowerCase())
  )

  return filteredSuggestions.slice(0, 5) // Return up to 5 suggestions
})