import { useQuery } from "@tanstack/react-query";
import {
  getRecommendSafeScore,
  getRecommendScore,
  getRecommendWish,
} from "../../api/recommendations";
import { queryFactory } from "./query-factory";

const getQueryConfig = (sortType: string, category: string|undefined) => {
  switch (sortType) {
    case "안전한 순":
      return {
        queryKey: queryFactory.recommend.recommendSafeHigh(category),
        queryFn: () => getRecommendSafeScore(category),
      };
    case "찜 많은 순":
      return {
        queryKey: queryFactory.recommend.recommendWishHigh(category),
        queryFn: () => getRecommendWish(category),
      };
    case "별점 순":
    default:
      return {
        queryKey: queryFactory.recommend.recommendSafeTop(category),
        queryFn: () => getRecommendScore(category),
      };
  }
};

export const useGetRecommendList = (sortType: string, category: string|undefined) => {
  const { queryKey, queryFn } = getQueryConfig(sortType, category);

  return useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    select: (data) => data.result,
  });
};
