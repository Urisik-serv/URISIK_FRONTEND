import type { BaseResponse, CursorBaseResponse } from "./response";

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

export interface FamilyWishListBody {
  recipeId: number[];
  transformedRecipeId: number[];
}

export type ResponseFamilyWishLists = BaseResponse<FamilyWishListResult[]>;
export type ResponseAddWishLists = BaseResponse<FamilyWishListBody>;

// ProfileWishlist
export interface ProfileTransWishItems {
  wishId: number;
  transformedRecipeId: number;
  transformedRecipeName: string;
  category: string;
  foodImage: string;
  avgScore: number;
  recipeIngredients: string[];
}

export interface ProfileWishItems {
  wishId: number;
  recipeId: number;
  recipeName: string;
  category: string;
  foodImage: string;
  avgScore: number;
  recipeIngredients: string[];
}

export type ResponseProfileWish = CursorBaseResponse<{
  items: ProfileWishItems[];
}>;
export type ResponseProfileTransWish = CursorBaseResponse<{
  items: ProfileTransWishItems[];
}>;
