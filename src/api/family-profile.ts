import type {
  DeleteProfileResponse,
  GetProfileResponse,
  GetProfilesResponse,
  postProfileRequest,
  PostProfileResponse,
  Profile,
} from "../types/family-profile";
import { axiosInstance } from "./axios/axios";

// 프로필 조회
export const getProfile = async (
  familyRoomId: number,
  profileId: number,
): Promise<Profile> => {
  const { data } = await axiosInstance.get<GetProfileResponse>(
    `/api/family-rooms/${familyRoomId}/profiles/${profileId}`,
  );
  return data.result;
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

// 가족방 전체 프로필 조회
export const getProfiles = async (
  familyRoomId: number,
): Promise<GetProfilesResponse> => {
  const { data } = await axiosInstance.get<GetProfilesResponse>(
    `/api/family-rooms/${familyRoomId}/all-profiles`,
  );
  return data;
};

// 가족원(프로필) 삭제
export const deleteProfile = async (
  familyRoomId: number,
  profileId: number,
): Promise<DeleteProfileResponse> => {
  const { data } = await axiosInstance.delete<DeleteProfileResponse>(
    `/api/family-rooms/${familyRoomId}/profiles/${profileId}`,
  );
  return data;
};
