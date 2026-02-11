import { useEffect } from "react";

export default function KakaoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const loadKakaoSDK = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      }
    };

    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      script.onload = loadKakaoSDK;
      document.head.appendChild(script);
    } else {
      loadKakaoSDK();
    }
  }, []);

  return <>{children}</>;
}
