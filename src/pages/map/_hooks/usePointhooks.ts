import { Api } from "@/api/Api";
import { AxiosResponse } from "axios";

export const usePointhooks = async () => {
  try {
    const response: AxiosResponse = await Api.get("/api/v1/places");
    return response.data;
  } catch (error) {
    throw error;
  }
};
