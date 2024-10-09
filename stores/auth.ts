// stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCookie } from '#app';

interface User {
  id: number;
  username: string;
  email: string;
  userType: string;
  // Add other user fields as needed
}

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('token'); // Stores the JWT token in a cookie
  const user = ref<User | null>(null);

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const setUser = (newUser: User) => {
    user.value = newUser;
  };

  const logout = () => {
    token.value = '';
    user.value = null;
  };

  return { token, user, setToken, setUser, logout };
});
