import { useLocation, useNavigate } from "react-router-dom";
import { useFamilyProfileForm } from "../../hooks/use-family-profile-form";

import Button from "../common/Button";
import Camera from "../../assets/icons/camera.svg";
import RequiredLabel from "../family/RequiredLabel";
import SelectButton from "../family/SelectButton";
import OptionalLabel from "../family/OptionalLabel";
import { useProfileStore } from "../../stores/use-profile-store";
import { roleMap, rolePicture } from "../../constants/profile-record";
import { useProfileMutation } from "../../hooks/mutations/use-post-profile";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ProfileDataFormProps {
  isEdit?: boolean;
  handlePicture?: () => void;
}

export default function ProfileDataForm({
  isEdit,
  handlePicture,
}: ProfileDataFormProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleNickNameChange,
    handleRoleChange,
    handlePreferencesChange,
    selectedRole,
    handleLikeChange,
    handleDislikeChange,
    formData,
    currentFamilyRoomId,
    request,
    isPreferenceSelected,
  } = useFamilyProfileForm();

  const selectedAllergies = useProfileStore((s) => s.savedFormData.allergies);

  const setSavedFormData = useProfileStore((s) => s.setSavedFormData);

  const handleResetAllergy = () => {
    setSavedFormData((prev) => ({
      ...prev,
      allergies: [],
    }));
  };

  const onSelectAllergy = (allergy: string) => {
    setSavedFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  useEffect(() => {
    if (location.state?.selectedAllergies) {
      setSavedFormData((prev) => ({
        ...prev,
        allergies: location.state.selectedAllergies,
      }));
    }
  }, [location.state, setSavedFormData]);

  const profileMutation = useProfileMutation(currentFamilyRoomId, isEdit);

  const profilePicUrl = useProfileStore((s) => s.savedFormData.profilePicUrl);
  const savedRole = useProfileStore((s) => s.savedFormData.role);

  const handleGoSearch = () => {
    navigate("allergy-search");
  };

  if (currentFamilyRoomId === null) {
    toast.error("가족방 정보가 존재하지 않습니다");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사
    if (request.nickname === "") {
      toast.error("닉네임을 입력해주세요");
    } else if (request.role === "") {
      toast.error("역할을 선택해주세요");
    } else if (request.dietPreferences.length === 0) {
      toast.error("선호음식을 선택해주세요");
    }

    profileMutation.mutate(request);
  };

  const roles = ["엄마", "아빠", "아들", "딸", "할머니", "할아버지"];
  const foods = ["한식", "중식", "일식", "양식", "디저트"];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[343px] flex flex-col gap-[32px]"
    >
      {isEdit && (
        <div className="h-[104px] mb-[5.5px]">
          <div className="pt-[24px] flex flex-col items-center">
            <img
              src={
                profilePicUrl && profilePicUrl !== ""
                  ? profilePicUrl
                  : rolePicture[roleMap[savedRole]]
              }
              alt="프로필 사진"
              className="w-[104px] rounded-full"
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

      {/* 닉네임 */}
      <div className="pt-[26px]">
        <RequiredLabel title="닉네임" />
        <div className="pt-[12px]">
          <input
            required
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="w-full h-[42px] ring-1 ring-[#C3C3C3] focus:outline-none px-[8px] py-[11px]"
            onChange={handleNickNameChange}
            value={formData.nickname}
          />
        </div>
      </div>

      {/* 역할 */}
      <div>
        <RequiredLabel title="역할" />
        <div className="pt-[12px] flex gap-[12px] flex-wrap">
          {roles.map((role, index) => (
            <button
              onClick={() => handleRoleChange(role)}
              key={`${role}-${index}`}
              type="button"
              className="cursor-pointer"
            >
              <SelectButton name={role} isSelected={selectedRole === role} />
            </button>
          ))}
        </div>
      </div>

      {/* 알레르기 */}
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
        <div className="flex gap-[12px] flex-wrap">
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
              {selectedAllergies.map((allergy, index) => (
                <button
                  key={`${allergy}-${index}`}
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
      {/* 식단 선호도 */}
      <div>
        <RequiredLabel title="식단 선호도" />
        <div className="pt-[12px] flex flex-wrap gap-[12px]">
          {foods.map((food, index) => (
            <button
              key={`${food}-${index}`}
              type="button"
              className="cursor-pointer"
              onClick={() => handlePreferencesChange(foods, index)}
            >
              <SelectButton
                name={food}
                isSelected={isPreferenceSelected(food)}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 좋아하는 식재료 */}
      <div>
        <OptionalLabel title="좋아하는 식재료" />
        <div className="pt-[12px]">
          <input
            type="text"
            placeholder="직접 입력하기"
            className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none px-[8px] py-[11px]"
            onChange={handleLikeChange}
            value={formData.likedIngredients}
          />
        </div>
      </div>

      {/* 싫어하는 식재료 */}
      <div>
        <OptionalLabel title="싫어하는 식재료" />
        <div className="pt-[12px]">
          <input
            type="text"
            placeholder="직접 입력하기"
            className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none px-[8px] py-[11px]"
            onChange={handleDislikeChange}
            value={formData.dislikedIngredients}
          />
        </div>
      </div>

      <div className="pt-[131px]">
        <Button
          text={profileMutation.isPending ? "처리 중..." : "완료"}
          type="submit"
          disabled={profileMutation.isPending}
        />
      </div>
    </form>
  );
}
