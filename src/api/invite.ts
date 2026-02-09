import type {
  GetInviteResponse,
  GetInviteResult,
  InviteAcceptResponse,
  InviteAcceptResult,
  PostInviteResponse,
  TokenUrl,
} from "../types/invite";
import { axiosInstance } from "./axios/axios";

export const postInviteToken = async (
  familyRoomId: number,
): Promise<TokenUrl> => {
  const { data } = await axiosInstance.post<PostInviteResponse>(
    `/api/family-rooms/${familyRoomId}/invites`,
  );
  return data.result;
};

export const getInviteToken = async (
  token: string,
): Promise<GetInviteResult> => {
  const { data } = await axiosInstance.get<GetInviteResponse>(
    `/api/invites/${token}`,
  );
  return data.result;
};

export const postAcceptInvite = async (
  token: string,
): Promise<InviteAcceptResult> => {
  const { data } = await axiosInstance.post<InviteAcceptResponse>(
    `/api/invites/${token}/accept`,
  );
  return data.result;
};
