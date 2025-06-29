import axiosInstance from "@/hooks/axios";
import { addToast } from "@heroui/react";
import { env } from "next-runtime-env";
import { create } from "zustand";

interface ExtenstionsState {
  extensionValue: string;
  setExtensionValue: (value: string) => void;

  extensionValueError: boolean;
  setExtensionValueError: (value: boolean) => void;

  mimeTypeValue: string;
  setMimeTypeValue: (value: string) => void;

  mimeTypeValueError: boolean;
  setMimeTypeValueError: (value: boolean) => void;

  extensions: any[];
  setExtensions: (extensions: any[]) => void;

  mimeTypes: any[];
  setMimeTypes: (mimetypes: any[]) => void;

  fileSize: string;
  setFileSize: (value: string) => void;

  fileSizeError: boolean;
  setFileSizeError: (value: boolean) => void;

  fileCount: string;
  setFileCount: (value: string) => void;

  fileCountError: boolean;
  setFileCountError: (value: boolean) => void;

  getFileProperties: (orgId: any) => Promise<any | undefined>;
  postFileProperties: (body: any) => Promise<any | undefined>;
  deleteFileProperties: (
    extensionIds: any,
    orgId: any
  ) => Promise<any | undefined>;
}

const useExtensionsStore = create<ExtenstionsState>((set) => ({
  extensionValue: "",
  setExtensionValue: (value) => set({ extensionValue: value }),

  extensionValueError: false,
  setExtensionValueError: (value) => set({ extensionValueError: value }),

  mimeTypeValue: "",
  setMimeTypeValue: (value) => set({ mimeTypeValue: value }),

  mimeTypeValueError: false,
  setMimeTypeValueError: (value) => set({ mimeTypeValueError: value }),

  extensions: [],
  setExtensions: (extensions) => set({ extensions }),

  mimeTypes: [],
  setMimeTypes: (mimeTypes) => set({ mimeTypes }),

  fileSize: "",
  setFileSize: (value) => set({ fileSize: value }),

  fileSizeError: false,
  setFileSizeError: (value) => set({ fileSizeError: value }),

  fileCount: "",
  setFileCount: (value) => set({ fileCount: value }),

  fileCountError: false,
  setFileCountError: (value) => set({ fileCountError: value }),

  getFileProperties: async (orgId: any) => {
    try {
      const response = await axiosInstance.get(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `settings/getFileProperties?orgId=${orgId}`
      );
      const data = response.data;

      set({
        extensions: data.extensions,
        mimeTypes: data.mimeTypes,
        fileSize: data.fileSize,
        fileCount: data.fileCount,
      });

      return data;
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  },

  postFileProperties: async (body: any) => {
    try {
      const response = await axiosInstance.post(
        env("NEXT_PUBLIC_BACKEND_URL") + "settings/fileProperties",
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

  deleteFileProperties: async (extensionIds: any, orgId: any) => {
    try {
      const response = await axiosInstance.delete(
        env("NEXT_PUBLIC_BACKEND_URL") +
          `settings/deleteFileProperties?deleteIds=${extensionIds}&orgId=${orgId}`
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

export default useExtensionsStore;
