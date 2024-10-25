// plugins/imageSelector.ts
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('selectRandomImage', (): string => {
    const maxImages = 20;
    const imageNumber = Math.floor(Math.random() * maxImages) + 1;
    return `/images/recipe${String(imageNumber).padStart(2, '0')}.jpg`;
  });
});
