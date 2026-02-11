import { useEffect, useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import UpButton from "../../components/common/UpButton";
import HomeHeader from "../../components/header/HomeHeader";
import FoodCard from "../../components/home/category/FoodCard";
import AllergyCuration from "../../components/home/curation/AllergyCuration";
import MealCuration from "../../components/home/curation/MealCuration";
import FamilyProfile from "../../components/home/profile/FamilyProfile";
import ProfileModal from "../../components/home/profile/ProfileModal";
import { useProfileModalInfo } from "../../hooks/use-profile-modal-store";
import SearchingPage from "./search-page";
import { useLocation, useNavigate } from "react-router-dom";
import AlertModal from "../../components/common/AlertModal";
import { usePatchAlarm } from "../../hooks/queries/use-patch-alarm";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
