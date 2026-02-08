import type {
  ResponseRecommendPopular,
  ResponseRecommendSafe,
} from "../types/recipes";
import { axiosInstance } from "./axios/axios";

// 홈 안전 레시피 추천 API
export const getRecommendSafe = async (): Promise<ResponseRecommendSafe> => {
  const { data } = await axiosInstance.get(
    "/api/home/recommendations/safe-recipes-top",
  );

  console.log("추천 데이터:", data);

  return data;
};

// 홈 레시피 추천 (하단)
// 별점순
export const getRecommendScore = async (
  category?: string,
): Promise<ResponseRecommendPopular> => {
  const { data } = await axiosInstance.get("/api/home/high-score", {
    params: category,
  });

  console.log("하단 추천 데이터: ", data);

  return data;
};

// 안전한 레시피
export const getRecommendSafeScore = async (
  category?: string,
): Promise<ResponseRecommendPopular> => {
  const { data } = await axiosInstance.get("/api/home/safe-high-score", {
    params: category,
  });

  console.log("하단 추천 데이터: ", data);

  return data;
};

// 위시순
export const getRecommendWish = async (
  category?: string,
): Promise<ResponseRecommendPopular> => {
  const { data } = await axiosInstance.get("/api/home/wish-high-score", {
    params: category,
  });

  console.log("하단 추천 데이터: ", data);

  return data;
};
