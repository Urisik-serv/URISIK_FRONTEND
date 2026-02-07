import { useEffect, useRef, useState } from "react";
import { useProfileStore } from "../stores/use-profile-store";
import type { postProfileRequest } from "../types/family-profile";
import { useFamilyStore } from "../stores/use-family-store";
import {
  allergyMap,
  preferenceMap,
  roleMap,
} from "../constants/profile-record";

export const useFamilyProfileForm = () => {
  const { savedFormData, setSavedFormData } = useProfileStore();
  const [formData, setFormData] = useState(savedFormData);

  const hasSynced = useRef(false);

  useEffect(() => {
    if (hasSynced.current) return;
    setFormData(savedFormData);
    hasSynced.current = true;
  }, [savedFormData]);

  // 닉네임 핸들러
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nickname: e.target.value });
    setSavedFormData({ ...formData, nickname: e.target.value });
  };

  // 역할 핸들러
  const selectedRole = savedFormData.role;
  const handleRoleChange = (role: string) => {
    setSavedFormData((prev) => ({
      ...prev,
      role: prev.role === role ? "" : role,
    }));
  };

  // 알레르기 핸들러
  const handleAllergyChange = (allergies: string[] | boolean) => {
    setFormData((prev) => ({
      ...prev,
      allergies,
    }));
  };

  // 식단 선호도 핸들러
  const [isCheckedPreference, setIsCheckedPreference] = useState(() => {
    const foods = ["한식", "중식", "일식", "양식", "디저트"];
    return foods.map((food: string) =>
      savedFormData.preferences.includes(food),
    );
  });
  const handlePreferencesChange = (foods: string[], index: number) => {
    if (formData.preferences.includes(foods[index])) {
      let newPreferences = formData.preferences.filter(
        (item) => item !== foods[index],
      );
      setIsCheckedPreference((prev) => {
        const newChecked = [...prev];
        newChecked[index] = false;
        return newChecked;
      });
      setFormData({ ...formData, preferences: newPreferences });
    } else {
      setFormData({
        ...formData,
        preferences: [...formData.preferences, foods[index]],
      });
      setIsCheckedPreference((prev) => {
        const newChecked = [...prev];
        newChecked[index] = true;
        return newChecked;
      });
    }
  };

  // 좋아하는 식재료 핸들러
  const handleLikeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, likedIngredients: e.target.value });
    setSavedFormData({ ...formData, likedIngredients: e.target.value });
  };

  // 싫어하는 식재료 핸들러
  const handleDislikeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, dislikedIngredients: e.target.value });
    setSavedFormData({ ...formData, dislikedIngredients: e.target.value });
  };

  // 폼 유효성 검사
  const isValid = () => {
    return (
      formData.nickname.length > 0 &&
      formData.role.length > 0 &&
      (typeof formData.allergies === "boolean"
        ? formData.allergies === false
        : formData.allergies.length > 0) &&
      formData.preferences.length > 0
    );
  };

  // 영문으로 변환
  let allergyList: string[];
  if (Array.isArray(formData.allergies)) {
    allergyList = formData.allergies.map((item) => allergyMap[item]);
  } else {
    allergyList = ["NONE"];
  }

  const preferencesList = formData.preferences.map(
    (item) => preferenceMap[item],
  );

  const request: postProfileRequest = {
    nickname: formData.nickname,
    role: roleMap[formData.role],
    likedIngredients: formData.likedIngredients,
    dislikedIngredients: formData.dislikedIngredients,
    allergy: Array.isArray(allergyList) ? allergyList : [],
    dietPreferences: preferencesList,
  };

  const currentFamilyRoomId = useFamilyStore.getState().familyRoomId;

  return {
    formData,
    handleNickNameChange,
    handleRoleChange,
    handleAllergyChange,
    handlePreferencesChange,
    selectedRole,
    isCheckedPreference,
    handleLikeChange,
    handleDislikeChange,
    isValid,
    request,
    currentFamilyRoomId,
    setSavedFormData,
  };
};
