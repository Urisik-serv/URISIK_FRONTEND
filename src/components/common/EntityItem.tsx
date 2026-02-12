import { motion } from "framer-motion";
import Rate from "./Rate";
import useDeleteProfileWishLists from "../../hooks/mutations/use-delete-profile-wishlists";
import { useFamilyStore } from "../../stores/use-family-store";
import { useRef } from "react";
import SafeMark from "./SafeMark";

interface EntityItemProps {
  picture: string;
  name: string;
  category: string;
  id?: number;
  tags?: string;
  type?: string;
  isWish?: boolean;
  rating?: number;
  border?: string;
  deleteProfile?: () => void;
  onClick?: () => void;
}

export default function EntityItem({
  picture,
  name,
  category,
  tags,
  id,
  type,
  isWish = false,
  rating,
  border,
  deleteProfile,
  onClick,
}: EntityItemProps) {
  const familyRoomId = useFamilyStore((data) => data.familyRoomId);
  const { mutate: deleteWishlists } = useDeleteProfileWishLists(familyRoomId);

  // 드래그 상태 추적
  const isDragging = useRef(false);

  const handleClick = async () => {
    if (deleteProfile) {
      deleteProfile();
    } else {
      if (!id) return;

      const payload = {
        recipeId: type === "RECIPE" ? [id] : [],
        transformedRecipeId: type === "TRANSFORMED_RECIPE" ? [id] : [],
      };

      deleteWishlists(payload);
    }
  };

  const handleContentClick = () => {
    if (isDragging.current) return;
    if (onClick) onClick();
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gray-100 ">
        <button
          onClick={handleClick}
          className="cursor-pointer absolute right-0 top-0 bottom-0 w-[93px] text-xl font-medium"
        >
          삭제
        </button>
        <motion.div
          drag="x"
          dragConstraints={{ left: -93, right: 0 }}
          className="relative bg-white"
          onDragStart={() => {
            isDragging.current = true;
          }}
          // 5. 드래그 종료 시 약간의 지연 후 플래그 false (클릭 이벤트가 뒤늦게 발생하는 것 방지)
          onDragEnd={() => {
            setTimeout(() => {
              isDragging.current = false;
            }, 100);
          }}
        >
          <div
            onClick={handleContentClick}
            className={`w-[343px] h-[72px] p-[10px] ${border} text-xl leading-[20px] tracking-[-0.6px]`}
          >
            <div className=" flex gap-[12px]">
              <img
                src={picture}
                alt={`${name} 사진`}
                className={`size-[52px] object-cover ${isWish ? "rounded-lg" : "rounded-full"}`}
              />
              <div className="flex flex-col gap-[11px] flex-1 min-w-0">
                <div className="flex items-center gap-[5px]">
                  <div className="text-[16px] font-semibold leading-[24px] line-clamp-1">
                    {name}
                  </div>
                  {rating !== undefined && (
                    <div className="flex gap-[2.34px] items-center justify-center">
                      <Rate px={12} rate={rating} />
                    </div>
                  )}
                </div>
                <div className="flex gap-[5px] items-center">
                  {isWish && <SafeMark isWish={false} isSafe={true} />}
                  <div className="text-sm tracking-[-0.42px] text-gray-400 truncate shrink-0">
                    {category}
                  </div>
                  {tags && (
                    <>
                      <div className="w-0 h-3.5 bg-gray-400 border-r border-r-gray-400" />
                      <div className="text-sm tracking-[-0.42px] text-gray-400 truncate">
                        {tags}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
