import type { BaseResponse } from "./response";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type MealType = "LUNCH" | "DINNER";
export type Type = "RECIPE" | "TRANSFORMED_RECIPE";

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
export type ResponseCreateMealPlanDto = BaseResponse<CreateMealPlanResDto>;

export type SlotItem = RecipeDTO & SlotRequest;

export interface RecipeStep {
  stepOrder: number;
  description: string;
  imageUrl: string;
}

export type confirmMealPlan = {
  mealPlanId: number;
  status: "DRAFT" | "CONFIRMED";
  weekStartDate: string;
  mealPlanGenerationCount: number;
};
export type ResponseConfirmMealPlanDto = BaseResponse<confirmMealPlan>;

export interface TodayMeal {
  mealType: MealType;
  type: "RECIPE" | "TRANSFORMED_RECIPE";
  id: number;
  title: string;
  imageUrl: string;
  ingredients: string;
  recipeSteps: RecipeStep[];
}
export interface TodayMealPlan {
  date: string;
  mealPlanId: number;
  weekStartDate: number;
  meals: TodayMeal[];
}

/////////////////////////////////////////////
export interface MonthResult {
  fromDate: string;
  toDate: string;
  weeks: Week[];
}

export interface Week {
  mealPlanId: number;
  weekStartDate: string;
  days: Day[];
}

export interface Day {
  dayOfWeek: DayOfWeek;
  meals: MonthMeal[];
}

export interface MonthMeal {
  mealType: MealType;
  type: Type;
  id: number;
  title: string;
  imageUrl: string;
  ingredients: string;
}

// 이번달 식단 생성 api response
export type ResponseMonthMealPlan = BaseResponse<MonthResult>;

//오늘의 식단 생성 api response
export type ResponseTodayMealPlan = BaseResponse<TodayMealPlan>;

export interface ThisWeekMealPlan {
  mealPlanId: number;
  weekStartDate: string;
  slots: MealPlanSlots;
}
export type ResponseThisWeekMealPlan = BaseResponse<ThisWeekMealPlan>;
