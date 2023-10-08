import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const useAuthStore = create((set) => ({
    username: '',
    password: '',
    accessToken: "",
    refreshToken: "",
    setUserCredentials: (username, password) => set({ username, password }),
}));

export default useAuthStore;
