import { create } from "zustand";
import axios from "axios";
import { env } from "next-runtime-env";
import { addToast } from "@heroui/react";
import axiosInstance from "@/hooks/axios"; // adjust path if needed

interface LoginData {
  username: string;
  password: string;
  // add other fields if needed
}

interface AppBody {
  name: string;
  description?: string;
  // add other fields expected by backend
}

interface SetupApplicationStore {
  handleLoginSubmit: (data: any) => Promise<any | false>;
  createnewApplication: (body: any, orgId: any) => Promise<any | undefined>;
  getCaptcha: () => Promise<any | false>;
  getUserDetails: () => Promise<any | undefined>;
  handleLogoutsubmit: (data: any) => Promise<any | false>;

  applicationIndryve: string;
  setApplicationIndryve: (value: string) => void;

  applicationIndryveUrl: string;
  setApplicationIndryveUrl: (value: string) => void;

  applicationMail: string;
  setApplicationMail: (value: string) => void;

  applicationMailUrl: string;
  setApplicationMailUrl: (value: string) => void;

  applicationChat: string;
  setApplicationChat: (value: string) => void;

  applicationChatUrl: string;
  setApplicationChatUrl: (value: string) => void;

  applicationMeet: string;
  setApplicationMeet: (value: string) => void;

  applicationMeetUrl: string;
  setApplicationMeetUrl: (value: string) => void;

  applicationVideos: string;
  setApplicationVideos: (value: string) => void;

  applicationVideosUrl: string;
  setApplicationVideosUrl: (value: string) => void;

  applicationSuiteName: string;
  setApplicationSuiteName: (value: string) => void;

  captchaId: string;
  setCaptchaId: (value: string) => void;

  captchaValue: string;
  setCaptchaValue: (value: string) => void;

  captchaString: string;
  setCaptchaString: (value: string) => void;
}

const useSetupApplicationStore = create<SetupApplicationStore>((set) => ({
  applicationIndryve:
    env("NEXT_PUBLIC_DEFAULT_INDRYVE_APPLICATION_NAME") || "Indryve",
  setApplicationIndryve: (value: string) => set({ applicationIndryve: value }),

  applicationIndryveUrl: "",
  setApplicationIndryveUrl: (value: string) =>
    set({ applicationIndryveUrl: value }),

  applicationMail: env("NEXT_PUBLIC_DEFAULT_INDRYVE_MAIL_NAME") || "Patra",
  setApplicationMail(value) {
    set({ applicationMail: value });
  },

  applicationMailUrl: "",
  setApplicationMailUrl: (value: string) => set({ applicationMailUrl: value }),

  applicationChat: env("NEXT_PUBLIC_DEFAULT_INDRYVE_CHAT_NAME") || "Chat",
  setApplicationChat(value) {
    set({ applicationChat: value });
  },

  applicationChatUrl: "",
  setApplicationChatUrl: (value: string) => set({ applicationChatUrl: value }),

  applicationMeet: env("NEXT_PUBLIC_DEFAULT_INDRYVE_MEET_NAME") || "Meet",
  setApplicationMeet(value) {
    set({ applicationMeet: value });
  },

  applicationMeetUrl: "",
  setApplicationMeetUrl: (value: string) => set({ applicationMeetUrl: value }),

  applicationVideos: env("NEXT_PUBLIC_DEFAULT_INDRYVE_VIDEOS_NAME") || "Videos",
  setApplicationVideos(value) {
    set({ applicationVideos: value });
  },

  applicationVideosUrl: "",
  setApplicationVideosUrl: (value: string) =>
    set({ applicationVideosUrl: value }),

  applicationSuiteName:
    env("NEXT_PUBLIC_DEFAULT_INDRYVE_SUITE_NAME") || "Suite",
  setApplicationSuiteName(value) {
    if (value) {
      set({ applicationSuiteName: value });
    }
  },

  captchaId: "",
  setCaptchaId: (value: string) => set({ captchaId: value }),

  captchaValue: "",
  setCaptchaValue: (value: string) => set({ captchaValue: value }),

  captchaString: "",
  setCaptchaString: (value: string) => set({ captchaString: value }),

  handleLogoutsubmit: async (data) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "auth/LogOut",
        {
          ...data,
        }
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

  getUserDetails: async () => {
    try {
      const response = await axiosInstance.get(
        env("NEXT_PUBLIC_BACKEND_URL") + "dashboard/userDetails"
      );

      const data = response.data;

      if (data) {
        localStorage.setItem("orgId", data.orgId);
        localStorage.setItem("userRole", data.users.userRole);
      }

      return data;
    } catch (err: any) {
      // set({ loading: false, error: err.message });
      addToast({
        title: err.message,
        color: "danger",
      });
    } finally {
      // set({ loading: false });
    }
  },

  getCaptcha: async () => {
    try {
      const response = await axios.get(
        env("NEXT_PUBLIC_BACKEND_URL") + "auth/getCaptcha"
      );

      set({
        captchaId: response.data.captchaId,
        captchaString: `data:image/png;base64,${response.data.captchaString}`,
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
        env("NEXT_PUBLIC_BACKEND_URL") + "auth/adminLogin",
        { ...data }
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

  createnewApplication: async (body, orgId) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `portal/createapplication/${orgId}?isVdiApplication=true`,
        body
      );
      return response.data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
      return;
    }
  },
}));

export default useSetupApplicationStore;
