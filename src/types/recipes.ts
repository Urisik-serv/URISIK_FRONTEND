import type { CommonResponse } from "./common";

export interface SearchRecipesDto {
  keyword: string;
  page?: number;
  size?: number;
}

export interface SearchRecipesItem {
  id: string;
  type: string;
  title: string;
  imageUrl: string;
  category: string;
  avgScore: number;
  reviewCount: number;
  external: {
    rcpSeq: string;
    rcpNm: string;
    category: string;
    servingWeight: string;
    calorie: string;
    carbohydrate: string;
    protein: string;
    fat: string;
    sodium: string;
    imageSmall: string;
    imageLarge: string;
    ingredientsRaw: string;
    instructionsRaw: string;
  };
}

export interface SearchRecipesItems {
  items: SearchRecipesItem[];
}

export interface ExternalRecipes {
  recipeId: number;
  created: boolean;
}

export interface DetailRecipeStep {
  order: number;
  description: string;
}

export interface DetailRecipe {
  recipeId: number;
  title: string;
  category: string;
  servingWeight: string;
  nutrition: {
    calorie: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    sodium: number;
  };
  images: {
    small: string;
    large: string;
  };
  ingredients: string[];
  steps: DetailRecipeStep[];
  sourceType: string;
  allergyWarning: {
    hasRisk: boolean;
    allergens: string[];
  };
  reviewCount: number;
  wishCount: number;
  avgScore: number;
}

export type ResponseDetailRecipe = CommonResponse<DetailRecipe>;

// interface 사용시 extends
export interface ResponseSearchRecipes extends CommonResponse<SearchRecipesItems> {}

export interface ResponseExternalRecipes extends CommonResponse<ExternalRecipes> {}

// 충돌 방지용 이전 mockdata type
export interface Recipe {
  id: number;
  title: string;
  category: string;
  tags: string[];
  shortDescription: string;
  rating: number;
  pickedCount: number;
  imageUrl: string;
  meta: {
    cookingTime: string;
    difficulty: {
      level: number;
      label: string;
    };
    tastePoint: string;
  };
  descriptions: string[];
  ingredients: string[];
  isWishlisted: boolean;
}
export interface FoodList {
  recipes: Recipe[];
}
