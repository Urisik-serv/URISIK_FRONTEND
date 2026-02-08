import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
import { postLogout, postReissue } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { setItem: setAccessToken, removeItem: removeAccessToken } =
    useLocalStorage("accessToken");
  const navigate = useNavigate();
  const redirect = localStorage.getItem("loginRedirect");

  const { mutate: LoginMutate, isPending: LoginIsPending } = useMutation({
    mutationFn: postReissue,
    onSuccess: (res) => {
      setAccessToken(res.result.accessToken);
      setTimeout(() => {
        if (redirect) {
          localStorage.removeItem("loginRedirect");
          navigate(redirect, { replace: true });
          return;
        } else {
          window.location.href = res.result.needAgreement ? "/onboarding" : "/";
        }
      }, 1000);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      window.location.href = "/login";
    },
  });

  const { mutate: LogoutMutate, isPending: LogoutIsPending } = useMutation({
    mutationFn: postLogout,
    onSuccess: (res) => {
      removeAccessToken();
      window.location.href = res.isSuccess ? "/login" : "/mypage";
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
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
