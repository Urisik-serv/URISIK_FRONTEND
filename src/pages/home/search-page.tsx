import BackButton from "../../components/common/BackButton";
import SearchBar from "../../components/common/SearchBar";

const SearchingPage = () => {
  return (
    <div className="flex pt-[30px] px-4 py-2 justify-center items-center ">
      <BackButton />
      <SearchBar />
    </div>
  );
};

export default SearchingPage;
