import type { allergyCheck, GetAllergyResultsResponse } from "../types/allergy";
import { axiosInstance } from "./axios/axios";

// 알레르기 대체 식재료 조회
export const getAlternatives = async (
  request: allergyCheck,
): Promise<GetAllergyResultsResponse> => {
  const { data } = await axiosInstance.get<GetAllergyResultsResponse>(
    `/api/recipes/allergy-check`,
    {
      params: request,
    },
  );
  return data;
};
