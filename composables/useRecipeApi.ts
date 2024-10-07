// composables/useRecipeApi.ts

interface Ingredient {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbohydrate: number;
  sugar: number;
  sodium: number;
  fat: number;
  saturatedFat: number;
}

interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  preparationTime: number;
  steps: string[];
  servings: number;
  calories: number;
  protein: number;
  carbohydrate: number;
  sugar: number;
  sodium: number;
  fat: number;
  saturatedFat: number;
  healthScore: number;
  ingredients: Ingredient[];
}

export function useRecipeApi() {
  const baseUrl = '/api/recipe';

  const fetchRecipe = async (id: number): Promise<Recipe> => {
    const { data, error } = await useFetch<Recipe>(`${baseUrl}/save/${id}`);
    if (error.value) {
      throw new Error('Error fetching recipe');
    }
    return data.value;
  };

  const unsubscribeRecipe = async (id: number): Promise<void> => {
    const { data, error } = await useFetch<void>(
      `${baseUrl}/unsubscribe/${id}`
    );
    if (error.value) {
      throw new Error('Error unsubscribing from recipe');
    }
    return data.value;
  };

  const fetchReviewForm = async (id: number): Promise<string> => {
    const { data, error } = await useFetch<string>(`${baseUrl}/review/${id}`);
    if (error.value) {
      throw new Error('Error fetching review form');
    }
    return data.value;
  };

  const postReview = async (id: number, reviewData: any): Promise<void> => {
    const { data, error } = await useFetch<void>(`${baseUrl}/review/${id}`, {
      method: 'POST',
      body: reviewData,
    });
    if (error.value) {
      throw new Error('Error posting review');
    }
    return data.value;
  };

  const fetchIngredients = async (id: number): Promise<Ingredient[]> => {
    const { data, error } = await useFetch<Ingredient[]>(
      `${baseUrl}/ingredients/${id}`
    );
    if (error.value) {
      throw new Error('Error fetching ingredients');
    }
    return data.value;
  };

  const fetchAllRecipes = async (): Promise<Recipe[]> => {
    const { data, error } = await useFetch<Recipe[]>(`${baseUrl}/all`);
    if (error.value) {
      throw new Error('Error fetching all recipes');
    }
    return data.value;
  };

  const fetchRecipeDetails = async (id: number): Promise<Recipe> => {
    const { data, error } = await useFetch<Recipe>(`${baseUrl}/detail/${id}`);
    if (error.value) {
      throw new Error('Error fetching recipe details');
    }
    return data.value;
  };

  const addNewRecipe = async (recipeData: any): Promise<void> => {
    const { data, error } = await useFetch<void>(`${baseUrl}/add`, {
      method: 'POST',
      body: recipeData,
    });
    if (error.value) {
      throw new Error('Error adding new recipe');
    }
    return data.value;
  };

  return {
    fetchRecipe,
    unsubscribeRecipe,
    fetchReviewForm,
    postReview,
    fetchIngredients,
    fetchAllRecipes,
    fetchRecipeDetails,
    addNewRecipe,
  };
}
