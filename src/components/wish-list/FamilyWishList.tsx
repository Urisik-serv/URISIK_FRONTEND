import { useEffect, useState } from "react";
import EditButton from "../common/EditButton";
import MenuList from "../common/MenuList";
import EmptyBox from "../../assets/icons/check-box-empty.svg";
import CheckedBox from "../../assets/icons/Check_box.svg";
import type {
  FamilyWishListBody,
  FamilyWishListResult,
} from "../../types/wish-list";
import useGetInfiniteFamilyWishList from "../../hooks/queries/use-get-infinite-family-wishlist";
import { useInView } from "react-intersection-observer";
import { useFamilyStore } from "../../stores/use-family-store";

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

  // 1. 선택된 ID를 '문자열'로 관리합니다. (number[] -> string[])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 2. 항목마다 고유한 키를 만들어주는 헬퍼 함수
  const getUniqueKey = (item: FamilyWishListResult) => {
    // recipeId가 있으면(0이나 null이 아니면) recipe 타입, 아니면 transformed 타입
    if (item.recipeId) {
      return `recipe_${item.recipeId}`;
    } else {
      return `transformed_${item.transformedRecipeId}`;
    }
  };

  const toggleSelectItem = (uniqueKey: string) => {
    if (!editMode) return;

    setSelectedKeys((prev) => {
      if (prev.includes(uniqueKey)) {
        return prev.filter((key) => key !== uniqueKey);
      } else {
        return [...prev, uniqueKey];
      }
    });
  };

  const handleDelete = async () => {
    if (selectedKeys.length === 0) return;

    // 3. 문자열 키를 다시 분리해서 API 요청 객체 만들기
    const deletePayload: FamilyWishListBody = {
      recipeId: [],
      transformedRecipeId: [],
    };

    selectedKeys.forEach((key) => {
      const [type, idStr] = key.split("_"); // "recipe_10" -> ["recipe", "10"]
      const id = Number(idStr);

      if (type === "recipe") {
        deletePayload.recipeId.push(id);
      } else {
        deletePayload.transformedRecipeId.push(id);
      }
    });

    console.log("삭제 요청 데이터:", deletePayload);

    try {
      // 여기에 실제 삭제 API 호출
      // await deleteFamilyWishList(familyRoomId, deletePayload);

      // 성공 시 선택 초기화 및 데이터 갱신
      setSelectedKeys([]);
      setEditMode(false);
      // queryClient.invalidateQueries(...) // 쿼리 갱신 필요
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  const handleButtonClick = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      // 편집 모드에서 버튼을 다시 누르면 삭제 로직 실행
      handleDelete();
      setEditMode(false);
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
          const uniqueKey = getUniqueKey(item);
          const isSelected = selectedKeys.includes(uniqueKey);

          return (
            <div className="flex items-center">
              {editMode && (
                <img
                  className="cursor-pointer w-6 h-6 shrink-0"
                  src={`${isSelected ? CheckedBox : EmptyBox}`}
                  alt={`${isSelected ? "선택됨" : "선택되지 않음"}`}
                  onClick={() => {
                    toggleSelectItem(uniqueKey);
                  }}
                />
              )}
              <MenuList
                key={uniqueKey}
                type="profile"
                menu={item.recipeName}
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
