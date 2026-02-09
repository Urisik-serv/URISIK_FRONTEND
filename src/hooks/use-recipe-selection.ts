import { useState, useMemo, useCallback } from "react";
import type {
  FamilyWishListBody,
  ProfileWishListBody,
} from "../types/wish-list";

export const useRecipeSelection = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const getUniqueKey = useCallback(
    (recipeId: number | null, transformedRecipeId: number | null) => {
      return recipeId
        ? `recipe_${recipeId}`
        : `transformed_${transformedRecipeId}`;
    },
    [],
  );

  const toggleSelection = useCallback((uniqueKey: string) => {
    setSelectedKeys((prev) => {
      if (prev.includes(uniqueKey)) {
        return prev.filter((key) => key !== uniqueKey);
      } else {
        return [...prev, uniqueKey];
      }
    });
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedKeys([]);
  }, []);

  const selectedProfilePayload = useMemo<ProfileWishListBody>(() => {
    const payload: ProfileWishListBody = {
      recipeId: [],
      transformedRecipeId: [],
    };

    selectedKeys.forEach((key) => {
      const [type, idStr] = key.split("_");
      const id = Number(idStr);

      if (type === "recipe") {
        payload.recipeId.push(id);
      } else {
        payload.transformedRecipeId.push(id);
      }
    });

    return payload;
  }, [selectedKeys]);

  const selectedFamilyPayload = useMemo<FamilyWishListBody>(() => {
    const items = selectedKeys.map((key) => {
      const [prefix, idStr] = key.split("_");
      const id = Number(idStr);

      const type = prefix === "recipe" ? "RECIPE" : "TRANSFORMED_RECIPE";

      return {
        type,
        id,
      };
    });

    return { items } as FamilyWishListBody;
  }, [selectedKeys]);

  return {
    selectedKeys, // 현재 선택된 키 배열
    selectedProfilePayload, // API 전송용 profile 객체
    selectedFamilyPayload, // API 전송용 family 객체
    getUniqueKey, // 키 생성 헬퍼
    toggleSelection, // 선택/해제 함수
    resetSelection, // 전체 해제
    isSelected: (key: string) => selectedKeys.includes(key), // 선택 여부 확인 헬퍼
  };
};
