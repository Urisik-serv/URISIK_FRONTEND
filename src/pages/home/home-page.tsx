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
import { patchAlarm } from "../../api/member";

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

  const handleAlarm = async () => {
    await patchAlarm({ alarmPolicy: "ALARM_AGREED" });
    setIsModalOpen(false);
  };

  const handleModal = async () => {
    await patchAlarm({ alarmPolicy: "ALARM_DISAGREED" });
    setIsModalOpen(false);
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
              <div className="pt-5 gap-3 flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <FoodCard name="밥" />
                <FoodCard name="국" />
                <FoodCard name="반찬" />
                <FoodCard name="후식" />
              </div>
              <AllergyCuration />
              <MealCuration />
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
