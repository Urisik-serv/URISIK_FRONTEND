import type {
  CreateMealPlan,
  ResponseCreateMealPlanDto,
  ResponseReadFamilyRoomContextDto,
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

export const getFamilyRoom =
  async (): Promise<ResponseReadFamilyRoomContextDto> => {
    const { data } = await axiosInstance.get(`/api/family-rooms/me`);
    return data;
  };
