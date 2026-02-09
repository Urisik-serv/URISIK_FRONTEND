import PublicHeader from "../../components/header/PublicHeader";
import { useNavigate } from "react-router-dom";
import ElementButton from "../../components/common/ElementButton";
import { getProfile } from "../../api/family-profile";
import { useEffect, useState } from "react";
import type { Profile } from "../../types/family-profile";
import { useFamilyStore } from "../../stores/use-family-store";
import LeaderProfile from "../../assets/images/profile/leader-profile";
import AllergyDataBox from "../../components/profile/AllergyDataBox";
import { getFamilyRoom } from "../../api/family-room";
import { rolePicture } from "../../constants/profile-record";
import { useProfileStore } from "../../stores/use-profile-store";
import useGetInfiniteProfileWishList from "../../hooks/queries/use-get-infinite-profile-wishlist";
import useGetInfiniteProfileTransWishList from "../../hooks/queries/use-get-infinite-profile-transwishlist";
import EntityItem from "../../components/common/EntityItem";
import SmallButton from "../../components/common/SmallCommonButton";
import alertImage from "../../assets/images/alert-circle.png";

export default function MyProfilePage() {
  const preferenceMap: Record<string, string> = {
    한식: "KOREAN",
    중식: "CHINESE",
    일식: "JAPANESE",
    양식: "WESTERN",
    디저트: "DESSERT",
  };
  const getKeyByValue = (value: string) => {
    return Object.entries(preferenceMap).find(([_, v]) => v === value)?.[0];
  };

  const roomId = useFamilyStore.getState().familyRoomId;
  if (roomId === null) {
    alert("가족방 정보가 존재하지 않습니다");
    return;
  }
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const { saveIsLeader, isLeader } = useProfileStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile(roomId, -1);
      const familyRoom = await getFamilyRoom();
      setProfile(profileData);
      saveIsLeader(familyRoom.result.capabilities.leader);
    };

    fetchProfile();
  }, [roomId]);

  // 위시리스트
  const {
    data: profileWish,
    isFetching: profileFetch,
    hasNextPage: profileNext,
    fetchNextPage: fetchProfile,
  } = useGetInfiniteProfileWishList(roomId, -1, 5);

  const {
    data: transWish,
    isFetching: transFetch,
    hasNextPage: transNext,
    fetchNextPage: fetchTrans,
  } = useGetInfiniteProfileTransWishList(roomId, -1, 5);

  const allergies =
    profile?.allergyAndAlterIngredients.map((allergy) => allergy.allergen) ||
    [];

  return (
    <>
      <PublicHeader title={"내 프로필"} />
      <div className="pt-[33px] w-[343px] mx-auto flex flex-col pb-10">
        <div className="flex justify-between  w-full">
          <div className="flex gap-[12px] items-end">
            {isLeader ? (
              <LeaderProfile role={profile?.role ?? ""} />
            ) : (
              <img
                src={rolePicture[profile?.role ?? ""]}
                className="size-[80px]"
              />
            )}
            <div className="text-2xl font-semibold leading-[36px]">
              {profile?.nickname}
            </div>
          </div>
          <button
            className="cursor-pointer flex items-start"
            onClick={() => navigate("../modify-profile")}
          >
            <div className="text-[#767676] text-sm leading-[22.26px] font-medium">
              프로필 편집
            </div>
          </button>
        </div>
        <div className="pt-[24px] pb-[10px]">
          <div className="text-[16px] font-semibold leading-[24px]">
            알레르기
          </div>
          {!allergies?.includes("NONE") ? (
            <div>
              {profile?.allergyAndAlterIngredients.map((item) => (
                <div key={item.allergen} className=" pb-[20px]">
                  <AllergyDataBox
                    name={item.allergen}
                    alternative={item.alteredIngredients}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="pb-[20px] ">
              <div className="flex pt-2">
                <ElementButton name="없음" />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="text-[16px] font-semibold leading-[24px]">
            선호 음식
          </div>
          <div className="flex gap-[8px] pt-[12px]">
            {profile?.dietPreferences.map((food) => (
              <ElementButton name={getKeyByValue(food) ?? food} />
            ))}
          </div>
        </div>
        <div className="pt-[42px]">
          <div className="text-[16px] font-semibold leading-[24px]">
            내 위시리스트
          </div>
          {profileWish || transWish ? (
            <div className="pt-[17px] flex flex-col gap-0">
              {transWish?.pages.map((item) => (
                <EntityItem
                  picture={item.foodImage}
                  name={item.transformedRecipeName}
                  rating={item.avgScore}
                  category={item.category}
                  tags={item.recipeIngredients.join(", ")}
                  key={item.transformedRecipeId}
                  border="border-b-1 border-b-gray-200"
                />
              ))}
              {profileWish?.pages.map((item) => (
                <EntityItem
                  picture={item.foodImage}
                  name={item.recipeName}
                  rating={item.avgScore}
                  category={item.category}
                  tags={item.recipeIngredients.join(", ")}
                  key={item.recipeId}
                  border="border-b-1 border-b-gray-200"
                />
              ))}
            </div>
          ) : (
            <div className="pt-[48px] flex flex-col items-center gap-[11px]">
              <img src={alertImage} alt="알림 아이콘" className="size-[76px]" />
              <div className="text-center text-[16px] leading-[24px] text-[#4D4D4D]">
                추가된 위시리스트가 없어요
              </div>
              <div className="pt-[24px]">
                <SmallButton
                  text={"위시리스트 담기"}
                  type="button"
                  onClick={() => navigate("../")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
