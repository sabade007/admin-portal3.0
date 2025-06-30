import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";

interface UserStoreState {
  getUsers: (body: any) => Promise<any>;
  getSearchResults: (body: any, username: string) => Promise<any>;
  updateStorage: (body: any) => Promise<any>;
}

const useUserStore = create<UserStoreState>((set) => ({
  getUsers: async (body) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "admin/getAllUsers",
        body
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  getSearchResults: async (body, username) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `adminDashboard/getSearchAllUsers/${username}`,
        body
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  updateStorage: async (body) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "admin/editUser",
        body
      );
      const data = response.data;
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },
}));

export default useUserStore;
