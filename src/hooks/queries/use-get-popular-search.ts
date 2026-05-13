import { useQuery } from "@tanstack/react-query";
import { getPopularSearch } from "../../api/search";

const useGetPopularSearch = () => {
  return useQuery({
    queryFn: () => getPopularSearch(),
    queryKey: ["popularSearch"],
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,

    select: (data) => data.result,
  });
};

export default useGetPopularSearch;
