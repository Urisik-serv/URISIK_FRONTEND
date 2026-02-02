import type {
  ResponseExternalRecipes,
  ResponseSearchRecipes,
  SearchRecipesDto,
  SearchRecipesItem,
} from "../types/recipes";
import { axiosInstance } from "./axios/axios";

export const getSearchRecipes = async (
  SearchRecipesDto: SearchRecipesDto,
): Promise<ResponseSearchRecipes> => {
  const { data } = await axiosInstance.get("/api/recipes/search", {
    params: SearchRecipesDto,
  });

  return data;
};

export const postExteralRecipes = async (
  external: SearchRecipesItem,
): Promise<ResponseExternalRecipes> => {
  const { data } = await axiosInstance.post("/api/recipes/external", external);

  console.log("요청 성공: ", data);
  return data;
};
