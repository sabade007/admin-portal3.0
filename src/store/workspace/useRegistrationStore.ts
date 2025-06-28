import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";

interface RegistrationState {
  allocatedSpace: number;
  setAllocatedSpace: (value: number) => void;

  selfRegistration: boolean;
  setSelfRegistration: (value: boolean) => void;

  getGeneralSettings: (orgId: string) => Promise<any | undefined>;

  updateGeneralSettings: (body: any) => Promise<any | undefined>;
}

const useRegistrationStore = create<RegistrationState>((set) => ({
  allocatedSpace: 0,
  setAllocatedSpace: (value: number) => set({ allocatedSpace: value }),
  selfRegistration: false,
  setSelfRegistration: (value) => set({ selfRegistration: value }),

  getGeneralSettings: async (orgId: string) => {
    if (!orgId) return;
    const body = {
      orgID: orgId,
      type: "GENERAL",
    };
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "settings/getSettings",
        body
      );
      const data = response.data;
      const value = JSON.parse(data.value);
      const updateSize = data.updateSize ?? 0;
      set({ allocatedSpace: updateSize });
      if (value.hasOwnProperty("sso")) {
        set({ selfRegistration: value.sso });
      }

      return value;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err?.response?.data?.message || err.message,
        color: "danger",
      });
    }
  },

  updateGeneralSettings: async (body) => {
    try {
      const response = await axiosInstance.put(
        env("NEXT_PUBLIC_BACKEND_URL") + "settings/updateDefaultSettings",
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

export default useRegistrationStore;
