import axios, { AxiosInstance } from "axios";

export const Api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});
