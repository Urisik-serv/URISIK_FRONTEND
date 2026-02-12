import { useEffect, useState } from "react";
import EditButton from "../common/EditButton";
import MenuList from "../common/MenuList";
import EmptyBox from "../../assets/icons/check-box-empty.svg";
import CheckedBox from "../../assets/icons/Check_box.svg";
import useGetInfiniteFamilyWishList from "../../hooks/queries/use-get-infinite-family-wishlist";
import { useInView } from "react-intersection-observer";
import { useFamilyStore } from "../../stores/use-family-store";
import { useRecipeSelection } from "../../hooks/use-recipe-selection";
import useDeleteFamilyWishLists from "../../hooks/mutations/use-delete-family-wishlists";
import { useNavigate } from "react-router-dom";
import type { FamilyWishListResult } from "../../types/wish-list";
import { useFamilyData } from "../../hooks/use-family-data";
import toast from "react-hot-toast";
import MenuListSkeleton from "../skeltons/MenuListSkeleton";

const FamilyWishList = () => {
  const familyRoomId = useFamilyStore.getState().familyRoomId;
  const {
    data: familyWish,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetInfiniteFamilyWishList(familyRoomId, 6);

  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
    if (isError) toast.error("가족 위시리스트 조회 실패");
  }, [inView, isFetching, hasNextPage, fetchNextPage, isError]);

  // 방장 권한 확인
  const { isLeader } = useFamilyData();

  const [editMode, setEditMode] = useState(false);

  // 커스텀 훅
  const {
    getUniqueKey,
    toggleSelection,
    selectedKeys,
    resetSelection,
    selectedFamilyPayload,
    isSelected,
  } = useRecipeSelection();

  const { mutate: deleteWishlists } = useDeleteFamilyWishLists(familyRoomId);

  const handleDelete = async () => {
    if (selectedKeys.length === 0) return;

    console.log("삭제 요청 데이터:", selectedFamilyPayload);

    deleteWishlists(selectedFamilyPayload);
    resetSelection();
    setEditMode(false);
  };

  const handleButtonClick = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      // 편집 모드에서 버튼을 다시 누르면 삭제 로직 실행
      handleDelete();
      if (editMode) setEditMode(false);
    }
  };

  const handleClick = (item: FamilyWishListResult) => {
    if (item.type === "RECIPE") {
      navigate(`/menu-information/${item.id}?type=RECIPE`);
    } else if (item.type === "TRANSFORMED_RECIPE") {
      navigate(`/menu-information/${item.id}?type=TRANSFORMED`);
    }
  };

  return (
    <div>
      <div className="pb-4">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-800">
          우리 가족 위시리스트
        </h1>
        <p className="text-neutral-400 text-sm font-medium leading-6">
          우리 가족이 원하는 음식들을 종합해서 확인하세요.
        </p>
      </div>
      {isLeader && (
        <div className="flex justify-end">
          <EditButton
            onClick={handleButtonClick}
            count={selectedKeys.length}
            isEditMode={editMode}
          />
        </div>
      )}
      <div className="pt-2">
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <MenuListSkeleton key={index} />
            ))}
          </>
        ) : (
          familyWish?.pages.map((item) => {
            const recipeId = item.type == "RECIPE" ? item.id : null;
            const transId = item.type == "TRANSFORMED_RECIPE" ? item.id : null;
            const uniqueKey = getUniqueKey(recipeId, transId);

            return (
              <div
                key={uniqueKey}
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
                    type="profile"
                    key={item.id}
                    menu={item.title}
                    img={item.imageUrl}
                    rate={item.avgScore}
                    isSafe={item.allergyStatus}
                    category={item.category.label}
                    ingredients={item.ingredientsRaw}
                    profiles={item.sourceProfile.profiles}
                    onClick={() => handleClick(item)}
                    clickable={true}
                    hasBorder={false}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};
export default FamilyWishList;
