import type { BaseResponse } from "./response";

export interface TokenUrl {
  inviteUrl: string;
}

export interface GetInviteResult {
  familyRoomId: number;
  inviterName: string;
  expiresAt: string;
  expired: boolean;
}

export interface InviteAcceptResult {
  familyRoomId: number;
}

export type PostInviteResponse = BaseResponse<TokenUrl>;
export type GetInviteResponse = BaseResponse<GetInviteResult>;
export type InviteAcceptResponse = BaseResponse<InviteAcceptResult>;
