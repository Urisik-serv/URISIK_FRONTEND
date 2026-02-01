import type { ResponseNoticeDto } from "../types/notice-list";
import { axiosInstance } from "./axios/axios";

export const getNotificationList = async (
  size: number,
): Promise<ResponseNoticeDto> => {
  const { data } = await axiosInstance.get("/api/notifications", {
    params: { size: size },
  });

  console.log("📡 API 원본 응답:", data);

  return data;
};
