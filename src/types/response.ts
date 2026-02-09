export interface BaseResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
  errorDetail: any;
}

export interface AuthResult {
  accessToken: string;
  needAgreement: boolean;
  serviceTermsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  familyInfoAgreed: boolean;
  aiNoticeAgreed: boolean;
  marketingOptIn: boolean;
}

export interface LogoutResult {
  logoutSuccess: boolean;
  deleteSuccess: boolean;
}
export interface FamilyRoomResult {
  familyRoomId: number;
}

export interface ProfileCreateResult {
  inviteUrl: string;
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

export type ReissueResponse = BaseResponse<AuthResult>;
export type LogoutResponse = BaseResponse<LogoutResult>;
export type PostFamilyRoomResponse = BaseResponse<FamilyRoomResult>;
export type PostProfileResponse = BaseResponse<ProfileCreateResult>;
export type GetFamilyRoomResponse = BaseResponse<GetFamilyRoomResult>;

export type CursorBaseResponse<T> = BaseResponse<
  T & {
    nextCursor: number | null;
    hasNext: boolean;
  }
>;
