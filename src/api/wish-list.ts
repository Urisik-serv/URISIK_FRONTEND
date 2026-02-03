import type { AxiosResponse } from "axios";
import type {
  DeleteFamilyWishList,
  ResponseFamilyWishLists,
} from "../types/wish-list";
import { axiosInstance } from "./axios/axios";
import type { CommonResponse } from "../types/common";

export const getFamilyWishList = async (
  familyRoomId: number,
  size: number,
  cursor: string | null,
): Promise<AxiosResponse<ResponseFamilyWishLists>> => {
  const res = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/family-wishlist`,
    {
      params: { size, cursor: cursor || undefined },
    },
  );

  return res;
};

export const deleteFamilyWishList = async (
  familyRoomId: number,
  DeleteFamilyWishList: DeleteFamilyWishList,
): Promise<CommonResponse<{}>> => {
  const { data } = await axiosInstance.delete(
    `/api/family-rooms/${familyRoomId}/family-wishlist/items`,
    { data: DeleteFamilyWishList },
  );

  return data;
};
