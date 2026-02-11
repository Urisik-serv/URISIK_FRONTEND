import { useState, useEffect, useCallback } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
const MAX_SIZE = 10; // 최대 저장 개수

export const useRecentSearch = () => {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY.recentSearch);
    if (stored) {
      try {
        setKeywords(JSON.parse(stored));
      } catch (e) {
        console.error("로컬 스토리지 파싱 에러", e);
        setKeywords([]);
      }
    }
  }, []);

  const addKeyword = useCallback((text: string) => {
    if (!text.trim()) return;

    setKeywords((prev) => {
      const newKeyword = text.trim();

      const nextKeywords = [
        newKeyword,
        ...prev.filter((k) => k !== newKeyword),
      ].slice(0, MAX_SIZE);

      localStorage.setItem(
        LOCAL_STORAGE_KEY.recentSearch,
        JSON.stringify(nextKeywords),
      );

      return nextKeywords;
    });
  }, []);

  const removeKeyword = useCallback((text: string) => {
    setKeywords((prev) => {
      const nextKeywords = prev.filter((k) => k !== text);
      localStorage.setItem(
        LOCAL_STORAGE_KEY.recentSearch,
        JSON.stringify(nextKeywords),
      );
      return nextKeywords;
    });
  }, []);

  const clearKeywords = useCallback(() => {
    setKeywords([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY.recentSearch);
  }, []);

  return {
    keywords,
    addKeyword,
    removeKeyword,
    clearKeywords,
  };
};
