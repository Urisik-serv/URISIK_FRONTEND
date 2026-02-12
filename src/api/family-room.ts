import type {
  GetFamilyRoomResponse,
  PostFamilyRoomRequest,
  PostFamilyRoomResponse,
} from "../types/family-room";

import { axiosInstance } from "./axios/axios";

// 가족방 생성
export const postFamilyRoom = async (
  request: PostFamilyRoomRequest,
): Promise<PostFamilyRoomResponse> => {
  const { data } = await axiosInstance.post<PostFamilyRoomResponse>(
    "/api/family-rooms",
    request,
  );

  return data;
};

// 가족방 조회
export const getFamilyRoom = async (): Promise<GetFamilyRoomResponse> => {
  const { data } = await axiosInstance.get<GetFamilyRoomResponse>(
    "/api/family-rooms/me",
  );
  return data;
};
