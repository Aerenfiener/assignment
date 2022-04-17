import {
    ASSIGNMENT_TOKEN
} from "../Constants/Auth.constants";

export const AuthStorageService = {
    getToken: () => localStorage.getItem(ASSIGNMENT_TOKEN),
    setToken: (value: string) => localStorage.setItem(ASSIGNMENT_TOKEN, value),
    removeToken: () => localStorage.removeItem(ASSIGNMENT_TOKEN),
}
