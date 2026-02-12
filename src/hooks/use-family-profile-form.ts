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

  // 닉네임
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSavedFormData((prev) => ({
      ...prev,
      nickname: value,
    }));
  };

  // 역할
  const selectedRole = savedFormData.role;

  const handleRoleChange = (role: string) => {
    const nextRole = savedFormData.role === role ? "" : role;

    setSavedFormData((prev) => ({
      ...prev,
      role: nextRole,
      profilePicUrl: rolePicture[roleMap[role]],
    }));
  };

  // 알레르기
  const handleAllergyChange = (allergies: string[]) => {
    setSavedFormData((prev) => ({
      ...prev,
      allergies,
    }));
  };

  // 선호도
  const isPreferenceSelected = (food: string) =>
    savedFormData.preferences.includes(food);

  const handlePreferencesChange = (foods: string[], index: number) => {
    const selectedFood = foods[index];

    const newPreferences = savedFormData.preferences.includes(selectedFood)
      ? savedFormData.preferences.filter((item) => item !== selectedFood)
      : [...savedFormData.preferences, selectedFood];

    setSavedFormData((prev) => ({
      ...prev,
      preferences: newPreferences,
    }));
  };

  // 좋아하는 식재료
  const handleLikeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSavedFormData((prev) => ({
      ...prev,
      likedIngredients: value,
    }));
  };

  // 싫어하는 식재료
  const handleDislikeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSavedFormData((prev) => ({
      ...prev,
      dislikedIngredients: value,
    }));
  };

  // request 생성
  const allergyList =
    savedFormData.allergies.length === 0
      ? ["NONE"]
      : savedFormData.allergies.map((item) => allergyMap[item]);

  const preferencesList = savedFormData.preferences
    .map((item) => preferenceMap[item])
    .filter((item) => item != null);

  const request: postProfileRequest = {
    nickname: savedFormData.nickname,
    role: roleMap[savedFormData.role],
    likedIngredients: savedFormData.likedIngredients,
    dislikedIngredients: savedFormData.dislikedIngredients,
    allergy: allergyList,
    dietPreferences: preferencesList,
  };

  const currentFamilyRoomId = useFamilyStore.getState().familyRoomId;

  return {
    formData: savedFormData,
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
