import type { BaseResponse } from "./response";

export interface Agree {
  serviceTermsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  familyInfoAgreed: boolean;
  aiNoticeAgreed: boolean;
  marketingOptIn: boolean;
}

export interface AlarmPolicy {
  alarmPolicy: "ALARM_AGREED" | "ALARM_DISAGREED";
}

export type AgreeResponse = BaseResponse<Agree>;
export type AlarmResponse = BaseResponse<AlarmPolicy>;
