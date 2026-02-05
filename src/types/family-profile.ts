import type { BaseResponse } from "./response";

interface Allergy {
  id: string;
  name: string;
  icon: string;
  alternativeIngredients: string[];
}

export interface WishList {
  id: number;
  name: string;
  FoodImageUrl: string;
  category: string;
  tags: string[];
  rating: number;
}

export interface FamilyProfile {
  id: number;
  name: string;
  role: string;
  preferences: {
    likedFood: string[];
  };
  allergies: Allergy[];
  wishList: WishList[];
}

export interface FamilyMembers {
  familyMembers: FamilyProfile[];
}

export interface postProfileRequest {
  nickname: string;
  role: string;
  likedIngredients?: string;
  dislikedIngredients?: string;
  allergy: string[];
  dietPreferences: string[];
}

export interface ProfileCreateResult {
  inviteUrl: string;
}

export interface Profile {
  isSuccess: boolean;
  nickname: string;
  role: string;
  likedIngredients?: string;
  dislikedIngredients?: string;
  allergy: string[];
  dietPreferences: string[];
}

export type FamilyDetails = FamilyDetail[];

export interface FamilyDetail {
  profileId: number;
  nickname: string;
  role: string;
  profilePicUrl: string;
}

export type PostProfileResponse = BaseResponse<ProfileCreateResult>;
export type GetProfileResponse = BaseResponse<Profile>;
export type GetProfilesResponse = BaseResponse<FamilyDetails>;
