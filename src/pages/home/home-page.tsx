import SearchBar from "../../components/common/SearchBar";
import HomeHeader from "../../components/header/HomeHeader";
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
          <div>
            <h1>HomePage</h1>
            <div onClick={openSearchBar}>
              <SearchBar />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
