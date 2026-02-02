import axios from "axios";
import type { FamilyProfile } from "../types/family-profile";
import type { PostProfileResponse } from "../types/response";
import { axiosInstance } from "./axios/axios";

// 프로필 조회
export const getFamilyList = async (): Promise<FamilyProfile> => {
  const { data } = await axios.get("/public/data/family-data.json");

  return data;
};

// 프로필 생성
export const postProfile = async (
  familyRoomId: number,
): Promise<PostProfileResponse> => {
  const { data } = await axiosInstance.post<PostProfileResponse>(
    `/api/family-rooms/${familyRoomId}/profiles`,
  );
  return data;
};
