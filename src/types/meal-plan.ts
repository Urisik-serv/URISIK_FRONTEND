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

export type ResponseCreateMealPlanDto = BaseResponse<CreateMealPlanResDto>;

export type ReadFamilyRoomContextResDto = {
  familyRoomId: number;
  familyPolicy: string;
  me: {
    memberId: number;
    familyRole: string;
    nickName: string;
  };
  capabilities: {
    leader: boolean;
    canEditWishlist: boolean;
    canCreateMealPlan: boolean;
    canEditMealPlan: boolean;
  };
  mealPlanCreated: boolean;
};

export type ResponseReadFamilyRoomContextDto =
  BaseResponse<ReadFamilyRoomContextResDto>;
