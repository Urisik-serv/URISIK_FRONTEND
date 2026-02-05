import type {
  ResponseDetailRecipe,
  ResponseExternalRecipes,
  ResponseRecommendSafe,
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

  console.log(data);

  return data;
};

export const postExteralRecipes = async (
  external: SearchRecipesItem,
): Promise<ResponseExternalRecipes> => {
  const { data } = await axiosInstance.post("/api/recipes/external", external);

  console.log("요청 성공: ", data);
  return data;
};

export const getDetailRecipe = async (
  recipeId: number,
): Promise<ResponseDetailRecipe> => {
  const { data } = await axiosInstance.get(`/api/recipes/${recipeId}`);

  return data;
};

// 홈 안전 레시피 추천 API
export const getRecommendSafe = async (): Promise<ResponseRecommendSafe> => {
  const { data } = await axiosInstance.get(
    "/api/home/recommendations/safe-recipes",
  );

  console.log("추천 데이터:", data);

  return data;
};
