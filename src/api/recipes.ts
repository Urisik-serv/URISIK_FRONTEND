import type { ResponseSearchRecipes, SearchRecipesDto } from "../types/recipes";
import { axiosInstance } from "./axios/axios";

export const getSearchRecipes = async (
  SearchRecipesDto: SearchRecipesDto,
): Promise<ResponseSearchRecipes> => {
  const { data } = await axiosInstance.get("/api/recipes/search", {
    params: SearchRecipesDto,
  });

  return data;
};
