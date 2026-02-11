import { motion } from "framer-motion";
import Rate from "./Rate";
import useDeleteProfileWishLists from "../../hooks/mutations/use-delete-profile-wishlists";
import { useFamilyStore } from "../../stores/use-family-store";

interface EntityItemProps {
  picture: string;
  name: string;
  category: string;
  id?: number;
  tags?: string;
  type?: string;
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
  rating,
  border,
  deleteProfile,
  onClick,
}: EntityItemProps) {
  const familyRoomId = useFamilyStore((data) => data.familyRoomId);
  const { mutate: deleteWishlists } = useDeleteProfileWishLists(familyRoomId);

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
        >
          <div
            onClick={onClick}
            className={`w-[343px] h-[72px] p-[10px] ${border} text-xl leading-[20px] tracking-[-0.6px]`}
          >
            <div className=" flex gap-[12px]">
              <img
                src={picture}
                alt={`${name} 사진`}
                className="size-[52px] rounded-full object-cover"
              />
              <div className="flex flex-col gap-[11px] flex-1 min-w-0">
                <div className="flex items-center gap-[5px]">
                  <div className="text-[16px] font-semibold leading-[24px]">
                    {name}
                  </div>
                  {rating && (
                    <div className="flex gap-[2.34px] items-center justify-center">
                      <Rate px={12} rate={rating} />
                    </div>
                  )}
                </div>
                <div className="flex gap-[5px] items-center">
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
