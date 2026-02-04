import type { CommonResponse } from "./common";

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

export interface SearchRecipesDto {
  keyword: string;
  page?: number;
  size?: number;
}

export interface SearchRecipesItem {
  id: string;
  type: string;
  title: string;
  category: string;
  imageUrl: string;
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

export interface ResponseDetailRecipe {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
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
  };
  errorDetail: {};
}

// interface 사용시 extends
export interface ResponseSearchRecipes extends CommonResponse<SearchRecipesItems> {}

export interface ResponseExternalRecipes extends CommonResponse<ExternalRecipes> {}
