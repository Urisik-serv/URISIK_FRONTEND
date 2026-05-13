import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
import { postLogout, postReissue } from "../api/auth";
import toast from "react-hot-toast";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { setItem: setAccessToken, removeItem: removeAccessToken } =
    useLocalStorage("accessToken");

  const { mutate: LoginMutate, isPending: LoginIsPending } = useMutation({
    mutationFn: postReissue,
    onSuccess: (res) => {
      setAccessToken(res.result.accessToken);
      sessionStorage.setItem("showHomeModal", "true");
      setTimeout(() => {
        window.location.href = res.result.needAgreement ? "/onboarding" : "/";
      }, 1000);
    },
    onError: () => {
      toast.error("로그인 실패");
      window.location.href = "/login";
    },
  });

  const { mutate: LogoutMutate, isPending: LogoutIsPending } = useMutation({
    mutationFn: postLogout,
    onSuccess: (res) => {
      removeAccessToken();
      queryClient.clear();
      window.location.href = res.isSuccess ? "/login" : "/mypage";
    },
    onError: () => {
      toast.error("로그아웃 실패");
      window.location.href = "/mypage";
    },
  });

  return {
    LoginMutate,
    LoginIsPending,
    LogoutMutate,
    LogoutIsPending,
  };
};
