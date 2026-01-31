import { useEffect } from "react";
import { postReissue } from "../../api/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import StartScreen from "./StartScreen";
import { useMutation } from "@tanstack/react-query";

export default function LoginRedirectPage() {
  const { setItem: setAccessToken } = useLocalStorage("accessToken");

  const { mutate, isPending } = useMutation({
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

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isPending) {
    return <StartScreen />;
  }
  return <StartScreen />;
}
