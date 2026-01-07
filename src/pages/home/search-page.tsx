import BackButtonImg from "../../assets/icons/chevron-left.svg";
import SearchBar from "../../components/common/SearchBar";

interface SearchingPageProps {
  handleClose: () => void;
}
const SearchingPage = ({ handleClose }: SearchingPageProps) => {
  return (
    <div className="flex px-4 py-2 justify-center items-center ">
      <img
        src={BackButtonImg}
        className="w-6 h-6 cursor-pointer"
        onClick={handleClose}
      />
      <SearchBar />
    </div>
  );
};

export default SearchingPage;
