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

export interface FamilyRoomResult {
  familyRoomId: number;
}

export type ReissueResponse = BaseResponse<AuthResult>;
export type PostFamilyRoomResponse = BaseResponse<FamilyRoomResult>;
