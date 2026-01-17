import { useState } from "react";

interface FamilyProfileFormData {
  nickname: string;
  role: string;
  allergies: string[] | boolean;
  preferences: string[];
  likedIngredients?: string;
  dislikedIngredients?: string;
}

export const useFamilyProfileForm = () => {
  const [formData, setFormData] = useState<FamilyProfileFormData>({
    nickname: "",
    role: "",
    allergies: [] as string[] | true,
    preferences: [] as string[],
    likedIngredients: "",
    dislikedIngredients: "",
  });

  // 닉네임 핸들러
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nickname: e.target.value });
  };

  // 역할 핸들러
  const [selectedRole, setSelectedRole] = useState<string>("");
  const handleRoleChange = (role: string) => {
    if (!selectedRole || selectedRole !== role) {
      setSelectedRole(role);
      setFormData({ ...formData, role: role });
    } else {
      setSelectedRole("");
      setFormData({ ...formData, role: "" });
    }
  };

  // 알레르기 핸들러
  const [selectedNone, setSelectedRoleNone] = useState<boolean>(false);
  const handleAllergyChange = (allergies: string[] | boolean) => {
    if (typeof allergies === "boolean") {
      setSelectedRoleNone((prev) => !prev);
    }
    setFormData({ ...formData, allergies: allergies });
  };

  // 식단 선호도 핸들러
  const [isCheckedPreference, setIsCheckedPreference] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
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
  };

  // 싫어하는 식재료 핸들러
  const handleDislikeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, dislikedIngredients: e.target.value });
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

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) {
      alert("필수 항목을 모두 입력해주세요.");
    }
    console.log("제출된 폼 데이터:", formData);
  };

  return {
    formData,
    handleNickNameChange,
    handleRoleChange,
    handleAllergyChange,
    handlePreferencesChange,
    selectedNone,
    selectedRole,
    isCheckedPreference,
    handleLikeChange,
    handleDislikeChange,
    handleSubmit,
    isValid,
  };
};
