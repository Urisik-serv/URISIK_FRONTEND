import { useQuery } from "@tanstack/react-query";
import { getRecommendSafe } from "../../api/recommendations";
import { queryFactory } from "./query-factory";

const useGetRecommendSafe = () => {
  return useQuery({
    queryFn: () => getRecommendSafe(),
    queryKey: queryFactory.recommend.allergySafe(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    select: (data) => data.result,
  });
};

export default useGetRecommendSafe;
