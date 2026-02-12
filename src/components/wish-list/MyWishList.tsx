import { useEffect, useState } from "react";
import EditButton from "../common/EditButton";
import MenuList from "../common/MenuList";
import EmptyBox from "../../assets/icons/check-box-empty.svg";
import CheckedBox from "../../assets/icons/check-box.svg";
import { useRecipeSelection } from "../../hooks/use-recipe-selection";
import useGetInfiniteProfileWishList from "../../hooks/queries/use-get-infinite-profile-wishlist";
import { useFamilyStore } from "../../stores/use-family-store";
import useGetInfiniteProfileTransWishList from "../../hooks/queries/use-get-infinite-profile-transwishlist";
import { useInView } from "react-intersection-observer";
import useDeleteProfileWishLists from "../../hooks/mutations/use-delete-profile-wishlists";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MenuListSkeleton from "../skeltons/MenuListSkeleton";

const MyWishList = () => {
  const [editMode, setEditMode] = useState(false);

  const roomId = useFamilyStore((state) => state.familyRoomId);
  const {
    data: profileWish,
    isFetching: profileFetch,
    hasNextPage: profileNext,
    fetchNextPage: fetchProfile,
    isError: errorProfile,
    isLoading: loadingProfile,
  } = useGetInfiniteProfileWishList(roomId, -1, 3);

  const {
    data: transWish,
    isFetching: transFetch,
    hasNextPage: transNext,
    fetchNextPage: fetchTrans,
    isError: errorTrans,
    isLoading: loadingTrans,
  } = useGetInfiniteProfileTransWishList(roomId, -1, 5);

  const navigate = useNavigate();

  const loading = loadingProfile || loadingTrans;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // 스크롤
  useEffect(() => {
    if (inView) {
      if (!transFetch && transNext) fetchTrans();
      if (!profileFetch && profileNext) fetchProfile();
    }
  }, [
    inView,
    transFetch,
    profileFetch,
    transNext,
    profileNext,
    fetchTrans,
    fetchProfile,
  ]);

  // 에러
  useEffect(() => {
    if (errorProfile) toast.error("일반 위시리스트 조회 실패");
    if (errorTrans) toast.error("변형 위시리스트 조회 실패");
  }, [errorProfile, errorTrans]);

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
      {loading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <MenuListSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          <div className="pt-2">
            {transWish?.pages.map((item) => {
              const uniqueKey = getUniqueKey(null, item.transformedRecipeId);

              return (
                <div
                  key={item.transformedRecipeId}
                  className="flex items-center border-b border-gray-200"
                >
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
                  <div className="flex-1 min-w-0">
                    <MenuList
                      key={item.transformedRecipeId}
                      type="default"
                      menu={item.transformedRecipeName}
                      isSafe={item.foodSafety}
                      category={item.category}
                      ingredients={item.recipeIngredients}
                      img={item.foodImage}
                      clickable={true}
                      onClick={() =>
                        navigate(
                          `/menu-information/${item.transformedRecipeId}?type=TRANSFORMED`,
                        )
                      }
                      hasBorder={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {profileWish?.pages.map((item) => {
              const uniqueKey = getUniqueKey(item.recipeId, null);

              return (
                <div
                  key={item.recipeId}
                  className="flex items-center border-b border-gray-200"
                >
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
                  <div className="flex-1 min-w-0">
                    <MenuList
                      key={item.recipeId}
                      type="default"
                      menu={item.recipeName}
                      category={item.category}
                      isSafe={item.foodSafety}
                      ingredients={item.recipeIngredients}
                      img={item.foodImage}
                      clickable={true}
                      onClick={() =>
                        navigate(
                          `/menu-information/${item.recipeId}?type=RECIPE`,
                        )
                      }
                      hasBorder={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default MyWishList;
