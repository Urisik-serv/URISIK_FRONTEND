import type {
  ResponseIsRead,
  ResponseNotice,
  ResponseSSE,
} from "../types/notice-list";
import { axiosInstance } from "./axios/axios";

// 알림 목록 조회
export const getNotificationList = async (
  size: number,
): Promise<ResponseNotice> => {
  const { data } = await axiosInstance.get<ResponseNotice>(
    "/api/notifications",
    {
      params: { size: size },
    },
  );

  return data;
};

// 알림용 SSE 연결
export const getSSE = async (): Promise<ResponseSSE> => {
  const { data } = await axiosInstance.get<ResponseSSE>(
    "/api/notifications/subscribe",
  );
  return data;
};

// 알림 읽음 처리
export const patchIsRead = async (
  notificationId: number,
): Promise<ResponseIsRead> => {
  const { data } = await axiosInstance.patch<ResponseIsRead>(
    `/api/notifications/${notificationId}/read`,
  );
  return data;
};
