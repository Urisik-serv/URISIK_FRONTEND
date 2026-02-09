import type {
  CreateMealPlan,
  ResponseCreateMealPlanDto,
  ResponseThisWeekMealPlan,
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

//이번주 식단 조회 api
export const getWeekMealPlan = async ({
  familyRoomId,
  date,
}: {
  familyRoomId: number;
  date: string;
}): Promise<ResponseThisWeekMealPlan> => {
  const { data } = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/meal-plans/this-week`,
    { params: { date } },
  );
  return data;
};
