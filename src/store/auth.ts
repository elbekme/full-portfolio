import { create } from "zustand";
import { NavigateFunction } from 'react-router-dom';
import Cookies from "js-cookie";
import { devtools } from "zustand/middleware";

import { TOKEN, USER } from "../constants";
import User from "../types/user";
import request from "../server/index";
import Register from "../types/register";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  login: (values: User) => void;
  register: (values: Register, navigate: NavigateFunction) => void;
}


const useAuth = create<AuthState>()(
  devtools((set) => ({
    isAuthenticated: Boolean(Cookies.get(TOKEN)),
    user: localStorage.getItem(USER)
      ? JSON.parse(localStorage.getItem(USER) || "")
      : null,
    login: (user) => {
      set((state) => ({ ...state, isAuthenticated: true, user }));
    },
    register: async (values, navigate) => {
      const {
        data: { token, user },
      } = await request.post("auth/register", values);
      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
      set((state) => ({ ...state, isAuthenticated: true, user }));
      navigate("/");
    },
  }))
);

export default useAuth;
