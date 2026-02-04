import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchRecipes } from "../../api/recipes";
import { QUERY_KEY } from "../../constants/key";

function useGetSearchRecipes(keyword: string, page?: number, size?: number) {
  const isRealSearch = keyword.trim() !== "";

  return useQuery({
    queryFn: () => getSearchRecipes({ keyword, page, size }),
    queryKey: [QUERY_KEY.search, keyword],
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    placeholderData: keepPreviousData,
    enabled: isRealSearch,
  });
}

export default useGetSearchRecipes;
