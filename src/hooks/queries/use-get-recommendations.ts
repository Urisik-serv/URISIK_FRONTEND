import { useQuery } from "@tanstack/react-query";
import {
  getRecommendSafe,
  getRecommendSafeScore,
  getRecommendScore,
  getRecommendWish,
} from "../../api/recommendations";
import { QUERY_KEY } from "../../constants/key";

export const useGetRecommendSafe = () => {
  return useQuery({
    queryFn: () => getRecommendSafe(),
    queryKey: [QUERY_KEY.safeRecipeTop],
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
export const useGetRecommendScore = (category?: string) => {
  return useQuery({
    queryFn: () => getRecommendScore(category),
    queryKey: [QUERY_KEY.highScore],
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
export const useGetRecommendSafeScore = (category?: string) => {
  return useQuery({
    queryFn: () => getRecommendSafeScore(category),
    queryKey: [QUERY_KEY.safeHighScore],
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
export const useGetRecommendWish = (category?: string) => {
  return useQuery({
    queryFn: () => getRecommendWish(category),
    queryKey: [QUERY_KEY.wishHighScore],
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
