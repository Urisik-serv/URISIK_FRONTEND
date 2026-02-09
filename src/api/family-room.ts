import axios from "axios";
import { useLocalStorage } from "../hooks/use-local-storage";
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
  const { getItem: getAccessToken } = useLocalStorage("accessToken");
  const { data } = await axios.post<PostFamilyRoomResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/api/family-rooms`,
    request,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },
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
