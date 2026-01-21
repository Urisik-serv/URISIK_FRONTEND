import SearchBar from "../../components/common/SearchBar";
import UpButton from "../../components/common/UpButton";
import HomeHeader from "../../components/header/HomeHeader";
import FoodCard from "../../components/home/category/FoodCard";
import AllergyCuration from "../../components/home/curation/AllergyCuration";
import MealCuration from "../../components/home/curation/MealCuration";
import FamilyProfile from "../../components/home/profile/FamilyProfile";
import SearchingPage from "./search-page";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchBarOpen = location.state?.showSearch === true;

  const openSearchBar = () => {
    navigate(location.pathname, { state: { showSearch: true } });
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
                <SearchBar />
              </div>
              <div className="pt-5 gap-3 flex">
                <FoodCard name="한식" />
                <FoodCard name="일식" />
                <FoodCard name="중식" />
                <FoodCard name="양식" />
              </div>
              <AllergyCuration />
              <MealCuration />
              <UpButton />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default HomePage;
