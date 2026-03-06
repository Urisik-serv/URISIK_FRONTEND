import type { LogoutResponse, ReissueResponse } from "../types/auth";
import { axiosInstance } from "./axios/axios";

export const postReissue = async (): Promise<ReissueResponse> => {
  const { data } =
    await axiosInstance.post<ReissueResponse>("/api/auth/reissue");
  return data;
};

export const postLogout = async (): Promise<LogoutResponse> => {
  const { data } = await axiosInstance.post<LogoutResponse>("/api/auth/logout");
  return data;
};
