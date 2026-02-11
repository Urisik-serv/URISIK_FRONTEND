import type { RecommendSearch } from "../types/recipes";
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

export const getRecommendSearch = async (
  familyRoomId: number | null,
): Promise<BaseResponse<RecommendSearch>> => {
  const { data } = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/profile/recommend`,
  );

  return data;
};
