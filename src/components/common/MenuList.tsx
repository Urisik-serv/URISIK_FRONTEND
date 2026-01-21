import Rate from "./Rate";
import Profile from "../../assets/images/empty-profile.png";

type MenuListMode = "default" | "rate" | "profile";
//default: 기본, rate: 별점까지만 보이도록, profile: 별점+프로필까지 보이도록

interface MenuListProps {
  type?: MenuListMode;
  menu: string;
  clickable?: boolean; //선택기능이 필요한 컴포넌트인지
  onClick?: () => void;
  isSelected?: boolean;
}

export default function MenuList({
  type = "default",
  menu,
  clickable = false,
  onClick,
  isSelected = false,
}: MenuListProps) {
  return (
    <div
      className={`w-full p-[10px] border h-18 ${isSelected ? "rounded-xl bg-primary-100 border-[1.5px] border-primary-700" : "bg-white border-transparent border-b border-b-gray-200"} ${clickable ? "cursor-pointer" : ""}`}
      onClick={clickable ? onClick : undefined}
    >
      <div className="flex gap-3">
        <img className="size-13 rounded-lg bg-[#F5F1ED]" />

        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-[5px] font-semibold">
            <p>{menu}</p>
            {(type == "rate" || type == "profile") && (
              <Rate px={12} rate={4.5} />
            )}
            {type == "profile" && (
              <div className="flex -space-x-2">
                <img src={Profile} alt="프로필 이미지" className="size-6" />
                <img src={Profile} alt="프로필 이미지" className="size-6" />
                <img src={Profile} alt="프로필 이미지" className="size-6" />
              </div>
            )}
          </div>
          <div className="flex gap-[5px] font-medium text-[14px] text-gray-400">
            <p>디저트</p>
            <p>|</p>
            <p>대체 식재료</p>
          </div>
        </div>
      </div>
    </div>
  );
}
