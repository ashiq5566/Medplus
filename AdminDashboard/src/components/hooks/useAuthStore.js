import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";


const useAuthStore = create(
    persist(
        (set, get) => ({
            accessToken: "",
            refreshToken: "",
            isAuthenticated: false,

            login: (
                accessToken,
                refreshToken,
            ) => {
                set((state) => ({
                    refreshToken,
                    accessToken,
                    isAuthenticated: true,
                }));
            },
            updateOne: (key = "", value = "") => {
                set((state) => ({ [key]: value }));
            },
            logout: () => {
                localStorage.clear();
                set((state) => ({ isAuthenticated: false }));
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
