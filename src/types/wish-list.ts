import type { BaseResponse, CursorBaseResponse } from "./response";

export interface FamilyWishListResult {
  type: "RECIPE" | "TRANSFORMED_RECIPE";
  id: number;
  title: string;
  imageUrl: string;
  avgScore: number;
  allergyStatus: string;
  category: {
    code: string;
    label: string;
  };
  ingredientsRaw: string;
  sourceProfile: {
    profiles: WishListProfile[];
  };
}

export interface WishListProfile {
  profileId: number;
  nickname: string;
  profilePicUrl: string;
}

export interface FamilyWishListBody {
  items: [
    {
      type: "RECIPE" | "TRANSFORMED_RECIPE";
      id: number;
    },
  ];
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
  foodSafety: string;
}

export interface ProfileWishItems {
  wishId: number;
  recipeId: number;
  recipeName: string;
  category: string;
  foodImage: string;
  avgScore: number;
  recipeIngredients: string[];
  foodSafety: string;
}

export interface ProfileWishListBody {
  recipeId: number[];
  transformedRecipeId: number[];
}

export type ResponseProfileWish = CursorBaseResponse<{
  items: ProfileWishItems[];
}>;
export type ResponseProfileTransWish = CursorBaseResponse<{
  items: ProfileTransWishItems[];
}>;
