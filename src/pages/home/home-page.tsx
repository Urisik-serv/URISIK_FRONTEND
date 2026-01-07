import { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import HomeHeader from "../../components/header/HomeHeader";
import SearchingPage from "./search-page";

const HomePage = () => {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);

  return (
    <>
      {isOpenSearchBar ? (
        <SearchingPage handleClose={() => setIsOpenSearchBar(false)} />
      ) : (
        <>
          <HomeHeader />
          <div>
            <h1>HomePage</h1>
            <div onClick={() => setIsOpenSearchBar(true)}>
              <SearchBar />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
