import { create } from "zustand";
import Signup from "../pages/SignUp";
import axios from "axios"


axios.defaults.withCredentials = true;

// reuse api
const API_URL = "http://localhost:5000/api"

export const useAuthStore = create((set) => ({
    //initial state

    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,


    // functions

    // signup

    Signup: async ( firstname, lastname ,email, phone, dob, nationality, state, lga, city, password ) => {
        set({ isLoading: true, message: null });

        try {
            const response = await axios.post(`${API_URL}/signup`, {
                firstname, lastname ,email, phone, dob, nationality, state, lga, city, password
            });


            set({ user: response.data.user, isLoading: false });
            // persist auth flag
            try { localStorage.setItem('isAuthenticated', 'true'); } catch (e) {}
        } catch (error) {
            set({isLoading: false, 
                error: error.response.data.message || "Error signing up",

            });
            throw error;
        }
    },

    login: async ( email, password) => {
        set({isLoading: true, message: null, error: null });

        try {
           const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
           });

           const {user, message} = response.data;

           set({
            user,
            message,
            isLoading: false,
           });

           try { localStorage.setItem('isAuthenticated', 'true'); } catch (e) {}

           return { user, message };
        } catch (error) {
            set({isLoading: false, 
                error: error.response.data.message || "Error logging in",

            });
            throw error;
        }
    },

    fetchUser: async () => {
        set({fetchingUser: true, error: null});

        try {
            const response = await axios.get(`${API_URL}/fetch-user`)
            set({ user: response.data.user, fetchingUser: false});
            try { localStorage.setItem('isAuthenticated', 'true'); } catch (e) {}
        } catch (error) {
            set({isLoading: false, 
                error: error.response.data.message || "Error fetching data",

            });
            throw error;
        }
    }
,
        logout: () => {
            set({ user: null });
            try { localStorage.removeItem('isAuthenticated'); } catch (e) {}
        }
}))
