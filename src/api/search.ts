import type { BaseResponse } from "../types/response";
import { axiosInstance } from "./axios/axios";

export const postPopularSearch = async () => {
  const { data } = await axiosInstance.post(
    "/api/search/admin/search/popular/batch",
  );

  return data;
};

export const getPopularSearch = async (): Promise<BaseResponse<string[]>> => {
  const { data } = await axiosInstance.get("/api/search/popular");

  return data;
};
