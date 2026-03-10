import { useQuery } from "@tanstack/react-query";
import { getRecommendSearch } from "../../api/search";

const useGetRecommendSearch = (familyRoomId: number | null) => {
  return useQuery({
    queryFn: () => getRecommendSearch(familyRoomId),
    queryKey: ["recommendSearch"],

    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    select: (data) => data.result,

    enabled: !!familyRoomId,
  });
};

export default useGetRecommendSearch;
