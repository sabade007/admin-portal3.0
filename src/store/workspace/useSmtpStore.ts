import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";

interface SearchState {
  smtpHost: string;
  setSmtpHost: (term: string) => void;

  smtpPort: string;
  setSmtpPort: (term: string) => void;

  smtpUsername: string;
  setSmtpUsername: (term: string) => void;

  smtpPassword: string;
  setSmtpPassword: (term: string) => void;

  smtpProtocol: string;
  setSmtpProtocol: (term: string) => void;

  smtpHostError: boolean;
  setSmtpHostError: (term: boolean) => void;

  smtpPortError: boolean;
  setSmtpPortError: (term: boolean) => void;

  smtpUsernameError: boolean;
  setSmtpUsernameError: (term: boolean) => void;

  smtpPasswordError: boolean;
  setSmtpPasswordError: (term: boolean) => void;

  smtpProtocolError: boolean;
  setSmtpProtocolError: (term: boolean) => void;

  smtpEnableSmtpAuth: boolean;
  setSmtpEnableSmtpAuth: (term: boolean) => void;

  smtpEnableStartTls: boolean;
  setSmtpEnableStartTls: (term: boolean) => void;

  getEmailSettings: (orgID: string) => Promise<any | undefined>;

  updateEmailSettings: (body: any) => Promise<any | undefined>;

  testEmailSettings: (body: any) => Promise<any | undefined>;
}

const useSmtpStore = create<SearchState>((set) => ({
  smtpHost: "",
  setSmtpHost: (host) => set({ smtpHost: host }),
  smtpPort: "",
  setSmtpPort: (port) => set({ smtpPort: port }),
  smtpUsername: "",
  setSmtpUsername: (username) => set({ smtpUsername: username }),
  smtpPassword: "",
  setSmtpPassword: (password) => set({ smtpPassword: password }),
  smtpProtocol: "",
  setSmtpProtocol: (protocol) => set({ smtpProtocol: protocol }),
  smtpHostError: false,
  setSmtpHostError: (error) => set({ smtpHostError: error }),
  smtpPortError: false,
  setSmtpPortError: (error) => set({ smtpPortError: error }),
  smtpUsernameError: false,
  setSmtpUsernameError: (error) => set({ smtpUsernameError: error }),
  smtpPasswordError: false,
  setSmtpPasswordError: (error) => set({ smtpPasswordError: error }),
  smtpProtocolError: false,
  setSmtpProtocolError: (error) => set({ smtpProtocolError: error }),
  smtpEnableSmtpAuth: false,
  setSmtpEnableSmtpAuth: (enable) => set({ smtpEnableSmtpAuth: enable }),
  smtpEnableStartTls: false,
  setSmtpEnableStartTls: (enable) => set({ smtpEnableStartTls: enable }),

  getEmailSettings: async (orgID: string) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "settings/getEmailSettings",
        { orgID }
      );

      const rawValue = response.data?.value;
      if (!rawValue) return;

      const parsed = JSON.parse(rawValue);

      set({
        smtpHost: parsed.springMailHost,
        smtpPort: parsed.springMailPort.toString(),
        smtpUsername: parsed.springMailUsername,
        smtpPassword: parsed.springMailPassword,
        smtpProtocol: parsed.springMailProtocol,
        smtpEnableSmtpAuth: parsed.springMailPropertiesMailSmtpAuth === "true",
        smtpEnableStartTls:
          parsed.springMailPropertiesMailSmtpStarttlsEnable === "true",
      });

      return parsed;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  testEmailSettings: async (body: any) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "settings/testMailConfig",
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

  updateEmailSettings: async (body: any) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "settings/updateEmailSettings",
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

export default useSmtpStore;
