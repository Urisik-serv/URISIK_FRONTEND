import type { BaseResponse } from "./response";

export interface Agree {
  serviceTermsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  familyInfoAgreed: boolean;
  aiNoticeAgreed: boolean;
  marketingOptIn: boolean;
}

export type AgreeResponse = BaseResponse<Agree>;
