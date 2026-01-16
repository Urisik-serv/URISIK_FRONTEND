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

  const [foods, setFoods] = useState<string[]>([]);

  const addFoods = (food: string, isChecked: boolean) => {
    if (isChecked) {
      setFoods((prev) => [...prev, food]);
    } else {
      setFoods((prev) => prev.filter((item) => item !== food));
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nickname: e.target.value });
  };

  const handleRoleChange = (role: string) => {
    setFormData({ ...formData, role: role });
  };

  const handleAllergiesChange = (allergies: string[] | boolean) => {
    if (typeof allergies === "boolean") {
      setFormData((prev) => ({ ...prev, allergies: false }));
    } else {
      setFormData((prev) => ({ ...prev, allergies: allergies }));
    }
  };

  const handleLikedIngredientsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, likedIngredients: e.target.value });
  };

  const handleDisLidedIngredientsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, dislikedIngredients: e.target.value });
  };

  const handlePreferencesChange = (preferences: string[]) => {
    setFormData((prev) => ({ ...prev, preferences: preferences }));
  };

  return {
    formData,
    foods,
    addFoods,
    handleNicknameChange,
    handleRoleChange,
    handleAllergiesChange,
    handleLikedIngredientsChange,
    handleDisLidedIngredientsChange,
    handlePreferencesChange,
  };
};
