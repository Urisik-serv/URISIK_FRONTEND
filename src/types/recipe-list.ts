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
