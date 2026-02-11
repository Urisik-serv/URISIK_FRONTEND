import { useRef, useState } from "react";
import { useProfileStore } from "../../stores/use-profile-store";
import { roleMap, rolePicture } from "../../constants/profile-record";
import { patchProfilePic } from "../../api/family-profile";
import { useFamilyStore } from "../../stores/use-family-store";
import { Check } from "../common/icon/Check";

interface PictureModalProps {
  onClick: () => void;
}

export default function PictureModifyModal({ onClick }: PictureModalProps) {
  const { setSavedFormData, savedFormData } = useProfileStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const familyRoomid = useFamilyStore.getState().familyRoomId;
  const [isCheck, setIsCheck] = useState("");

  const DefaultSelect = () => {
    setIsCheck("default");
    setSavedFormData((prev) => ({
      ...prev,
      profilePicUrl: rolePicture[roleMap[savedFormData.role]],
    }));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (familyRoomid === null) {
      return;
    }
    const serverUrl = await patchProfilePic(familyRoomid, file);

    setSavedFormData((prev) => ({
      ...prev,
      profilePicUrl: serverUrl,
    }));
  };

  const handleTakePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (familyRoomid === null) {
      return;
    }
    const serverUrl = await patchProfilePic(familyRoomid, file);

    setSavedFormData((prev) => ({
      ...prev,
      profilePicUrl: serverUrl,
    }));
  };

  return (
    <>
      <div
        onClick={onClick}
        className="fixed inset-0 z-50 bg-black/30 flex flex-col items-center justify-end"
      >
        <div className="pb-[26px] w-[353px] flex flex-col items-center gap-[8px]">
          <div className="self-stretch h-40 py-4 bg-[#FF885A] rounded-[10px] outline-none inline-flex flex-col justify-start items-center gap-4">
            <button
              onClick={() => {
                setIsCheck("file");
                fileInputRef.current?.click();
              }}
              className="cursor-pointer flex justify-between text-start px-5 w-full  text-white text-lg font-medium  leading-5"
            >
              <div>앨범에서 사진 선택</div>
              {isCheck === "file" && <Check />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileSelect}
            />
            <div className="w-[350px] h-0 border-t border-t-[0.60px] border-white"></div>
            <button
              onClick={() => {
                setIsCheck("camera");
                cameraInputRef.current?.click();
              }}
              className="cursor-pointer flex justify-between text-start px-5 w-full text-white text-lg font-medium  leading-5"
            >
              <div>사진 촬영</div>
              {isCheck === "camera" && <Check />}
            </button>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              ref={cameraInputRef}
              onChange={handleTakePhoto}
            />

            <div className="w-[350px] h-0 border-t border-t-[0.60px] border-white"></div>
            <button
              onClick={DefaultSelect}
              className="cursor-pointer flex justify-between text-start px-5 w-full text-white text-lg font-medium  leading-5"
            >
              <div>캐릭터 프로필 적용</div>
              {isCheck === "default" && <Check />}{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
