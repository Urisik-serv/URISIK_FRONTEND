import axios from "axios";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { postLogout, postReissue } from "../auth";
import toast from "react-hot-toast";

const isDev = import.meta.env.DEV;
const BASE_URL = isDev ? "" : import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가한다
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 요청 설정을 반환
    return config;
  },
  // 요청 인터셉터가 실패하면, 에러 뿜음
  (error) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401에러 & 재시도 X
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const reissueRes = await postReissue();

        const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        setItem(reissueRes.result.accessToken);
        originalRequest.headers.Authorization = `Bearer ${reissueRes.result.accessToken}`;
        if (reissueRes.result.needAgreement) {
          // 약관동의 안 돼있을 경우 약관동의로 리다이렉트
          window.location.href = "/agreement";
          return Promise.reject(new Error("Agreement required"));
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰 만료
        toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");

        try {
          await postLogout();
        } catch (logoutError) {
          toast.error("로그아웃 API 호출 실패");
        } finally {
          localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);
