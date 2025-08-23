import axios, { AxiosInstance } from "axios";

let apiLanguage: "ko" | "en" | "zh" = "en";

export const Api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers["Accept-Language"] = apiLanguage;
  return config;
});

// LanguageProvider에서 호출할 setter
export const setApiLanguage = (lang: "ko" | "en" | "zh") => {
  apiLanguage = lang;
};
