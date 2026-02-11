import { useEffect, useRef, useState } from "react";
import { useProfileStore } from "../stores/use-profile-store";
import type { postProfileRequest } from "../types/family-profile";
import { useFamilyStore } from "../stores/use-family-store";
import {
  allergyMap,
  preferenceMap,
  roleMap,
  rolePicture,
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

  // 닉네임
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, nickname: value }));
    setSavedFormData((prev) => ({ ...prev, nickname: value }));
  };

  // 역할
  const selectedRole = formData.role;

  const handleRoleChange = (role: string) => {
    const nextRole = formData.role === role ? "" : role;

    setFormData((prev) => ({
      ...prev,
      role: nextRole,
    }));

    setSavedFormData((prev) => ({
      ...prev,
      role: nextRole,
      profilePicUrl: rolePicture[roleMap[role]],
    }));
  };

  // 알레르기
  const handleAllergyChange = (allergies: string[]) => {
    setFormData((prev) => ({
      ...prev,
      allergies,
    }));

    setSavedFormData((prev) => ({
      ...prev,
      allergies,
    }));
  };

  // 선호도
  const isPreferenceSelected = (food: string) =>
    formData.preferences.includes(food);

  const handlePreferencesChange = (foods: string[], index: number) => {
    const selectedFood = foods[index];

    let newPreferences;

    if (formData.preferences.includes(selectedFood)) {
      newPreferences = formData.preferences.filter(
        (item) => item !== selectedFood,
      );
    } else {
      newPreferences = [...formData.preferences, selectedFood];
    }

    setFormData((prev) => ({
      ...prev,
      preferences: newPreferences,
    }));

    setSavedFormData((prev) => ({
      ...prev,
      preferences: newPreferences,
    }));
  };

  // 좋아하는 식재료
  const handleLikeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, likedIngredients: value }));
    setSavedFormData((prev) => ({ ...prev, likedIngredients: value }));
  };

  // 싫어하는 식재료
  const handleDislikeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, dislikedIngredients: value }));
    setSavedFormData((prev) => ({ ...prev, dislikedIngredients: value }));
  };

  // request 생성
  const savedAllergies = useProfileStore((s) => s.savedFormData.allergies);
  let allergyList = savedAllergies.map((item) => allergyMap[item]);

  const preferencesList = formData.preferences
    .map((item) => preferenceMap[item])
    .filter((item) => item != null);

  const request: postProfileRequest = {
    nickname: formData.nickname,
    role: roleMap[formData.role],
    likedIngredients: formData.likedIngredients,
    dislikedIngredients: formData.dislikedIngredients,
    allergy: allergyList,
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
    isPreferenceSelected,
    handleLikeChange,
    handleDislikeChange,
    request,
    currentFamilyRoomId,
  };
};
