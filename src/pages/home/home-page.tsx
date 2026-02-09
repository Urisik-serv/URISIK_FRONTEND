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

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchBarOpen = location.state?.showSearch === true;

  const openSearchBar = () => {
    navigate(location.pathname, { state: { showSearch: true } });
  };

  const { open } = useProfileModalInfo();

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
          </main>
        </>
      )}
    </>
  );
};

export default HomePage;
