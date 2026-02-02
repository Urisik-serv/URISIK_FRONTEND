import axios from "axios";
import { useLocalStorage } from "../hooks/use-local-storage";
import type { PostFamilyRoomRequest } from "../types/family-room";
import type { PostFamilyRoomResponse } from "../types/response";

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
