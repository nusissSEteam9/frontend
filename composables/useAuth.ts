// composables/useAuth.ts
import { useAuthStore } from '~/stores/auth';
import { useRuntimeConfig, navigateTo } from '#app';

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
    try {
      const response = await $fetch<LoginResponse>('/auth/login', {
        baseURL: config.public.backendProxyUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { username, password },
        credentials: 'include',
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
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<{ requiresVerification: boolean; message: string }> => {
    try {
      const response = await $fetch<RegisterResponse>('/auth/register', {
        baseURL: config.public.backendProxyUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { username, email, password },
      });

      if (response.verifyCode) {
        // Verification is required
        return {
          requiresVerification: true,
          message: response.message,
        };
      } else {
        // Registration successful without verification
        navigateTo('/login');
        return {
          requiresVerification: false,
          message: response.message,
        };
      }
    } catch (error: any) {
      throw error.data?.message || 'An error occurred during registration.';
    }
  };

  /**
   * Handles email verification.
   * @param username - The username of the user.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns A message indicating the result of verification.
   */
  const verifyEmail = async (
    username: string,
    email: string,
    password: string
  ): Promise<string> => {
    try {
      const token = await $fetch<string>('/auth/verifyCode/success', {
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
      // Assuming the backend returns the token directly
      // Redirect to home after successful verification
      navigateTo('/');
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

  /**
   * Fetches user details.
   * @todo Implement this based on your backend's user details endpoint.
   */
  const fetchUser = async (): Promise<void> => {
    // Implement fetching user details if your backend provides an endpoint
    // Example:
    // const user = await $fetch<User>('/auth/me', { ... })
    // authStore.setUser(user)
  };

  return { login, register, verifyEmail, logout, fetchUser };
};
