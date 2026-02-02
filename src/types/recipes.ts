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

export interface ResponseSearchRecipes {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    items: SearchRecipesItem[];
  };
  errorDetail: {};
}
