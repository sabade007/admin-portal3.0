// store/useWorkspaceStore.ts
import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";

type WorkspaceState = {
  currentTab: string;
  setCurrentTab: (key: string) => void;

  currentMobileTab: string;
  setCurrentMobileTab: (key: string) => void;

  orgId: number;
  setOrgId: (key: number) => void;

  userRole: string;
  setUserRole: (key: string) => void;

  applicationArray: any[];
  setApplicationArray: (applicationArray: any[]) => void;

  displayPicture: string;
  setDisplayPicture: (key: string) => void;

  emailAddress: string;
  setEmailAddress: (key: string) => void;

  userName: string;
  setUserName: (key: string) => void;

  fullName: string;
  setFullName: (key: string) => void;

  bookMarks: any[];
  setBookMarks: (bookMarks: any[]) => void;

  getUserDetails: () => Promise<any | undefined>;

  getAllApplications: (orgId: any) => Promise<any | undefined>;

  initializeWorkspace: () => Promise<void>;

  createnewApplication: (body: any, orgId: any) => Promise<any | undefined>;

  getbookmarks: () => Promise<any | undefined>;
};

const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentTab: "suite",
  setCurrentTab: (key) => set({ currentTab: key }),

  currentMobileTab: "suitemob",
  setCurrentMobileTab: (key) => set({ currentMobileTab: key }),

  orgId: 0,
  setOrgId: (key) => set({ orgId: key }),

  userRole: "",
  setUserRole: (key) => set({ userRole: key }),

  applicationArray: [],
  setApplicationArray: (applicationArray) => set({ applicationArray }),

  displayPicture: "",
  setDisplayPicture: (key) => set({ displayPicture: key }),

  emailAddress: "",
  setEmailAddress: (key) => set({ emailAddress: key }),

  userName: "",
  setUserName: (key) => set({ userName: key }),

  fullName: "",
  setFullName: (key) => set({ fullName: key }),

  bookMarks: [],
  setBookMarks: (bookMarks) => set({ bookMarks }),

  getUserDetails: async () => {
    try {
      const response = await axiosInstance.get(
        env("NEXT_PUBLIC_BACKEND_URL") + "dashboard/userDetails"
      );

      const data = response.data;

      if (data) {
        localStorage.setItem("orgId", data.orgId);
        localStorage.setItem("userRole", data.users.userRole);
        set({
          orgId: data.orgId,
          userRole: data.users.userRole,
          displayPicture: data.users.displayPicture,
          emailAddress: data.users.email,
          userName: data.users.username,
          fullName: data.users.fullName,
        });
      }

      return data;
    } catch (err: any) {
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  getAllApplications: async (orgId: any) => {
    try {
      const response = await axiosInstance.get(
        env("NEXT_PUBLIC_BACKEND_URL") + `portal/getapplication/${orgId}`
      );
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        set({ applicationArray: data });
      } else {
        set({ applicationArray: [] }); // Optional: clear if no data
      }
      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  createnewApplication: async (body, orgId) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `portal/createapplication/${orgId}?isVdiApplication=true`,
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

  getbookmarks: async () => {
    try {
      const response = await axiosInstance.get(
        env("NEXT_PUBLIC_BACKEND_URL") + "BookMarks/GetAllLinks/1/100"
      );
      const data = response.data;
      const sortedBookmarks = data.content.sort(
        (a: any, b: any) => b.createdAt - a.createdAt
      );

      set({
        bookMarks: sortedBookmarks,
      });

      return data;
    } catch (err) {
      addToast({
        title: "Cannot get bookmarks details",
        color: "danger",
      });
      return false;
    }
  },

  initializeWorkspace: async () => {
    try {
      const userDetails = await useWorkspaceStore.getState().getUserDetails();

      if (!userDetails?.orgId) return;

      const orgId = userDetails.orgId;
      useWorkspaceStore.getState().setOrgId(orgId);

      const response = await useWorkspaceStore
        .getState()
        .getAllApplications(orgId);

      if (!response || response.length === 0) {
        const defaultAppNames = [
          env("NEXT_PUBLIC_DEFAULT_INDRYVE_APPLICATION_NAME"),
          env("NEXT_PUBLIC_DEFAULT_INDRYVE_MAIL_NAME"),
          env("NEXT_PUBLIC_DEFAULT_INDRYVE_CHAT_NAME"),
          env("NEXT_PUBLIC_DEFAULT_INDRYVE_MEET_NAME"),
          env("NEXT_PUBLIC_DEFAULT_INDRYVE_VIDEOS_NAME"),
        ].filter(Boolean);

        for (const name of defaultAppNames) {
          await useWorkspaceStore.getState().createnewApplication(
            {
              applicationName: name,
              applicationUrl: "",
              applicationLogo: "",
              isEnabled: true,
              roleId: [],
              isDefault: true,
            },
            orgId
          );
        }

        await useWorkspaceStore.getState().getAllApplications(orgId);
      }
      await useWorkspaceStore.getState().getbookmarks();
    } catch (err: any) {
      addToast({
        title: "Failed to initialize workspace",
        description: err.message,
        color: "danger",
      });
    }
  },
}));

export default useWorkspaceStore;
