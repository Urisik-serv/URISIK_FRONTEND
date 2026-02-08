import type {
  CreateMealPlan,
  ResponseCreateMealPlanDto,
  ResponseTodayMealPlan,
} from "../types/meal-plan";
import { axiosInstance } from "./axios/axios";

//주간 식단 생성 api
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

//오늘의 식단 조회 api
export const getTodayMealPlan = async (
  familyRoomId: number,
): Promise<ResponseTodayMealPlan> => {
  const { data } = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/meal-plans/today`,
  );
  console.log(data);

  return data;
};
