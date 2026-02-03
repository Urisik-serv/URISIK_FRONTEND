import { useEffect, useState } from "react";
import { useProfileStore } from "../stores/use-profile-store";
import { postProfile } from "../api/family-profile";
import type { postProfileRequest } from "../types/family-profile";
import { useFamilyStore } from "../stores/use-family-store";

export const useFamilyProfileForm = () => {
  const { savedFormData, setSavedFormData } = useProfileStore();
  const [formData, setFormData] = useState(savedFormData);
  const roleMap: Record<string, string> = {
    엄마: "MOM",
    아빠: "DAD",
    아들: "SON",
    딸: "DAUGHTER",
  };
  const preferenceMap: Record<string, string> = {
    한식: "KOREAN",
    중식: "CHINESE",
    일식: "JAPANESE",
    양식: "WESTERN",
    디저트: "DESSERT",
  };
  const allergyMap: Record<string, string> = {
    알류: "EGG",
    우유: "MILK",
    메밀: "BUCKWHEAT",
    땅콩: "PEANUT",
    대두: "SOYBEAN",
    밀: "WHEAT",
    잣: "PINE_NUT",
    호두: "WALNUT",
    게: "CRAB",
    새우: "SHRIMP",
    오징어: "SQUID",
    고등어: "MACKEREL",
    굴: "OYSTER",
    홍합: "MUSSEL",
    전복: "ABALONE",
    복숭아: "PEACH",
    토마토: "TOMATO",
    닭고기: "CHICKEN",
    돼지고기: "PORK",
    쇠고기: "BEEF",
    아황산류: "SULFITE",
    젤라틴: "EXTRACTED_INGREDIENTS",
  };

  useEffect(() => {
    setFormData(savedFormData);
  }, [savedFormData]);

  useEffect(() => {
    setSavedFormData(formData);
  }, [formData]);

  // 닉네임 핸들러
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nickname: e.target.value });
  };

  // 역할 핸들러
  const [selectedRole, setSelectedRole] = useState<string>(savedFormData.role);
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

  // 영문으로 변환
  let allergyList: string[] | boolean;
  if (Array.isArray(formData.allergies)) {
    allergyList = formData.allergies.map((item) => allergyMap[item]);
  } else {
    allergyList = formData.allergies;
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

  // 폼 제출 핸들러

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
    isValid,
    request,
    currentFamilyRoomId,
  };
};
