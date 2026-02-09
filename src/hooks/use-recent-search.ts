import { useState, useEffect } from "react";
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

  const addKeyword = (text: string) => {
    if (!text.trim()) return;

    const newKeyword = text.trim();

    const nextKeywords = [
      newKeyword,
      ...keywords.filter((k) => k !== newKeyword),
    ].slice(0, MAX_SIZE);

    setKeywords(nextKeywords);
    localStorage.setItem(
      LOCAL_STORAGE_KEY.recentSearch,
      JSON.stringify(nextKeywords),
    );
  };

  const removeKeyword = (text: string) => {
    const nextKeywords = keywords.filter((k) => k !== text);
    setKeywords(nextKeywords);
    localStorage.setItem(
      LOCAL_STORAGE_KEY.recentSearch,
      JSON.stringify(nextKeywords),
    );
  };

  const clearKeywords = () => {
    setKeywords([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY.recentSearch);
  };

  return {
    keywords,
    addKeyword,
    removeKeyword,
    clearKeywords,
  };
};
