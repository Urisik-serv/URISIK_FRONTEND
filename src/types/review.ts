import type { CommonResponse } from "./common";

export type createReview = {
  recipeId: number;
  score: number;
  isFavorite?: boolean;
};
export type review = {
  reviewId: number;
  avgScore: number;
};
export type ResponseCreateReviewDto = CommonResponse<review>;
