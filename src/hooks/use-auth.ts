import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
import { postReissue } from "../api/auth";

export const useAuth = () => {
  const { setItem: setAccessToken } = useLocalStorage("accessToken");

  const { mutate: LoginMutate, isPending: LoginIsPending } = useMutation({
    mutationFn: postReissue,
    onSuccess: (res) => {
      setAccessToken(res.result.accessToken);
      setTimeout(() => {
        window.location.href = res.result.needAgreement ? "/onboarding" : "/";
      }, 1000);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      window.location.href = "/login";
    },
  });

  return {
    LoginMutate,
    LoginIsPending,
  };
};
