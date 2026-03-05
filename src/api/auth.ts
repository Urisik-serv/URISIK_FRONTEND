import axios from "axios";
import type { LogoutResponse, ReissueResponse } from "../types/auth";

export const postReissue = async (): Promise<ReissueResponse> => {
  const { data } = await axios.post<ReissueResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/reissue`,
  );
  return data;
};

export const postLogout = async (): Promise<LogoutResponse> => {
  const { data } = await axios.post<LogoutResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
  );
  return data;
};
