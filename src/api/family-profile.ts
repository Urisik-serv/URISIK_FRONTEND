import axios from "axios";
import type {
  FamilyProfile,
  postProfileRequest,
} from "../types/family-profile";
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
  request: postProfileRequest,
): Promise<PostProfileResponse> => {
  const { data } = await axiosInstance.post<PostProfileResponse>(
    `/api/family-rooms/${familyRoomId}/profiles`,
    request,
  );
  return data;
};

// 프로필 수정
export const patchProfile = async (
  familyRoomId: number,
  request: postProfileRequest,
): Promise<PostProfileResponse> => {
  const { data } = await axiosInstance.patch<PostProfileResponse>(
    `/api/family-rooms/${familyRoomId}/profiles`,
    request,
  );
  return data;
};
