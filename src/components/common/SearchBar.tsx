import SearchIcon from "../../assets/icons/search-icon.svg";
import XIcon from "../../assets/icons/x-icon.svg";

interface SearchBarProps {
  keyword?: string;
  onChange?: (e: string) => void;
}
const SearchBar = ({ keyword, onChange }: SearchBarProps) => {
  const isEmpty = keyword === "";
  const handleClick = () => {
    if (keyword !== "") onChange?.("");
  };
  return (
    <>
      <form
        className="self-stretch h-11 pl-4 pr-3 py-2 bg-gray-50 rounded-[999px] outline-1 outline-stone-200 flex-1 flex justify-between items-center text-gray-600 min-w-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          placeholder="조리를 원하시는 음식을 입력해주세요."
          className="justify-start flex-1 text-base font-medium leading-6 focus:outline-none min-w-0"
          value={keyword}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
        />
        {/*아이폰에서 input의 text의 크기가 16px보다 작으면 자동으로 화면을 확대하는 효과를 가진다고 함. 그래서 확대 방지로 일단은 text-base로 교체 */}
        <img
          src={`${isEmpty ? SearchIcon : XIcon}`}
          alt={`${isEmpty ? "검색 버튼" : "지우기 버튼"}`}
          className={`shrink-0 cursor-pointer ${isEmpty ? "w-7 h-7" : "w-6 h-6"}`}
          onClick={handleClick}
        />
      </form>
    </>
  );
};

export default SearchBar;
