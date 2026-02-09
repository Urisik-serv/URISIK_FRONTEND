import type { BaseResponse } from "./response";

export interface PostFamilyRoomRequest {
  familySize: number;
  familyComposition: FamilyComposition;
  familyPolicy: string;
}

export interface FamilyComposition {
  hasMother: boolean;
  hasFather: boolean;
  sonCount: number;
  daughterCount: number;
}

export interface FamilyRoomResult {
  familyRoomId: number;
}

export interface GetFamilyRoomResult {
  familyRoomId: number;
  familyPolicy: string;
  me: Me;
  capabilities: Capability;
  mealPlanCreated: boolean;
}

export interface Me {
  memberId: number;
  familyRole: string;
  nickName: string;
}

export interface Capability {
  leader: boolean;
  canEditWishlist: boolean;
  canCreateMealPlan: boolean;
  canEditMealPlan: boolean;
}

export type PostFamilyRoomResponse = BaseResponse<FamilyRoomResult>;
export type GetFamilyRoomResponse = BaseResponse<GetFamilyRoomResult>;
