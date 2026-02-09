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

const FamilyWishList = () => {
  const familyRoomId = useFamilyStore.getState().familyRoomId;
  const {
    data: familyWish,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteFamilyWishList(familyRoomId, 20);
  // isPending, isError 등은 나중에...
  // throttling도 고려해볼 문제..

  const navigate = useNavigate();

  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage;
    }
  }, [inView, isFetching, hasNextPage]);

  // 임시 수정가능 데이터
  const isAuth = false;

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
      {!isAuth && (
        <div className="flex justify-end">
          <EditButton
            onClick={handleButtonClick}
            count={selectedKeys.length}
            isEditMode={editMode}
          />
        </div>
      )}
      <div className="pt-2">
        {familyWish?.pages.map((item) => {
          const recipeId = item.type == "RECIPE" ? item.id : null;
          const transId = item.type == "TRANSFORMED_RECIPE" ? item.id : null;
          const uniqueKey = getUniqueKey(recipeId, transId);

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
                key={uniqueKey}
                type="profile"
                menu={item.title}
                img={item.imageUrl}
                rate={item.avgScore}
                profiles={item.sourceProfile.profiles}
                onClick={() => navigate(`/menu-information/${item.id}`)}
                clickable={true}
                isSelected={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FamilyWishList;
