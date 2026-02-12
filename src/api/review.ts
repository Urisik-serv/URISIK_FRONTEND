import type {
  createReview,
  createTransformReview,
  ResponseCreateReviewDto,
} from "../types/review";
import { axiosInstance } from "./axios/axios";

//간단 후기 작성 api
export const postReview = async ({
  recipeId,
  score,
  isFavorite,
}: createReview): Promise<ResponseCreateReviewDto> => {
  const { data } = await axiosInstance.post(
    `/api/recipes/${recipeId}/reviews`,
    {
      score,
      isFavorite,
    },
  );

  return data;
};

//변형 레시피 간단 후기 작성 api
export const postTransformReview = async ({
  transformedRecipeId,
  score,
  isFavorite,
}: createTransformReview): Promise<ResponseCreateReviewDto> => {
  const { data } = await axiosInstance.post(
    `/api/transformed-recipes/${transformedRecipeId}/reviews`,
    {
      score,
      isFavorite,
    },
  );

  return data;
};
