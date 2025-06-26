import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { env } from "next-runtime-env";
import decryptValues from "./decryptValue";
import getSession from "./getSession";

const axiosInstance = axios.create({
  baseURL: env("NEXT_PUBLIC_BACKEND_URL"),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const isSessionValid = await getSession();

    if (!isSessionValid) {
      console.warn("Session invalid, redirecting to login...");
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject({ message: "Session expired" });
    }

    const userData = await decryptValues(["token"]);
    if (userData?.token && config.headers) {
      config.headers["Authorization"] = `Bearer ${userData.token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized — session expired.");
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
