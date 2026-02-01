import { useEffect } from "react";
import StartScreen from "./StartScreen";
import { useAuth } from "../../hooks/use-auth";

export default function LoginRedirectPage() {
  const { LoginMutate, LoginIsPending } = useAuth();

  useEffect(() => {
    LoginMutate();
  }, [LoginMutate]);

  if (LoginIsPending) {
    return <StartScreen />;
  }
  return <StartScreen />;
}
