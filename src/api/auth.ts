import axios from "axios";
import type { ReissueResponse } from "../types/auth";

export const postReissue = async (): Promise<ReissueResponse> => {
  const { data } = await axios.post<ReissueResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/reissue`,
    {},
    { withCredentials: true },
  );
  return data;
};
