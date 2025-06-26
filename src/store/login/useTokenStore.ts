import { addToast } from "@heroui/react";
import axios from "axios";
import { env } from "next-runtime-env";
import { create } from "zustand";

interface TokenStoreState {
  sessionExpired: boolean;
  setSessionExpired: (value: boolean) => void;

  onIdle: boolean;
  setOnIdle: (value: boolean) => void;

  tokenValidCheck: (token: any) => Promise<any>;
  tokenValidation: (token: any) => Promise<any>;
  extendSession: (token: any, refreshToken: any) => Promise<any>;
}

const useTokenStore = create<TokenStoreState>((set, get) => ({
  sessionExpired: false,
  setSessionExpired: (value: boolean) => {
    set({ sessionExpired: value });
  },

  onIdle: false,
  setOnIdle: (value: boolean) => {
    set({ onIdle: value });
  },

  tokenValidCheck: async (token: any): Promise<any> => {
    try {
      const response = await axios.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "dashboard/validToken",
        {},
        {
          params: { token },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  tokenValidation: async (token: any): Promise<any> => {
    try {
      const response = await axios.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "dashboard/validToken",
        {},
        {
          params: { token },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  extendSession: async (token: any, refreshToken: any): Promise<any> => {
    try {
      const response = await axios.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "auth/re-generate",
        {
          refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
      return false;
    }
  },
}));

export default useTokenStore;
