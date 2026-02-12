import Rate from "./Rate";
import Profile from "../../assets/images/empty-profile.png";
import type { WishListProfile } from "../../types/wish-list";
import SafeMark from "./SafeMark";
import { useFamilyData } from "../../hooks/use-family-data";
import LeaderProfile from "../../assets/images/profile/leader-profile";

type MenuListMode = "default" | "rate" | "profile";
//default: 기본, rate: 별점까지만 보이도록, profile: 별점+프로필까지 보이도록

interface MenuListProps {
  type?: MenuListMode;
  menu: string;
  img?: string;
  category?: string;
  clickable?: boolean; //선택기능이 필요한 컴포넌트인지
  onClick?: () => void;
  isSelected?: boolean;
  ingredients?: string | string[];
  isSafe?: string;
  rate?: number;
  profiles?: WishListProfile[];
  hasBorder?: boolean;
}

export default function MenuList({
  type = "default",
  menu,
  img,
  category,
  clickable = false,
  onClick,
  isSelected = false,
  ingredients,
  isSafe,
  rate,
  profiles,
  hasBorder = true,
}: MenuListProps) {
  const displayIngredients = Array.isArray(ingredients)
    ? ingredients.join(", ")
    : ingredients;

  const safe = isSafe === "SAFE" || isSafe === "SAFETY";

  // 방장 확인
  const { isLeader } = useFamilyData();

  return (
    <div
      className={`w-full p-[10px] border h-18 ${isSelected ? "rounded-xl bg-primary-100 border-[1.5px] border-primary-700" : `bg-white border-transparent ${hasBorder ? "border-b border-b-gray-200" : " "}`} ${clickable ? "cursor-pointer" : ""}`}
      onClick={clickable ? onClick : undefined}
    >
      <div className="flex gap-3">
        <img src={img} className="size-13 rounded-lg bg-[#F5F1ED] shrink-0" />

        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div className="flex items-center gap-[5px] font-semibold ">
            <p className="max-w-[180px] line-clamp-1">{menu}</p>
            {(type == "rate" || type == "profile") && (
              <Rate px={12} rate={rate} />
            )}
            {type == "profile" && (
              <div className="flex -space-x-2">
                {profiles?.map((profile) => {
                  if (isLeader) {
                    return (
                      <LeaderProfile
                        key={profile.profileId}
                        href={profile.profilePicUrl}
                        w="24"
                        h="24"
                      />
                    );
                  }
                  return (
                    <img
                      src={profile.profilePicUrl || Profile}
                      key={profile.profileId}
                      alt="프로필 이미지"
                      className="size-6 object-cover rounded-full"
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <SafeMark isWish={safe !== undefined} isSafe={safe} />
            <div className="flex gap-[5px] font-medium text-[14px] text-gray-400 truncate">
              <p>{category}</p>
              <p>|</p>
              <p>{displayIngredients}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
