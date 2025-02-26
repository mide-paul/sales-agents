'use client';
import { create } from "zustand";
import axios, { AxiosError } from "axios";

const API_URL = "https://api.hosoptima.com";

// axios.defaults.withCredentials = true;

// Utility function to save user to localStorage
const saveUserToLocalStorage = (user: User | null) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
};

// Load user from localStorage
const loadUserFromLocalStorage = (): User | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser) as User;
    }
  }
  return null;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture: string;
  token: string;
};

interface IAuth {
  user: User | null;
  setUser: (user: User) => void;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  message: string | null;
  signup: (email: string, password: string, first_name: string, last_name: string, phone: string) => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export const useAuthStore = create<IAuth>((set) => {
  const storedUser = loadUserFromLocalStorage();

  return {
    user: storedUser,
    setUser: (user) => {
      saveUserToLocalStorage(user);
      set({ user });
    },
    isAuthenticated: !!storedUser,
    error: null,
    isLoading: false,
    message: null,

    signup: async (email, password, first_name, last_name, phone) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/api/v1/crm/auth/register`, { email, password, first_name, last_name, phone });
        const user = response.data.data;
        set({ user, isAuthenticated: true, isLoading: false });
        saveUserToLocalStorage(user);
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        set({ error: err.response?.data?.message || "Error signing up", isLoading: false });
        throw err;
      }
    },

    login: async (email, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/api/v1/crm/auth/login`, { email, password });
        const user = response.data.data;
        set({ user, isAuthenticated: true });
        saveUserToLocalStorage(user);
        return user;
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        set({ error: err.response?.data?.message || "Error logging in", isLoading: false });
        throw err;
      }
    },

    logout: async () => {
      set({ isLoading: true, error: null });
      try {
        await axios.post(`${API_URL}/api/v1/ad-manager/logout`);
        set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        localStorage.removeItem("user");
      } catch (error: unknown) {
        const err = error as AxiosError;
        set({ error: "Error logging out", isLoading: false });
        throw err;
      }
    },

    checkAuth: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.get(`${API_URL}/check-auth`);
        const user = response.data.user as User;
        set({ user, isAuthenticated: true });
        saveUserToLocalStorage(user);
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        set({ error: err.response?.data?.message || "Error checking authentication", isAuthenticated: false });
      } finally {
        set({ isLoading: false });
      }
    },

    forgotPassword: async (email) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/api/v1/ad-manager/forgot-password`, { email });
        set({ message: response.data.message, isLoading: false });
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        set({ error: err.response?.data?.message || "Error sending reset password email", isLoading: false });
        throw err;
      }
    },

    resetPassword: async (token, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/api/v1/ad-manager/reset-password/${token}`, { password });
        set({ message: response.data.message, isLoading: false });
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        set({ error: err.response?.data?.message || "Error resetting password", isLoading: false });
        throw err;
      }
    },
  };
});