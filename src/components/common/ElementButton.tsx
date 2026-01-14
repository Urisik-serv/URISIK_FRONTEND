import CloseIcon from "../../assets/icons/x-icon.svg";

interface ElementButtonProps {
  onClose?: () => void;
  onClick?: () => void;
  name: string;
}

const ElementButton = ({ onClick, onClose, name }: ElementButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-1 bg-zinc-100 rounded flex justify-center items-center gap-1 ${
        onClose && "pr-2"
      }`}
    >
      <p className="text-center justify-start text-black text-sm font-medium">
        {name}
      </p>
      {onClose && (
        <img
          src={CloseIcon}
          alt="삭제하기 버튼"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-4 h-4"
        />
      )}
    </div>
  );
};

export default ElementButton;
