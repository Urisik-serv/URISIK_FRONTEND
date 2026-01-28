import SearchIcon from "../../assets/icons/search-icon.svg";

const SearchBar = () => {
  return (
    <>
      <form className="self-stretch h-11 pl-4 pr-3 py-2 bg-gray-50 rounded-[999px] outline-1 outline-stone-200 flex-1 flex justify-between items-center text-gray-600 min-w-0">
        <input
          placeholder="조리를 원하시는 음식을 입력해주세요."
          className="justify-start flex-1 text-base font-medium leading-6 focus:outline-none min-w-0"
        />
        {/*아이폰에서 input의 text의 크기가 16px보다 작으면 자동으로 화면을 확대하는 효과를 가진다고 함. 그래서 확대 방지로 일단은 text-base로 교체 */}
        <img
          src={SearchIcon}
          alt="돋보기 아이콘"
          className="w-7 h-7 shrink-0 cursor-pointer"
        />
      </form>
    </>
  );
};

export default SearchBar;
