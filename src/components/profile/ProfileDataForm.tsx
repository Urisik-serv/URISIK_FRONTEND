import { useNavigate } from "react-router-dom";
import { useAllergySearch } from "../../hooks/use-allergy-search";
import { useFamilyProfileForm } from "../../hooks/use-family-profile-form";

import Button from "../common/Button";
import Camera from "../../assets/icons/camera.svg";
import RequiredLabel from "../family/RequiredLabel";
import SelectButton from "../family/SelectButton";
import OptionalLabel from "../family/OptionalLabel";
import { patchProfile, postProfile } from "../../api/family-profile";
import { useProfileStore } from "../../stores/use-profile-store";
import { roleMap, rolePicture } from "../../constants/profile-record";
import { useEffect } from "react";

interface ProfileDataFormProps {
  isEdit?: boolean; // 편집 모드 여부
  handlePicture?: () => void;
}

export default function ProfileDataForm({
  isEdit,
  handlePicture,
}: ProfileDataFormProps) {
  const {
    handleNickNameChange,
    handleRoleChange,
    handlePreferencesChange,
    selectedRole,
    isCheckedPreference,
    handleLikeChange,
    handleDislikeChange,
    isValid,
    formData,
    currentFamilyRoomId,
    request,
    handleAllergyChange,
  } = useFamilyProfileForm();

  const {
    selectedAllergies,
    handleSelectAllergy: onSelectAllergy,
    handleResetAllergy,
  } = useAllergySearch();

  const savedRole = useProfileStore.getState().savedFormData.role;

  useEffect(() => {
    if (selectedAllergies.length === 0) {
      handleAllergyChange(false);
    } else {
      handleAllergyChange(selectedAllergies);
    }
  }, [selectedAllergies]);

  const handleGoSearch = () => {
    navigate("allergy-search");
  };

  if (currentFamilyRoomId === null) {
    alert("가족방 정보가 존재하지 않습니다");
    return;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        console.log("보내는 데이터:", JSON.stringify(request, null, 2));
        const res = await patchProfile(currentFamilyRoomId, request);
        console.log(res.result);
      } else {
        const res = await postProfile(currentFamilyRoomId, request);
        console.log(res.result);
      }
    } catch (error) {
      if (isEdit) {
        console.error("프로필 편집 실패:", error);
      } else {
        console.error("프로필 생성 실패:", error);
      }
    }

    if (!isValid()) {
      alert("필수 항목을 모두 입력해주세요.");
    }
    console.log("제출된 폼 데이터:", formData);
  };

  const roles = ["엄마", "아빠", "아들", "딸", "할머니", "할아버지"];
  const foods = ["한식", "중식", "일식", "양식", "디저트"];
  const navigate = useNavigate();
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[343px] flex flex-col gap-[32px]"
    >
      {isEdit && (
        <div className="h-[104px] mb-[5.5px]">
          <div className="pt-[24px] pb-0 flex flex-col items-center">
            <img
              src={
                useProfileStore.getState().savedFormData.profilePicUrl ??
                rolePicture[roleMap[savedRole]]
              }
              alt="프로필 사진"
              className="w-[104px] m-0 rounded-full"
            />
            <button
              onClick={handlePicture}
              type="button"
              className="cursor-pointer bg-[#CACACA] size-[30px] flex justify-center items-center rounded-full -translate-y-[30px] translate-x-[37px]"
            >
              <img src={Camera} alt="프로필 사진 선택" />
            </button>
          </div>
        </div>
      )}
      <div className=" w-[343px] pt-[26px] ">
        <RequiredLabel title="닉네임" />
        <div className="pt-[12px]">
          <input
            required
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="w-full h-[42px] ring-1 ring-[#C3C3C3] focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#AFAFAF]"
            onChange={handleNickNameChange}
            value={formData.nickname}
          />
        </div>
      </div>
      <div className=" w-[343px] ">
        <RequiredLabel title="역할" />
        <div className="pt-[12px] flex gap-[12px] flex-wrap">
          {roles.map((role) => (
            <button
              onClick={() => handleRoleChange(role)}
              key={role}
              type="button"
              className="cursor-pointer"
            >
              <SelectButton name={role} isSelected={selectedRole === role} />
            </button>
          ))}
        </div>
      </div>
      <div className=" w-[343px] ">
        <RequiredLabel title="알레르기 정보" />
        <div className="pt-[12px]">
          <input
            type="text"
            placeholder="알레르기 입력하기"
            className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
            onClick={handleGoSearch}
          />
        </div>
        <div className="flex gap-[12px]">
          {selectedAllergies.length == 0 ? (
            <button
              type="button"
              className="cursor-pointer pt-[12px]"
              onClick={handleResetAllergy}
            >
              <SelectButton
                name="없음"
                isSelected={selectedAllergies.length === 0}
              />
            </button>
          ) : (
            <div className="flex flex-wrap gap-[12px]">
              <button
                type="button"
                className="cursor-pointer pt-[12px]"
                onClick={handleResetAllergy}
              >
                <SelectButton
                  name="없음"
                  isSelected={selectedAllergies.length === 0}
                />
              </button>
              {selectedAllergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => onSelectAllergy(allergy)}
                  className="pt-[12px]"
                >
                  <SelectButton name={allergy} isSelected={true} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" w-[343px] ">
        <RequiredLabel title="식단 선호도" />
        <div className="pt-[12px] flex flex-wrap gap-[12px] w-[319px]">
          {foods.map((food, index) => (
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => handlePreferencesChange(foods, index)}
              key={index}
            >
              <SelectButton
                name={food}
                isSelected={isCheckedPreference[index]}
              />
            </button>
          ))}
        </div>
      </div>
      <div className=" w-[343px] ">
        <OptionalLabel title="좋아하는 식재료" />
        <div className="pt-[12px]">
          <input
            type="text"
            placeholder="직접 입력하기"
            className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
            onChange={handleLikeChange}
            value={formData.likedIngredients}
          />
        </div>
      </div>
      <div className=" w-[343px] ">
        <OptionalLabel title="싫어하는 식재료" />
        <div className="pt-[12px]">
          <input
            type="text"
            placeholder="직접 입력하기"
            className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
            onChange={handleDislikeChange}
            value={formData.dislikedIngredients}
          />
        </div>
      </div>
      <div className="pt-[131px] ">
        <Button
          onClick={isEdit ? () => navigate("/") : () => navigate("/invite")}
          text={"완료"}
          type="submit"
          disabled={!isValid()}
        />
      </div>
    </form>
  );
}
