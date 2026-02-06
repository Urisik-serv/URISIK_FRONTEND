import type { CommonResponse } from "./common";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type MealType = "LUNCH" | "DINNER";

export type SlotRequest = {
  dayOfWeek: DayOfWeek;
  mealType: MealType;
};

export type CreateMealPlan = {
  weekStartDate: string;
  selectedSlots: SlotRequest[];
  regenerate: boolean;
};

export type MealPlanStatus = "DRAFT" | "CONFIRMED";

export type RecipeDTO = {
  id: number;
  title: string;
};
export type MealPlanSlots = Record<string, RecipeDTO>;

export type CreateMealPlanResDto = {
  mealPlanId: number;
  familyRoomId: number;
  weekStartDate: string;
  status: MealPlanStatus;
  slots: MealPlanSlots;
};

//주간 식단 생성 api response
export type ResponseCreateMealPlanDto = CommonResponse<CreateMealPlanResDto>;

export type SlotItem = RecipeDTO & SlotRequest;

/////////////////////////////////////////////
export interface TodayMeal {
  mealType: MealType;
  recipeId: number;
  transformedRecipeId: number;
  title: string;
  imageUrl: string;
  ingredients: string;
  instructions: string;
}
export interface TodayMealPlan {
  date: string;
  mealPlanId: number;
  weekStartDate: number;
  meals: TodayMeal[];
}

//오늘의 식단 생성 api response
export type ResponseTodayMealPlan = CommonResponse<TodayMealPlan>;
