import AlertModal from "../../components/common/AlertModal";
import { useEffect, useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import UpButton from "../../components/common/UpButton";
import HomeHeader from "../../components/header/HomeHeader";
import MealCuration from "../../components/home/curation/MealCuration";
import ProfileModal from "../../components/home/profile/ProfileModal";
import { useProfileModalInfo } from "../../hooks/use-profile-modal-store";
import SearchingPage from "./search-page";
import { useLocation, useNavigate } from "react-router-dom";
import { usePatchAlarm } from "../../hooks/queries/use-patch-alarm";
import { useFamilyData } from "../../hooks/use-family-data";
import { useGetProfile } from "../../hooks/queries/use-get-profile";
import { useFamilyStore } from "../../stores/use-family-store";
import { useProfileStore } from "../../stores/use-profile-store";
import { useMyProfile } from "../../hooks/queries/use-get-my-profile";

//FoodCard import
import Rice from "../../assets/category/rice.svg";
import Soup from "../../assets/category/soup.svg";
import Banchan from "../../assets/category/banchan.svg";
import Dessert from "../../assets/category/dessert.svg";

// FamilyProfiles import
import { useGetFamilyProfiles } from "../../hooks/queries/use-get-family-profiles";
import { useMyProfileStore } from "../../stores/use-my-profile-store";
import HomeProfileCard from "../../components/home/profile/HomeProfileCard";
import FamilyProfilesSkeleton from "../../components/skeltons/FamilyProfilesSkeleton";

// AllergyCuration import
import AllergyRecipeCard from "../../components/home/curation/AllergyRecipeCard";
import AllergyRecipeCardSkeleton from "../../components/skeltons/AllergyCardSkeleton";
import { Autoplay } from "swiper/modules";
import PageIndicator from "../../components/common/PageIndicator";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetRecommendSafe from "../../hooks/queries/use-get-safe-recipes";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //family-store 저장
  useFamilyData();
  const { familyRoomId } = useFamilyStore();
  const { data } = useMyProfile(familyRoomId);
  const isLeader = data?.isLeader;
  const { data: profile } = useGetProfile(familyRoomId);
  const { hasLoadedFromServer, setSavedFormData, markLoaded, saveIsLeader } =
    useProfileStore();

  useEffect(() => {
    if (!familyRoomId || isLeader == undefined) return;
    //profile-store 저장
    if (!hasLoadedFromServer && profile) {
      setSavedFormData(profile);
      saveIsLeader(isLeader);
      markLoaded();
    }
  }, [isLeader, profile, hasLoadedFromServer, familyRoomId, saveIsLeader]);

  const isSearchBarOpen = location.state?.showSearch === true;

  const openSearchBar = () => {
    navigate(location.pathname, { state: { showSearch: true } });
  };

  const { open } = useProfileModalInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const shouldShow = sessionStorage.getItem("showHomeModal");

    if (shouldShow == "true") {
      setIsModalOpen(true);
      sessionStorage.removeItem("showHomeModal");
    }
  }, []);

  const { mutate: updateAlarm } = usePatchAlarm();

  const handleAlarm = () => {
    updateAlarm({ alarmPolicy: "ALARM_AGREED" });
    setIsModalOpen(false);
  };

  const handleModal = () => {
    updateAlarm({ alarmPolicy: "ALARM_DISAGREED" });
    setIsModalOpen(false);
  };

  // 카테고리
  const [category, setCategory] = useState<string | undefined>(undefined);
  const handleCategory = (name: string) => {
    if (name == category) setCategory(undefined);
    else setCategory(name);
  };

  return (
    <>
      {isSearchBarOpen ? (
        <SearchingPage />
      ) : (
        <>
          <HomeHeader />
          <main className="px-4 pb-37">
            <div className="pt-1">
              <div className="mb-12">
                <FamilyProfile />
              </div>
              <div onClick={openSearchBar}>
                <SearchBar keyword="" />
              </div>
              <div className="pt-5 gap-[27px] flex justify-center">
                <FoodCard
                  name="밥"
                  onClick={() => handleCategory("밥")}
                  isSelected={"밥" === category}
                />
                <FoodCard
                  name="국"
                  onClick={() => handleCategory("국")}
                  isSelected={"국" === category}
                />
                <FoodCard
                  name="반찬"
                  onClick={() => handleCategory("반찬")}
                  isSelected={"반찬" === category}
                />
                <FoodCard
                  name="후식"
                  onClick={() => handleCategory("후식")}
                  isSelected={"후식" === category}
                />
              </div>
              <AllergyCuration />
              <MealCuration category={category} />
              {open && <ProfileModal />}
              <UpButton />
            </div>
            {isModalOpen && (
              <AlertModal
                title="알림"
                boldContent={`우리식의 다양한 알림을\n받으시겠어요?`}
                mediumContent="식단 생성, 식재료 저장, 리뷰 등의 정보를 확인 할 수 있어요."
                buttonText="알림 받기"
                outsideText="탭해서 닫기"
                onClick={handleAlarm}
                handleModal={handleModal}
              />
            )}
          </main>
        </>
      )}
    </>
  );
};

export default HomePage;

// FamilyProfile
const FamilyProfile = () => {
  const navigate = useNavigate();
  const familyRoomId = useFamilyStore.getState().familyRoomId;

  const { data: myFamily = [], isPending } = useGetFamilyProfiles(familyRoomId);
  const fetchMyProfile = useMyProfileStore((state) => state.fetchMyProfile);
  const myNickName = useMyProfileStore((state) => state.nickname);
  useEffect(() => {
    if (familyRoomId === null) return;

    // myProfileStore 채우기
    fetchMyProfile(familyRoomId);
  }, [familyRoomId, fetchMyProfile]);

  const sortedFamily = [...myFamily].sort((a, b) => {
    if (a.nickname === myNickName) return -1;
    if (b.nickname === myNickName) return 1;
    return 0;
  });

  return (
    <div className="w-full  px-4 pt-5 pb-3 bg-white rounded-xl outline-1 outline-stone-300 flex flex-col justify-start items-center gap-3  ">
      <p className="self-stretch justify-start text-black text-lg font-medium leading-7">
        우리가족 프로필
      </p>
      <div className="flex self-stretch items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {isPending ? (
          <FamilyProfilesSkeleton />
        ) : (
          sortedFamily?.map((profile) => (
            <HomeProfileCard key={profile.profileId} data={profile} />
          ))
        )}
      </div>
      <button
        onClick={() => navigate("family-wishlist")}
        className="self-stretch px-2.5 py-3 text-white text-[17px] font-semibold bg-primary-700 rounded-xl justify-center items-center cursor-pointer"
      >
        가족 위시리스트
      </button>
    </div>
  );
};

// FoodCard
const categoryImages: Record<string, string> = {
  밥: Rice,
  국: Soup,
  반찬: Banchan,
  후식: Dessert,
};
interface FoodCardProps {
  name: string;
  onClick: () => void;
  isSelected: boolean;
}

const FoodCard = ({ name, onClick, isSelected }: FoodCardProps) => {
  const imgSrc = categoryImages[name];
  return (
    <div
      className={`px-2.5 py-2.5 flex flex-col justify-center items-center gap-1 cursor-pointer shrink-0 ${isSelected && "border-b-2 border-primary-700"}`}
      onClick={onClick}
    >
      <img className="w-11 h-11 " src={imgSrc} alt={`${name}`} />
      <p className="text-center text-neutral-700 text-base font-semibold leading-6">
        {name}
      </p>
    </div>
  );
};

// AllergyCuration
const AllergyCuration = () => {
  // 슬라이드 효과
  const [activePage, setActivePage] = useState(1);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const handlePage = (pageNum: number) => {
    if (swiperRef) {
      swiperRef.slideToLoop(pageNum - 1);
    }
    setActivePage(pageNum);
  };

  const { data, isLoading } = useGetRecommendSafe();

  return (
    <div>
      <div className="pb-4">
        <h2 className="pt-[31px] text-zinc-800 text-xl font-semibold tracking-tight">
          같은 알레르기 가족에게 인기 메뉴
        </h2>
        <p className="text-neutral-400 text-sm font-medium leading-6">
          같은 알레르기를 소유한 가족원들 사이에서 인기가 많아요.
        </p>
      </div>
      {isLoading ? (
        <AllergyRecipeCardSkeleton />
      ) : (
        data && (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(swiper) => setSwiperRef(swiper)}
            onSlideChange={(swiper) => setActivePage(swiper.realIndex + 1)}
            className="pb-2"
          >
            {data?.recipes.map((recipe) => (
              <SwiperSlide>
                <AllergyRecipeCard key={recipe.id} recipe={recipe} />
              </SwiperSlide>
            ))}
          </Swiper>
        )
      )}
      {!isLoading && (
        <div className="flex justify-center pt-2">
          <PageIndicator page={activePage} total={3} onClick={handlePage} />
        </div>
      )}
    </div>
  );
};
