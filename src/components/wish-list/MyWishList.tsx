import { useEffect, useState } from "react";
import EditButton from "../common/EditButton";
import MenuList from "../common/MenuList";
import EmptyBox from "../../assets/icons/check-box-empty.svg";
import CheckedBox from "../../assets/icons/Check_box.svg";
import { useRecipeSelection } from "../../hooks/use-recipe-selection";
import useGetInfiniteProfileWishList from "../../hooks/queries/use-get-infinite-profile-wishlist";
import { useFamilyStore } from "../../stores/use-family-store";
import useGetInfiniteProfileTransWishList from "../../hooks/queries/use-get-infinite-profile-transwishlist";
import { useInView } from "react-intersection-observer";
import useDeleteProfileWishLists from "../../hooks/mutations/use-delete-profile-wishlists";
import { useNavigate } from "react-router-dom";

const MyWishList = () => {
  const [editMode, setEditMode] = useState(false);

  const roomId = useFamilyStore((state) => state.familyRoomId);
  const {
    data: profileWish,
    isFetching: profileFetch,
    hasNextPage: profileNext,
    fetchNextPage: fetchProfile,
  } = useGetInfiniteProfileWishList(roomId, -1, 5);

  const {
    data: transWish,
    isFetching: transFetch,
    hasNextPage: transNext,
    fetchNextPage: fetchTrans,
  } = useGetInfiniteProfileTransWishList(roomId, -1, 5);

  const navigate = useNavigate();

  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !transFetch && transNext;
      !profileFetch && profileNext;
    }
  }, [inView, transFetch, profileFetch, transNext, profileNext]);

  const {
    getUniqueKey,
    toggleSelection,
    selectedKeys,
    resetSelection,
    selectedProfilePayload,
    isSelected,
  } = useRecipeSelection();

  const { mutate: deleteWishlists } = useDeleteProfileWishLists(roomId);

  const handleDelete = async () => {
    if (selectedKeys.length === 0) return;

    console.log("삭제 요청 데이터:", selectedProfilePayload);

    deleteWishlists(selectedProfilePayload);

    resetSelection();
    setEditMode(false);
  };

  const handleButtonClick = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      handleDelete();
      if (editMode) setEditMode(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <EditButton
          onClick={handleButtonClick}
          count={selectedKeys.length}
          isEditMode={editMode}
        />
      </div>
      <div className="pt-2">
        {transWish?.pages.map((item) => {
          const uniqueKey = getUniqueKey(null, item.transformedRecipeId);

          return (
            <div className="flex items-center">
              {editMode && (
                <img
                  className="cursor-pointer w-6 h-6 shrink-0"
                  src={`${isSelected(uniqueKey) ? CheckedBox : EmptyBox}`}
                  alt={`${isSelected(uniqueKey) ? "선택됨" : "선택되지 않음"}`}
                  onClick={() => {
                    toggleSelection(uniqueKey);
                  }}
                />
              )}
              <MenuList
                key={item.transformedRecipeId}
                type="default"
                menu={item.transformedRecipeName}
                img={item.foodImage}
                clickable={true}
                onClick={() =>
                  navigate(`/menu-information/${item.transformedRecipeId}`)
                }
                isSelected={isSelected(uniqueKey)}
              />
            </div>
          );
        })}
      </div>
      <div>
        {profileWish?.pages.map((item) => {
          const uniqueKey = getUniqueKey(item.recipeId, null);

          return (
            <div className="flex items-center">
              {editMode && (
                <img
                  className="cursor-pointer w-6 h-6 shrink-0"
                  src={`${isSelected(uniqueKey) ? CheckedBox : EmptyBox}`}
                  alt={`${isSelected(uniqueKey) ? "선택됨" : "선택되지 않음"}`}
                  onClick={() => {
                    toggleSelection(uniqueKey);
                  }}
                />
              )}
              <MenuList
                key={item.recipeId}
                type="default"
                menu={item.recipeName}
                img={item.foodImage}
                clickable={true}
                onClick={() => navigate(`/menu-information/${item.recipeId}`)}
                isSelected={isSelected(uniqueKey)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWishList;
