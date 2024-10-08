// composables/useAuth.ts
import { useAuthStore } from '~/stores/auth';
import { useRuntimeConfig, navigateTo } from '#app';

interface LoginResponse {
  // Define the structure based on your backend response
  // Assuming the response body contains role and message
  message: string;
}

interface RegisterResponse {
  message: string;
  newMember?: any;
  verifyCode?: string;
}

export const useAuth = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await $fetch<LoginResponse>('/auth/login', {
        baseURL: config.public.backendProxyUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { username, password },
        credentials: 'include',
        // To capture headers, use `fetch` directly
        onResponse({ request, response }) {
          const authHeader = response.headers.get('Authorization');
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            authStore.setToken(token);
          }
        },
      });
      // Optionally, you can parse the message or fetch user details
      // For simplicity, redirecting to home
      navigateTo('/');
    } catch (error: any) {
      throw error.data?.message || 'An error occurred during login.';
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await $fetch<RegisterResponse>('/auth/register', {
        baseURL: config.public.backendProxyUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { username, email, password },
        onResponse({ request, response }) {
          const authHeader = response.headers.get('Authorization');
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            authStore.setToken(token);
          }
        },
      });
      // Optionally, you can handle verification steps
      // For simplicity, redirecting to login
      navigateTo('/login');
    } catch (error: any) {
      throw error.data?.message || 'An error occurred during registration.';
    }
  };

  const logout = () => {
    authStore.logout();
    navigateTo('/login');
  };

  const fetchUser = async (): Promise<void> => {
    // Implement fetching user details if your backend provides an endpoint
    // Example:
    // const user = await $fetch<User>('/auth/me', { ... })
    // authStore.setUser(user)
  };

  return { login, register, logout, fetchUser };
};
