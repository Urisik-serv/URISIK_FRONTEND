import type { BaseResponse } from "./response";

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

export type ReissueResponse = BaseResponse<AuthResult>;
export type LogoutResponse = BaseResponse<LogoutResult>;
