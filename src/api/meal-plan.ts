import type {
  CreateMealPlan,
  MonthResult,
  ResponseCreateMealPlanDto,
  ResponseEditMealPlanDto,
  ResponseMonthMealPlan,
  ResponseThisWeekMealPlan,
  ResponseTodayMealPlan,
  Updates,
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

  return data;
};

//주간 식단 수정 api
export const patchEditMealPlans = async ({
  familyRoomId,
  mealPlanId,
  updates,
}: {
  familyRoomId: number;
  mealPlanId: number;
  updates: Updates[];
}): Promise<ResponseEditMealPlanDto> => {
  const { data } = await axiosInstance.patch(
    `/api/family-rooms/${familyRoomId}/meal-plans/${mealPlanId}`,
    { updates },
  );
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
  familyRoomId: number | null,
): Promise<ResponseTodayMealPlan> => {
  const { data } = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/meal-plans/today`,
  );

  return data;
};

//이번주 식단 조회 api
export const getWeekMealPlan = async ({
  familyRoomId,
  date,
}: {
  familyRoomId: number | null;
  date: string;
}): Promise<ResponseThisWeekMealPlan> => {
  const { data } = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/meal-plans/this-week`,
    { params: { date } },
  );
  return data;
};

// 기간 별 식단 조회 api
export const getMonthMealPlan = async (
  familyRoomId: number,
  fromDate: string,
  toDate: string,
): Promise<MonthResult> => {
  const { data } = await axiosInstance.get<ResponseMonthMealPlan>(
    `/api/family-rooms/${familyRoomId}/meal-plans/history`,
    {
      params: {
        fromDate,
        toDate,
      },
    },
  );

  return data.result;
};
