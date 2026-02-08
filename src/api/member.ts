import type {
  Agree,
  AgreeResponse,
  AlarmPolicy,
  AlarmResponse,
} from "../types/member";
import { axiosInstance } from "./axios/axios";

// 약관동의 api 연결
export const patchAgree = async (request: Agree): Promise<Agree> => {
  const { data } = await axiosInstance.patch<AgreeResponse>(
    `/api/member/agree`,
    request,
  );
  return data.result;
};

// 알람 권한 수정 api 연결
export const patchAlarm = async (body: {
  alarmPolicy: "ALARM_AGREED" | "ALARM_DISAGREED";
}) => {
  const { data } = await axiosInstance.patch("/api/member/alarm", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.result;
};

// 알람 권한 조회 api 연결
export const getAlarm = async (): Promise<AlarmPolicy> => {
  const { data } = await axiosInstance.get<AlarmResponse>(`/api/member/alarm`);
  return data.result;
};
