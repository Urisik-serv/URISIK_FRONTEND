import type { AxiosResponse } from "axios";
import type {
  FamilyWishListBody,
  ResponseAddWishLists,
  ResponseFamilyWishLists,
  ResponseProfileTransWish,
  ResponseProfileWish,
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

// 프로필 위시리스트 조회
export const getProfileWishList = async (
  familyRoomId: number | null,
  profileId: number,
  size: number,
  cursor: number,
): Promise<ResponseProfileWish> => {
  const { data } = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/profile-wishes/${profileId}`,
    {
      params: { size, cursor },
    },
  );

  console.log("프로필 위시리스트 조회 성공: ", data);

  return data;
};

// 프로필 변형레시피 위시리스트 조회
export const getProfileTransWishList = async (
  familyRoomId: number | null,
  profileId: number,
  size: number,
  cursor: number,
): Promise<ResponseProfileTransWish> => {
  const { data } = await axiosInstance.get(
    `/api/family-rooms/${familyRoomId}/profile-wishes/${profileId}`,
    {
      params: { size, cursor },
    },
  );

  console.log("프로필 변형 레시피 위시리스트 조회 성공: ", data);

  return data;
};

// 프로필 위시리스트 삭제
export const deleteProfileWishList = async (
  familyRoomId: number | null,
  DeleteProfileWishList: FamilyWishListBody,
): Promise<ResponseAddWishLists> => {
  const { data } = await axiosInstance.delete(
    `/api/family-rooms/${familyRoomId}/profile-wishes`,
    { data: DeleteProfileWishList },
  );

  return data;
};

// 가족 위시리스트 삭제
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
