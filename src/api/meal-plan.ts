import type {
  CreateMealPlan,
  ResponseCreateMealPlanDto,
} from "../types/meal-plan";
import { axiosInstance } from "./axios/axios";

export const postCreateMealPlans = async ({
  familyRoomId,
  createMeal,
}: {
  familyRoomId: number;
  createMeal: CreateMealPlan;
}): Promise<ResponseCreateMealPlanDto> => {
  const { data } = await axiosInstance.post(
    `/api/family-rooms/${familyRoomId}/meal-plans`,
    createMeal,
  );

  console.log("식단 생성 api", data);

  return data;
};

//주간 식단 확정 api
export const postConfirmMealPlan = async ({
  familyRoomId,
  mealPlanId,
}: {
  familyRoomId: number;
  mealPlanId: number;
}): Promise<ResponseCreateMealPlanDto> => {
  const { data } = await axiosInstance.post(
    `/api/family-rooms/${familyRoomId}/meal-plans/${mealPlanId}/confirm`,
  );
  return data;
};
