import type { Agree, AgreeResponse } from "../types/member";
import { axiosInstance } from "./axios/axios";

// 약관동의 api 연결
export const patchAgree = async (request: Agree): Promise<Agree> => {
  const { data } = await axiosInstance.patch<AgreeResponse>(
    `/api/member/agree`,
    request,
  );
  return data.result;
};
