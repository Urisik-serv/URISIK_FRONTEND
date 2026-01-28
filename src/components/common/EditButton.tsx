import Pencil from "../../assets/icons/pencil.svg";

interface EditButtonProps {
  isEditMode: boolean;
  onClick: () => void;
  count: number;
}

const EditButton = ({ isEditMode, onClick, count }: EditButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-lg inline-flex justify-center items-center cursor-pointer ${isEditMode ? "bg-primary-700 text-white" : "bg-zinc-100"}`}
    >
      {isEditMode ? (
        count > 0 ? (
          `${count}개 삭제`
        ) : (
          "취소"
        )
      ) : (
        <div className="flex justify-start items-center gap-1 text-black text-base font-medium">
          <img src={Pencil} alt="연필모양 아이콘" className="w-4 h-4" />
          <p>수정</p>
        </div>
      )}
    </button>
  );
};

export default EditButton;
