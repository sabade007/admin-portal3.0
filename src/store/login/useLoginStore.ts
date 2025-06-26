import { addToast } from "@heroui/react";
import axios from "axios";
import { env } from "next-runtime-env";
import { create } from "zustand";

import axiosInstance from "@/hooks/axios";

// ✅ Zustand Store Interface
interface LoginStore {
  loading: boolean;
  error: any;

  captchaId: string;
  captchaString: string | null;
  adminVersion: string;
  captchaValue: string;
  captchaValueError: boolean;

  userName: string;
  userNameError: boolean;

  password: string;
  passwordError: boolean;

  forgotPasswordemail: string;
  forgotPasswordemailError: boolean;

  // Setters
  setCaptchaId: (value: string) => void;
  setCaptchaString: (value: string | null) => void;
  setAdminVersion: (value: string) => void;
  setCaptchaValue: (value: string) => void;
  setCaptchaValueError: (value: boolean) => void;

  setUserName: (value: string) => void;
  setUserNameError: (value: boolean) => void;

  setPassword: (value: string) => void;
  setPasswordError: (value: boolean) => void;

  setForgotPasswordemail: (value: string) => void;
  setForgotPasswordemailError: (value: boolean) => void;

  // Async Actions (with inline param types)
  getCaptcha: () => Promise<any | false>;
  handleLoginSubmit: (data: any) => Promise<any | false>;
  handleForgotPasswordsubmit: (data: any) => Promise<any | false>;
  handleLogoutsubmit: (data: any) => Promise<any | false>;
}

// ✅ Zustand Store Implementation
const useLoginStore = create<LoginStore>((set, get) => ({
  loading: false,
  error: null,

  captchaId: "",
  captchaString: null,
  adminVersion: "",
  captchaValue: "",
  captchaValueError: false,

  userName: "",
  userNameError: false,

  password: "",
  passwordError: false,

  forgotPasswordemail: "",
  forgotPasswordemailError: false,

  setCaptchaId: (value) => set({ captchaId: value }),
  setCaptchaString: (value) => set({ captchaString: value }),
  setAdminVersion: (value) => set({ adminVersion: value }),
  setCaptchaValue: (value) => set({ captchaValue: value }),
  setCaptchaValueError: (value) => set({ captchaValueError: value }),
  setUserName: (value) => set({ userName: value }),
  setUserNameError: (value) => set({ userNameError: value }),
  setPassword: (value) => set({ password: value }),
  setPasswordError: (value) => set({ passwordError: value }),
  setForgotPasswordemail: (value) => set({ forgotPasswordemail: value }),
  setForgotPasswordemailError: (value) =>
    set({ forgotPasswordemailError: value }),

  getCaptcha: async () => {
    try {
      const response = await axios.get(
        `${env("NEXT_PUBLIC_BACKEND_URL")}auth/getCaptcha`
      );
      set({
        captchaId: response.data.captchaId,
        captchaString: `data:image/png;base64,${response.data.captchaString}`,
        adminVersion: response.data.adminVersion,
      });
      return response.data;
    } catch (err: any) {
      addToast({
        title: err.message,
        color: "danger",
      });
      return false;
    }
  },

  handleLoginSubmit: async (data) => {
    try {
      const response = await axios.post(
        `${env("NEXT_PUBLIC_BACKEND_URL")}auth/adminLogin`,
        data
      );
      return response.data;
    } catch (err: any) {
      addToast({
        title: err.message,
        color: "danger",
      });
      return false;
    }
  },

  handleForgotPasswordsubmit: async (data) => {
    try {
      const response = await axios.post(
        `${env("NEXT_PUBLIC_BACKEND_URL")}auth/ForgotPassword`,
        data
      );
      return response.data;
    } catch (err: any) {
      addToast({
        title: err.message,
        color: "danger",
      });
      return false;
    }
  },

  handleLogoutsubmit: async (data) => {
    try {
      const response = await axiosInstance.post(
        `${env("NEXT_PUBLIC_BACKEND_URL")}auth/LogOut`,
        data
      );
      return response.data;
    } catch (err: any) {
      addToast({
        title: err.message,
        color: "danger",
      });
      return false;
    }
  },
}));

export default useLoginStore;
