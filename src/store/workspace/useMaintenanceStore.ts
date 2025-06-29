import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";

interface SearchState {
  mStartDate: string;
  setMStartDate: (term: string) => void;
  mEndDate: string;
  setMEndDate: (term: string) => void;

  mStartTime: string;
  setMStartTime: (term: string) => void;
  mEndTime: string;
  setMEndTime: (term: string) => void;

  mdesc: string;
  setMDesc: (term: string) => void;

  madd: boolean;
  setMAdd: (term: boolean) => void;

  postServerMaintenance: (body: any) => Promise<any | undefined>;
  getServerMaintainenceSettings: (orgId: any) => Promise<any | undefined>;
}

const useMaintenanceStore = create<SearchState>((set) => ({
  mStartDate: "",
  setMStartDate: (term) => set({ mStartDate: term }),
  mEndDate: "",
  setMEndDate: (term) => set({ mEndDate: term }),
  mStartTime: "",
  setMStartTime: (term) => set({ mStartTime: term }),
  mEndTime: "",
  setMEndTime: (term) => set({ mEndTime: term }),
  mdesc: "",
  setMDesc: (term) => set({ mdesc: term }),
  madd: false,
  setMAdd: (term) => set({ madd: term }),

  postServerMaintenance: async (body) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "settings/addMaintenance",
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

  getServerMaintainenceSettings: async (orgId) => {
    const body = {
      description: "",
      fromDateTime: "",
      maintenance: "",
      orgId: Number(orgId),
      toDateTime: "",
      totalDuration: "",
    };

    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "adminDashboard/getMaintenance",
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

export default useMaintenanceStore;
