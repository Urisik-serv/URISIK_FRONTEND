import { useState } from "react";
import EditButton from "../common/EditButton";
import MenuList from "../common/MenuList";
import EmptyBox from "../../assets/icons/check-box-empty.svg";
import CheckedBox from "../../assets/icons/Check_box.svg";

interface Item {
  id: number;
  name: string;
}
const FamilyWishList = () => {
  // 임시 데이터
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "바나나 프렌치토스트" },
    { id: 2, name: "바나나 프렌치토스트" },
    { id: 3, name: "바나나 프렌치토스트" },
    { id: 4, name: "바나나 프렌치토스트" },
    { id: 5, name: "바나나 프렌치토스트" },
    { id: 6, name: "바나나 프렌치토스트" },
    { id: 7, name: "바나나 프렌치토스트" },
  ]);

  // 임시 수정가능 데이터
  const isAuth = false;

  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggleSelectItem = (id: number) => {
    if (!editMode) return;

    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleButtonClick = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      if (selectedIds.length > 0) {
        const newItems = items.filter((item) => !selectedIds.includes(item.id));
        setItems(newItems);
      }

      setSelectedIds([]);
      setEditMode(false);
    }
  };

  return (
    <div>
      {isAuth && (
        <div className="flex justify-end pt-4">
          <EditButton
            onClick={handleButtonClick}
            count={selectedIds.length}
            isEditMode={editMode}
          />
        </div>
      )}
      <div className="pt-2">
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div className="flex items-center">
              {editMode && (
                <img
                  className="cursor-pointer w-6 h-6 shrink-0"
                  src={`${isSelected ? CheckedBox : EmptyBox}`}
                  alt={`${isSelected ? "선택됨" : "선택되지 않음"}`}
                  onClick={() => {
                    toggleSelectItem(item.id);
                  }}
                />
              )}
              <MenuList
                key={item.id}
                type="profile"
                menu={item.name}
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
