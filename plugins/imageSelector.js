// plugins/imageSelector.js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('selectImageByRecipeId', (recipeId) => {
    const maxImages = 20;
    const imageIndex = (recipeId % maxImages) + 1; // 使用 recipeId 与图片总数的余数来决定图片
    return `/images/recipe${String(imageIndex).padStart(2, '0')}.jpg`;
  });
});
