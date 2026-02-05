import type { BaseResponse } from "./response";

export interface FamilyWishListResult {
  recipeId: number;
  transformedRecipeId: number;
  recipeName: string;
  foodImageUrl: string;
  score: number;
  foodCategory: {
    code: string;
    label: string;
  };
  usableForMealPlan: boolean;
  sourceProfile: {
    profiles: WishListProfile[];
  };
}

interface WishListProfile {
  profileId: number;
  nickname: string;
}

export interface DeleteFamilyWishList {
  recipeId: number[];
  transformedRecipeId: number[];
}

export type ResponseFamilyWishLists = BaseResponse<FamilyWishListResult[]>;
