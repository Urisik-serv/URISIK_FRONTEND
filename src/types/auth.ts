// ---------- 로그인 -----------
export interface ReissueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: AuthResult;
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

// ---------- 로그아웃 -----------
export interface LogoutResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: LogoutResult;
  errorDetail: any;
}

export interface LogoutResult {
  logoutSuccess: boolean;
  deleteSuccess: boolean;
}
