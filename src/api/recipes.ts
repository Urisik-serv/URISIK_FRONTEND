import type {
  ResponseDetailRecipe,
  ResponseExternalRecipes,
  ResponsePostTransRecipe,
  ResponseSearchRecipes,
  ResponseTransformedRecipe,
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

export const postExternalRecipes = async (
  external: SearchRecipesItem["external"],
): Promise<ResponseExternalRecipes> => {
  const { data } = await axiosInstance.post(
    "/api/recipes/external/import",
    external,
  );

  console.log("요청 성공: ", data);
  return data;
};

export const getDetailRecipe = async (
  recipeId: number,
): Promise<ResponseDetailRecipe> => {
  const { data } = await axiosInstance.get(`/api/recipes/${recipeId}`);

  return data;
};

export const getTransRecipe = async (
  transformedRecipeId: number,
): Promise<ResponseTransformedRecipe> => {
  const { data } = await axiosInstance.get(
    `/api/transformed-recipes/${transformedRecipeId}`,
  );

  return data;
};

export const postTransRecipe = async (
  recipeId: number,
): Promise<ResponsePostTransRecipe> => {
  const { data } = await axiosInstance.post(
    `/api/transformed-recipes/${recipeId}/transform`,
  );

  return data;
};
