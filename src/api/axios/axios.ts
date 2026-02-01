import axios from "axios";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    let accessToken = getItem();

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
