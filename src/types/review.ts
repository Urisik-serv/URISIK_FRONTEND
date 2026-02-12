import type { BaseResponse } from "./response";

export type createReview = {
  recipeId: number;
  score: number;
  isFavorite?: boolean;
};
export type review = {
  reviewId: number;
  avgScore: number;
  createdAt: string;
};
export type ResponseCreateReviewDto = BaseResponse<review>;

export type createTransformReview = {
  transformedRecipeId: number;
  score: number;
  isFavorite?: boolean;
};
