import PublicHeader from "../../components/header/PublicHeader";
import { useNavigate } from "react-router-dom";
import ElementButton from "../../components/common/ElementButton";
import { useMemo } from "react";
import { useFamilyStore } from "../../stores/use-family-store";
import LeaderProfile from "../../assets/images/profile/leader-profile";
import AllergyDataBox from "../../components/profile/AllergyDataBox";
import { rolePicture } from "../../constants/profile-record";
import useGetInfiniteProfileWishList from "../../hooks/queries/use-get-infinite-profile-wishlist";
import useGetInfiniteProfileTransWishList from "../../hooks/queries/use-get-infinite-profile-transwishlist";
import EntityItem from "../../components/common/EntityItem";
import SmallButton from "../../components/common/SmallCommonButton";
import alertImage from "../../assets/images/alert-circle.png";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import ErrorUI from "../../components/common/ErrorUI";
import { useMyProfile } from "../../hooks/queries/use-get-my-profile";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const roomId = useFamilyStore((s) => s.familyRoomId);
  const { data, isPending, isError, refetch } = useMyProfile(roomId);

  const profile = data?.profile;
  const isLeader = data?.isLeader ?? false;

  // 선호 음식 변환 (렌더 최적화)
  const convertedPreferences = useMemo(() => {
    if (!profile?.dietPreferences) return [];

    const preferenceMap: Record<string, string> = {
      KOREAN: "한식",
      CHINESE: "중식",
      JAPANESE: "일식",
      WESTERN: "양식",
      DESSERT: "디저트",
    };

    return profile.dietPreferences.map((food) => preferenceMap[food] ?? food);
  }, [profile]);

  // 알레르기 계산 최적화
  const allergies = useMemo(() => {
    if (!profile?.allergyAndAlterIngredients) return [];

    return profile.allergyAndAlterIngredients.map((item) => item.allergen);
  }, [profile]);

  // 위시리스트 infinite query
  const { data: profileWish } = useGetInfiniteProfileWishList(roomId, -1, 5);

  const { data: transWish } = useGetInfiniteProfileTransWishList(roomId, -1, 5);

  // 로딩 처리
  if (isPending) {
    return (
      <>
        <PublicHeader title="내 프로필" />
        <div className="flex justify-center py-20">
          <LoadingSpinner text="로딩 중..." />
        </div>
      </>
    );
  }

  // 에러 처리
  if (isError) {
    return (
      <>
        <PublicHeader title="내 프로필" />
        <ErrorUI message="프로필을 불러오지 못했습니다." onRetry={refetch} />
      </>
    );
  }

  if (!profile) return null;

  return (
    <>
      <PublicHeader title="내 프로필" />

      <div className="pt-[33px] w-[343px] mx-auto flex flex-col pb-10">
        <div className="flex justify-between w-full">
          <div className="flex gap-[12px] items-end">
            {isLeader ? (
              <LeaderProfile
                href={rolePicture[profile.role] ?? rolePicture["MOM"]}
              />
            ) : (
              <img
                src={rolePicture[profile.role] ?? rolePicture["MOM"]}
                className="size-[80px] rounded-full"
              />
            )}
            <div className="text-2xl font-semibold leading-[36px]">
              {profile.nickname}
            </div>
          </div>

          <button
            className="cursor-pointer flex items-start"
            onClick={() => navigate("../modify-profile")}
          >
            <div className="text-[#767676] text-sm font-medium">
              프로필 편집
            </div>
          </button>
        </div>

        <div className="pt-[24px] pb-[10px]">
          <div className="text-[16px] font-semibold">알레르기</div>

          {!allergies.includes("NONE") ? (
            <div>
              {profile.allergyAndAlterIngredients.map((item, index) => (
                <div key={`${item.allergen}-${index}`} className="pb-[20px]">
                  <AllergyDataBox
                    name={item.allergen}
                    alternative={item.alteredIngredients}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="pb-[20px]">
              <div className="flex pt-2">
                <ElementButton name="없음" />
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="text-[16px] font-semibold">선호 음식</div>
          <div className="flex gap-[8px] pt-[12px]">
            {convertedPreferences.map((food, index) => (
              <ElementButton key={`${food}-${index}`} name={food} />
            ))}
          </div>
        </div>

        <div className="pt-[42px]">
          <div className="text-[16px] font-semibold">내 위시리스트</div>

          {profileWish || transWish ? (
            <div className="pt-[17px] flex flex-col">
              {transWish?.pages.map((item) => (
                <EntityItem
                  key={item.transformedRecipeId}
                  picture={item.foodImage}
                  name={item.transformedRecipeName}
                  rating={item.avgScore}
                  type="TRANSFORMED_RECIPE"
                  category={item.category}
                  tags={item.recipeIngredients.join(", ")}
                  border="border-b-1 border-b-gray-200"
                  onClick={() =>
                    navigate(
                      `/menu-information/${item.transformedRecipeId}?type=TRANSFORMED`,
                    )
                  }
                />
              ))}

              {profileWish?.pages.map((item) => (
                <EntityItem
                  key={item.recipeId}
                  picture={item.foodImage}
                  name={item.recipeName}
                  rating={item.avgScore}
                  type="RECIPE"
                  id={item.recipeId}
                  category={item.category}
                  tags={item.recipeIngredients.join(", ")}
                  border="border-b-1 border-b-gray-200"
                  onClick={() =>
                    navigate(`/menu-information/${item.recipeId}?type=RECIPE`)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="pt-[48px] flex flex-col items-center gap-[11px]">
              <img src={alertImage} alt="알림 아이콘" className="size-[76px]" />
              <div className="text-center text-[16px] text-gray-600">
                추가된 위시리스트가 없어요
              </div>
              <div className="pt-[24px]">
                <SmallButton
                  text="위시리스트 담기"
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
