import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";

interface ActivityState {
  getAdminActivity: (data: any) => Promise<any>;
  getUserActivity: (data: any) => Promise<any>;
}

const useActivityStore = create<ActivityState>((set) => ({
  getAdminActivity: async (data) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") +
          "AdminActivityController/getAllActivity",
        data
      );

      return response.data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  getUserActivity: async (data) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") +
          "AdminActivityController/getAllUserActivity",
        data
      );

      return response.data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },
}));

export default useActivityStore;
