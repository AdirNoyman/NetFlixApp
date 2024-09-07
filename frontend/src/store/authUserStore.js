import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => {
  return {
    user: null,
    isSigningUpInProgeress: false,
    signup: async (credentials) => {
      set({ isSigningUpInProgeress: true });

      try {
        const response = await axios.post('/api/v1/auth/signup', credentials);
        // Store in session state, the user object that was returned from the server
        set({ user: response.data.user });

        set({ isSigningUpInProgeress: false });

        toast.success("Account created successfully 😎🤘")
      } catch (error) {
        console.error('Error signing up: ', error);
        toast.error(
          error.response.data.message ||
            'Error signing up 😫. Please try again later.'
        );
        set({ isSigningUpInProgeress: false, user: null });
      }
    },
    login: async () => {},
    logout: async () => {},
    authCheck: async () => {},
  };
});
