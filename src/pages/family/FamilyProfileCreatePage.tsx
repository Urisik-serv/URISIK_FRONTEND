import { useState } from "react";
import FamilyMemberButton from "../../components/family/FamilyMemberButton";
import PublicHeader from "../../components/header/PublicHeader";
import Button from "../../components/common/Button";
import { useFamilyProfileForm } from "../../hooks/useFamilyProfileForm";

export default function FamilyProfileCreatePage() {
  const {
    formData,
    handleNicknameChange,
    handleRoleChange,
    handleAllergiesChange,
    handleLikedIngredientsChange,
    handleDisLidedIngredientsChange,
    handlePreferencesChange,
  } = useFamilyProfileForm();

  const [selectedName, setSelectedName] = useState<string>("");
  const [isCheckedPreference, setIsCheckedPreference] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [checkNoAllergy, setCheckNoAllergy] = useState<boolean>(false);

  const roles = ["엄마", "아빠", "아들", "딸"];
  const preferences = ["한식", "중식", "일식", "양식", "디저트"];

  const handleCheckNoAllergy = () => {
    setCheckNoAllergy((prev) => !prev);
  };

  const handleSelectedName = (name: string) => {
    if (!selectedName || selectedName !== name) {
      setSelectedName(name);
      handleRoleChange(name);
    } else {
      setSelectedName("");
      handleRoleChange("");
    }
  };

  const handleIsCheckedPreference = (index: number) => {
    const foodName = preferences[index];

    setIsCheckedPreference((prev) => {
      const isNowChecked = !prev[index];
      const newCheckedList = [...prev];
      newCheckedList[index] = isNowChecked;

      let nextPreferences;
      if (isNowChecked) {
        // 체크됨: 기존 배열에 추가 (중복 방지)
        nextPreferences = formData.preferences.includes(foodName)
          ? formData.preferences
          : [...formData.preferences, foodName];
      } else {
        // 체크 해제됨: 배열에서 제거
        nextPreferences = formData.preferences.filter(
          (item) => item !== foodName
        );
      }

      handlePreferencesChange(nextPreferences);

      return newCheckedList;
    });
  };
  const isValid = () => {
    return (
      formData.nickname !== "" &&
      formData.role !== "" &&
      (typeof formData.allergies === "boolean"
        ? formData.allergies === false
        : formData.allergies.length > 0) &&
      formData.preferences.length > 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAllergiesChange(checkNoAllergy);
    if (!isValid()) {
      alert("필수 항목을 모두 입력해주세요.");
    }
    console.log("제출된 폼 데이터:", formData);
  };

  return (
    <>
      <PublicHeader title={"프로필 생성"} />
      <div className="flex justify-center ">
        <form
          onSubmit={handleSubmit}
          className="pt-[26px] w-[343px] flex flex-col gap-[32px]"
        >
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                닉네임
              </label>
              <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">
                *
              </div>
              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (필수)
              </div>
            </div>
            <div className="pt-[12px]">
              <input
                required
                type="text"
                placeholder="닉네임을 입력해주세요."
                className="w-full h-[42px] ring-1 ring-[#C3C3C3] focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#AFAFAF]"
                onChange={handleNicknameChange}
              />
            </div>
          </div>
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                역할
              </label>
              <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">
                *
              </div>
              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (필수)
              </div>
            </div>
            <div className="pt-[12px] flex gap-[12px] ">
              {roles.map((role) => (
                <button
                  onClick={() => handleSelectedName(role)}
                  key={role}
                  type="button"
                  className="cursor-pointer"
                >
                  <FamilyMemberButton
                    name={role}
                    number={selectedName === role ? 1 : 0}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                알레르기 정보
              </label>
              <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">
                *
              </div>
              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (필수)
              </div>
            </div>
            <div className="pt-[12px]">
              <input
                type="text"
                placeholder="알레르기 입력하기"
                className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
              />
            </div>
            <button
              onClick={handleCheckNoAllergy}
              className="cursor-pointer pt-[12px]"
              type="button"
            >
              <FamilyMemberButton name="없음" number={checkNoAllergy ? 1 : 0} />
            </button>
          </div>
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                식단 선호도
              </label>
              <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">
                *
              </div>
              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (필수)
              </div>
            </div>
            <div className="pt-[12px] flex flex-wrap gap-[12px] w-[319px]">
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  handleIsCheckedPreference(0);
                }}
              >
                <FamilyMemberButton
                  name="한식"
                  number={isCheckedPreference[0] ? 1 : 0}
                />
              </button>
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  handleIsCheckedPreference(1);
                }}
              >
                <FamilyMemberButton
                  name="중식"
                  number={isCheckedPreference[1] ? 1 : 0}
                />
              </button>
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  handleIsCheckedPreference(2);
                }}
              >
                <FamilyMemberButton
                  name="일식"
                  number={isCheckedPreference[2] ? 1 : 0}
                />
              </button>
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  handleIsCheckedPreference(3);
                }}
              >
                <FamilyMemberButton
                  name="양식"
                  number={isCheckedPreference[3] ? 1 : 0}
                />
              </button>
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  handleIsCheckedPreference(4);
                }}
              >
                <FamilyMemberButton
                  name="디저트"
                  number={isCheckedPreference[4] ? 1 : 0}
                />
              </button>
            </div>
          </div>
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                좋아하는 식재료
              </label>

              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (선택)
              </div>
            </div>
            <div className="pt-[12px]">
              <input
                type="text"
                placeholder="직접 입력하기"
                className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
                onChange={handleLikedIngredientsChange}
              />
            </div>
          </div>
          <div className=" w-[343px] ">
            <div className="flex items-center ">
              <label className="text-[#282828] text-lg font-medium leading-[27px] ">
                싫어하는 식재료
              </label>

              <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
                (선택)
              </div>
            </div>
            <div className="pt-[12px]">
              <input
                type="text"
                placeholder="직접 입력하기"
                className="w-full h-[42px] rounded-xl ring-1 ring-primary-700 focus:outline-none flex items-center gap-[10px] px-[8px] py-[11px] placeholder:text-[16px] placehorder:leading-[24px] placeholder:text-[#D1D1D1]"
                onChange={handleDisLidedIngredientsChange}
              />
            </div>
          </div>
          <div className="pt-[131px] ">
            <Button text={"완료"} type="submit" disabled={!isValid} />
          </div>
        </form>
      </div>
    </>
  );
}
