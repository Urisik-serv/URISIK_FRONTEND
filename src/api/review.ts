import type { createReview, ResponseCreateReviewDto } from "../types/review";
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
