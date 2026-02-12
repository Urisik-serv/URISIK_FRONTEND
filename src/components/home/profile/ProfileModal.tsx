import {
  AnimatePresence,
  type PanInfo,
  motion,
  useAnimation,
} from "framer-motion";
import {
  useProfileModalActions,
  useProfileModalInfo,
} from "../../../hooks/use-profile-modal-store";
import { useEffect, useMemo, useState } from "react";
import AllergyDataBox from "../../profile/AllergyDataBox";
import ElementButton from "../../common/ElementButton";
import EntityItem from "../../common/EntityItem";
import SmallButton from "../../common/SmallCommonButton";
import alertImage from "../../../assets/images/alert-circle.png";
import { useNavigate } from "react-router-dom";
import useGetInfiniteProfileWishList from "../../../hooks/queries/use-get-infinite-profile-wishlist";
import useGetInfiniteProfileTransWishList from "../../../hooks/queries/use-get-infinite-profile-transwishlist";
import { useFamilyStore } from "../../../stores/use-family-store";
import type { Profile } from "../../../types/family-profile";
import { getProfile } from "../../../api/family-profile";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import MenuListSkeleton from "../../skeltons/MenuListSkeleton";
import { rolePicture } from "../../../constants/profile-record";

const ProfileModal = () => {
  const { isClose } = useProfileModalActions();
  const { open, selectedData } = useProfileModalInfo();

  const navigate = useNavigate();

  const controls = useAnimation();
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (open) {
      controls.start("half");
      setIsExpanded(false);
    } else {
      controls.start("hidden");
    }
  }, [open, controls]);

  const onDragEnd = async (_: any, info: PanInfo) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (offset > 250 || velocity > 500) {
      isClose();
    } else if (offset < -100 || (velocity < -500 && !isExpanded)) {
      await controls.start("full");
      setIsExpanded(true);
    } else if (offset > 200 && isExpanded) {
      await controls.start("half");
      setIsExpanded(false);
    } else {
      controls.start(isExpanded ? "full" : "half");
    }
  };

  const variants = {
    hidden: { y: "100%" },
    half: { y: "60%" },
    full: { y: "0%" },
  };

  const roomId = useFamilyStore((data) => data.familyRoomId);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile(roomId, selectedData?.profileId);
      setProfile(profileData);
    };

    fetchProfile();
  }, [roomId, selectedData?.profileId]);

  const allergies =
    profile?.allergyAndAlterIngredients.map((allergy) => allergy.allergen) ||
    [];

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

  // 위시리스트
  const {
    data: profileWish,
    isFetching: profileFetch,
    hasNextPage: profileNext,
    fetchNextPage: fetchProfile,
    isError: errorProfile,
    isLoading: loadingProfile,
  } = useGetInfiniteProfileWishList(roomId, selectedData?.profileId, 5);

  const {
    data: transWish,
    isFetching: transFetch,
    hasNextPage: transNext,
    fetchNextPage: fetchTrans,
    isError: errorTrans,
    isLoading: loadingTrans,
  } = useGetInfiniteProfileTransWishList(roomId, selectedData?.profileId, 5);

  const loading = loadingProfile || loadingTrans;

  const hasData = useMemo(() => {
    const hasTrans = (transWish?.pages?.length ?? 0) > 0;
    const hasProfile = (profileWish?.pages?.length ?? 0) > 0;
    return hasTrans || hasProfile;
  }, [transWish, profileWish]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // 스크롤
  useEffect(() => {
    if (inView) {
      if (!transFetch && transNext) fetchTrans();
      if (!profileFetch && profileNext) fetchProfile();
    }
  }, [
    inView,
    transFetch,
    profileFetch,
    transNext,
    profileNext,
    fetchTrans,
    fetchProfile,
  ]);

  // 에러
  useEffect(() => {
    if (errorProfile) toast.error("일반 위시리스트 조회 실패");
    if (errorTrans) toast.error("변형 위시리스트 조회 실패");
  }, [errorProfile, errorTrans]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={isClose}
        className="fixed inset-0 z-52"
      />
      <motion.div
        initial="hidden"
        animate={controls}
        exit="hidden"
        variants={variants}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
        className="fixed z-52 left-0 right-0 mx-auto bottom-0 w-[375px] bg-white rounded-t-[20px] max-h-[93dvh] h-full overflow-hidden shadow-[0px_-3px_12px_0px_rgba(0,0,0,0.12)]"
      >
        <div
          className="flex justify-center pt-5 pb-2 cursor-grab active:cursor-grabbing"
          onClick={() => {
            setIsExpanded(!isExpanded);
            controls.start(isExpanded ? "half" : "full");
          }}
        >
          <div className="h-1.5 w-24 rounded-[3px] bg-gray-300" />
        </div>

        <div className="px-4 pb-10 overflow-y-auto overscroll-contain h-full [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <div className="pt-15.5 w-full mx-auto flex flex-col pb-10">
            <div className="flex justify-between  w-full">
              <div className="flex gap-3 items-end">
                <img
                  src={
                    selectedData?.profilePicUrl.includes("no_profile_image")
                      ? rolePicture[selectedData.role]
                      : selectedData?.profilePicUrl
                  }
                  alt="내 프로필 사진"
                  className="size-20 rounded-full"
                />
                <div className="text-2xl font-semibold leading-9">
                  {selectedData?.nickname}
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="text-[16px] font-semibold pb-3 leading-6">
                알레르기
              </div>
              {!allergies?.includes("NONE") ? (
                <div className="flex flex-col gap-5 pb-5">
                  {profile?.allergyAndAlterIngredients.map((item) => (
                    <div key={item.allergen}>
                      <AllergyDataBox
                        name={item.allergen}
                        alternative={item.alteredIngredients}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pb-5 ">
                  <div className="flex pt-2">
                    <ElementButton name="없음" />
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="text-[16px] font-semibold leading-6">
                선호 음식
              </div>
              <div className="flex gap-2 pt-3">
                {profile?.dietPreferences.map((food) => (
                  <ElementButton
                    key={food}
                    name={getKeyByValue(food) ?? food}
                  />
                ))}
              </div>
            </div>
            <div className="pt-10">
              <div className="text-[16px] font-semibold leading-6">
                내 위시리스트
              </div>
              {loading ? (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <MenuListSkeleton key={index} />
                  ))}
                </>
              ) : hasData ? (
                <div className="pt-[17px] flex flex-col gap-0">
                  {transWish?.pages.map((item) => (
                    <EntityItem
                      picture={item.foodImage}
                      name={item.transformedRecipeName}
                      rating={item.avgScore}
                      type="TRANSFORMED_RECIPE"
                      isWish={true}
                      isSafe={item.foodSafety === "SAFETY"}
                      id={item.transformedRecipeId}
                      category={item.category}
                      tags={item.recipeIngredients.join(", ")}
                      key={item.transformedRecipeId}
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
                      picture={item.foodImage}
                      name={item.recipeName}
                      rating={item.avgScore}
                      type="RECIPE"
                      isWish={true}
                      isSafe={item.foodSafety === "SAFETY"}
                      id={item.recipeId}
                      category={item.category}
                      tags={item.recipeIngredients.join(", ")}
                      key={item.recipeId}
                      border="border-b-1 border-b-gray-200"
                      onClick={() =>
                        navigate(
                          `/menu-information/${item.recipeId}?type=RECIPE`,
                        )
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="pt-[48px] flex flex-col items-center gap-[11px]">
                  <img
                    src={alertImage}
                    alt="알림 아이콘"
                    className="size-[76px]"
                  />
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
              <div ref={ref} className="h-2"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
