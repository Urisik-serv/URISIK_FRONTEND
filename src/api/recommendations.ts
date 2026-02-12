import type {
  ResponseRecommendPopular,
  ResponseRecommendSafe,
} from "../types/recipes";
import { axiosInstance } from "./axios/axios";

// 홈 안전 레시피 추천 API
export const getRecommendSafe = async (): Promise<ResponseRecommendSafe> => {
  const { data } = await axiosInstance.get(
    "/api/recommendations/home/safe-recipes",
  );

  return data;
};

// 홈 레시피 추천 (하단)
// 별점순
export const getRecommendScore = async (
  category?: string,
): Promise<ResponseRecommendPopular> => {
  const { data } = await axiosInstance.get(
    "/api/recommendations/home/high-score",
    {
      params: { category: category || undefined },
    },
  );

  return data;
};

// 안전한 레시피
export const getRecommendSafeScore = async (
  category?: string,
): Promise<ResponseRecommendPopular> => {
  const { data } = await axiosInstance.get(
    "/api/recommendations/home/safe-high-score",
    {
      params: { category: category || undefined },
    },
  );

  return data;
};

// 위시순
export const getRecommendWish = async (
  category?: string,
): Promise<ResponseRecommendPopular> => {
  const { data } = await axiosInstance.get("/api/recommendations/home/wish", {
    params: { category: category || undefined },
  });

  return data;
};
