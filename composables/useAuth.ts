// composables/useAuth.ts
import { useAuthStore } from '~/stores/auth';
import { useRuntimeConfig, navigateTo } from '#app';
import InvalidateInfoError from '~/utils/invalidateInfoError';
interface LoginResponse {
  message: string;
}

interface RegisterResponse {
  message: string;
  verifyCode?: string;
}
export const useAuth = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  /**
   * Handles user login.
   * @param username - The username of the user.
   * @param password - The password of the user.
   */
  const login = async (username: string, password: string): Promise<void> => {
    if (authStore.isLoggedIn) {
      const error = new Error('already logged in');
      error.name = 'AlreadyLoggedInError';
      throw error;
    }
    try {
      await $fetch<LoginResponse>('/api/auth/login', {
        baseURL: config.public.backendProxyUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { username, password },
        onResponse({ request, response }) {
          const authHeader = response.headers.get('Authorization');
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            authStore.setToken(token);
          }
        },
      });
      // Redirect to home after successful login
      navigateTo('/');
    } catch (error: any) {
      throw error.data?.message || 'An error occurred during login.';
    }
  };

  /**
   * Handles user registration.
   * @param username - The desired username.
   * @param email - The user's email address.
   * @param password - The desired password.
   * @returns An object indicating if verification is required and any messages.
   */
  const register = async (form: {
    username: string;
    email: string;
    password: string;
  }): Promise<{
    message: string;
    code: string;
  }> => {
    const res = await $fetch<RegisterResponse>('/api/auth/register', {
      baseURL: config.public.backendProxyUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: form,
      // Handle successful responses
      onResponse({ request, response }) {
        const authHeader = response.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.split(' ')[1];
          authStore.setToken(token);
        }
      },
      // Handle error responses
      onResponseError: async ({ request, response }) => {
        console.log('response', response);
        const errorData = response._data;
        // Throw a new error with the message from the backend
        throw new InvalidateInfoError(
          errorData.message || 'An error occurred during registration.'
        );
      },
    });

    // If the request is successful, return the desired data
    return {
      message: res.message,
      code: res.verifyCode || '',
    };
  };

  /**
   * Handles email verification.
   * @param username - The username of the user.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns A message indicating the result of verification.
   */
  const verifyEmail = async (form: {
    username: string;
    email: string;
    password: string;
  }): Promise<string> => {
    try {
      await $fetch<string>('/api/auth/verifyCode/success', {
        baseURL: config.public.backendProxyUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: form,
        onResponse({ request, response }) {
          const authHeader = response.headers.get('Authorization');
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            authStore.setToken(token);
          }
        },
      });

      return 'Email verified and registration successful.';
    } catch (error: any) {
      throw (
        error.data?.message || 'An error occurred during email verification.'
      );
    }
  };

  /**
   * Logs out the user.
   */
  const logout = () => {
    authStore.logout();
    navigateTo('/login');
  };

  return { login, register, verifyEmail, logout };
};
