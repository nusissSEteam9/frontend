import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
const useRecipe = () => {
  const getById = async (recipeId: number) => {
    return await $fetch(`/api/recipe/detail/${recipeId}`, {
      method: 'GET',
      baseURL: useRuntimeConfig().public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
  };
  return { getById };
};
