import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";

interface DashboardState {
  activeUsers: number;
  totalUsers: number;
  totalSpaceUsed: number;
  totalSizeAllocated: number;
  totalSpaceUsedReadable: string;
  totalSizeAllocatedReadable: string;
  spaceConsumedPercent: string;
  message: string;

  getConcertUsage: () => Promise<void>;
}

const useDashboardStore = create<DashboardState>((set) => ({
  activeUsers: 0,
  totalUsers: 0,
  totalSpaceUsed: 0,
  totalSizeAllocated: 0,
  totalSpaceUsedReadable: "0 GB",
  totalSizeAllocatedReadable: "0 GB",
  spaceConsumedPercent: "0",
  message: "",

  getConcertUsage: async () => {
    try {
      const response = await axiosInstance.get(
        env("NEXT_PUBLIC_BACKEND_URL") + "adminDashboard/concertUsage"
      );
      const data = response.data;

      set({
        activeUsers: data.activeUsers,
        totalUsers: data.totalDbUsers,
        totalSpaceUsed: data.totalSpaceUsed,
        totalSizeAllocated: data.totalSizeAllocated,
        totalSpaceUsedReadable: data.totalSpaceUsedReadable,
        totalSizeAllocatedReadable: data.totalSizeAllocatedReadable,
        spaceConsumedPercent: data.spaceConsumedPercent,
        message: data.message,
      });
    } catch (err: any) {
      console.error(err);
      addToast({
        title: err.message || "Failed to fetch concert usage.",
        color: "danger",
      });
    }
  },
}));

export default useDashboardStore;
