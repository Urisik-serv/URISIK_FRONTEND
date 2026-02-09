import { useQuery } from "@tanstack/react-query";
import { getRecommendSafe } from "../../api/recommendations";
import { QUERY_KEY } from "../../constants/key";

const useGetRecommendSafe = () => {
  return useQuery({
    queryFn: () => getRecommendSafe(),
    queryKey: [QUERY_KEY.safeRecipeTop],
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    select: (data) => data.result,
  });
};

export default useGetRecommendSafe;
