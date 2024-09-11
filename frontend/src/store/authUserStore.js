import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => {
  return {
    user: null,
    isSigningUpInProgeress: false,
    isCheckingUserAuth: true,
    isLoggingIn: false,
    isLoggingOut: false,

    // SIGNUP ////////////////////////////////////////////////
    signup: async (credentials) => {
      set({ isSigningUpInProgeress: true });
      try {
        // '/api' will be replaced by the base url: 'http://localhost:3000'
        const response = await axios.post('/api/v1/auth/signup', credentials);
        // Store in session state, the user object that was returned from the server
        set({ user: response.data.user });

        set({ isSigningUpInProgeress: false });

        toast.success('Account created successfully 😎🤘');
      } catch (error) {
        console.error('Error signing up: ', error);
        toast.error(
          error.response.data.message ||
            'Error signing up 😫. Please try again later.'
        );
        set({ isSigningUpInProgeress: false, user: null });
      }
    },

    // LOGIN ////////////////////////////////////////////////
    login: async (credentials) => {
      set({ isLoggingIn: true });

      try {
        // '/api' will be replaced by the base url: 'http://localhost:3000'
        const response = await axios.post('/api/v1/auth/login', credentials);
        set({ user: response.data.user, isLoggingIn: false });
        toast.success('Logged In successfully 😎🤘');
      } catch (error) {
        set({ isLoggingIn: false, user: null });
        console.error('Error logging in: ', error);
        toast.error(
          error.response.data.message ||
            'Error logging in 😫. Please try again later.'
        );
      }
    },

    // LOGOUT ////////////////////////////////////////////////
    logout: async () => {
      set({ isLoggingOut: true });

      try {
        await axios.post('/api/v1/auth/logout');
        set({ user: null, isLoggingOut: false });
        toast.success('Logged out successfully 😎🤘');
      } catch (error) {
        set({ isLoggingOut: false });
        console.error('Error logging out: ', error);
        toast.error(
          error.response.data.message ||
            'Error logging out 😫. Please try again later.'
        );
      }
    },
    // AUTH CHECK ////////////////////////////////////////////////
    authCheck: async () => {
      set({ isCheckingUserAuth: true });

      try {
        const response = await axios.get('/api/v1/auth/authcheck');

        set({ user: response.data.user, isCheckingUserAuth: false });
      } catch (error) {
        set({ isCheckingUserAuth: false, user: null });
        console.log('Error is checking user auth', error);
      }
    },
  };
});
