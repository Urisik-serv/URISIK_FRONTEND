import type { BaseResponse } from "./response";

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
  wishCount: number;
  description: string;
  safe: boolean;
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
    steps: DetailRecipe[];
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
  imageUrl: string;
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

export interface TransformedRecipe {
  transformedRecipeId: number;
  title: string;
  baseRecipeId: number;
  ingredients: string[];
  steps: DetailRecipeStep[];
  substitutionSummary: [
    {
      allergen: string;
      replacedWith: string;
      reason: string;
    },
  ];
  allergyWarning: {
    hasRisk: boolean;
    allergens: string[];
  };
  reviewCount: number;
  avgScore: number;
  wishCount: number;
}

export interface PostTransformedRecipe {
  transformedRecipeId: number;
  title: string;
  baseRecipeId: number;
  ingredients: string[];
  steps: [
    {
      order: number;
      description: string;
    },
  ];
  substitutionSummary: [
    {
      allergen: string;
      replacedWith: string;
      reason: string;
    },
  ];
}

export type ResponseDetailRecipe = BaseResponse<DetailRecipe>;
export type ResponseTransformedRecipe = BaseResponse<TransformedRecipe>;
export type ResponsePostTransRecipe = BaseResponse<PostTransformedRecipe>;

// interface 사용시 extends
export interface ResponseSearchRecipes extends BaseResponse<SearchRecipesItems> {}

export interface ResponseExternalRecipes extends BaseResponse<ExternalRecipes> {}

// 추천 레시피 response
export interface SafeRecipe {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  avgScore: number;
  reviewCount: number;
  wishCount: number;
  transformed: boolean;
  safe: boolean;
}

//홈 화면 추천 레시피(상단)
export interface RecommendSafeRecipes {
  recipes: SafeRecipe[];
}

export type ResponseRecommendSafe = BaseResponse<RecommendSafeRecipes>;

// 홈 화면 추천 레시피 (하단)
export interface RecommendPopularRecipes {
  recipes: [
    {
      id: string;
      title: string;
      imageUrl: string;
      category: string;
      avgScore: number;
      reviewCount: number;
      wishCount: number;
      safe: boolean;
      description: string;
      transformed: boolean;
    },
  ];
}

export type ResponseRecommendPopular = BaseResponse<RecommendPopularRecipes>;

// 리뷰 기반 추천 레시피 검색어
export interface RecommendSearch {
  recipeName: string[];
}

export interface PopularKeyword {
  keyword: string;
  rank: number;
  change: "UP" | "DOWN" | "SAME";
}
export interface PopularSearches {
  windowStart: string;
  windowEnd: string;
  keywords: PopularKeyword[];
}

export type ResponsePopularSearch = BaseResponse<PopularSearches>;
