import type { BaseResponse } from "./response";

export type createReview = {
  recipeId: number;
  score: number;
  isFavorite?: boolean;
};
export type review = {
  reviewId: number;
  avgScore: number;
};
export type ResponseCreateReviewDto = BaseResponse<review>;
