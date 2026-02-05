import type { AxiosResponse } from "axios";
import type {
  FamilyWishListBody,
  ResponseAddWishLists,
  ResponseFamilyWishLists,
} from "../types/wish-list";
import { axiosInstance } from "./axios/axios";
import type { BaseResponse } from "../types/response";

// 가족 위시리스트 조회
export const getFamilyWishList = async (
  familyRoomId: number | null,
  size: number,
  cursor: string | null,
): Promise<AxiosResponse<ResponseFamilyWishLists>> => {
  const res = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/family-wishlist`,
    {
      params: { size, cursor: cursor || undefined },
    },
  );

  console.log(res.data);

  return res;
};

// 위시리스트 삭제
export const deleteFamilyWishList = async (
  familyRoomId: number | null,
  DeleteFamilyWishList: FamilyWishListBody,
): Promise<BaseResponse<{}>> => {
  const { data } = await axiosInstance.delete(
    `/api/family-rooms/${familyRoomId}/family-wishlist/items`,
    { data: DeleteFamilyWishList },
  );

  return data;
};

// 위시리스트 추가
export const postAddWishList = async (
  familyRoomId: number | null,
  addRecipes: FamilyWishListBody,
): Promise<ResponseAddWishLists> => {
  const { data } = await axiosInstance.post(
    `/api/family-rooms/${familyRoomId}/profile-wishes`,
    {
      addRecipes,
    },
  );

  console.log(data);

  return data;
};
