import SearchIcon from "../../assets/icons/search-icon.svg";

const SearchBar = () => {
  return (
    <>
      <form className="self-stretch h-11 pl-4 pr-3 py-2 m-4 bg-stone-100 rounded-[999px] outline-1 outline-stone-200 flex-1 flex justify-between items-center">
        <input
          placeholder="조리를 원하시는 음식을 입력해주세요."
          className="justify-start flex-1 text-sm font-medium leading-6 focus:outline-none"
        />
        <img src={SearchIcon} alt="돋보기 아이콘" className="cursor-pointer" />
      </form>
    </>
  );
};

export default SearchBar;
