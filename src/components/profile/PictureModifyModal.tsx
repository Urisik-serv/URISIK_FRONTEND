import { useRef, useState } from "react";
import { useProfileStore } from "../../stores/use-profile-store";
import { roleMap, rolePicture } from "../../constants/profile-record";
import { useFamilyStore } from "../../stores/use-family-store";
import { Check } from "../common/icon/Check";
import { usePatchProfilePic } from "../../hooks/mutations/use-patch-profile-pic";
import PublicHeader from "../header/PublicHeader";
import { LoadingSpinner } from "../common/LoadingSpinner";
import toast from "react-hot-toast";

interface PictureModalProps {
  onClick: () => void;
}

export default function fyModal({ onClick }: PictureModalProps) {
  const { setSavedFormData, savedFormData } = useProfileStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const familyRoomid = useFamilyStore.getState().familyRoomId;
  const [isCheck, setIsCheck] = useState("");

  const { mutate: uploadPic, isPending } = usePatchProfilePic(
    familyRoomid as number,
  );

  const DefaultSelect = async () => {
    if (!familyRoomid) return;

    const roleKey = roleMap[savedFormData.role];
    if (!roleKey) {
      toast.error("역할을 먼저 선택해주세요");
      return;
    }

    const imagePath = rolePicture[roleKey];
    console.log("imagePath:", imagePath);

    if (!imagePath) {
      toast.error("기본 이미지 경로가 없습니다");
      return;
    }

    setIsCheck("default");

    const response = await fetch(imagePath);

    const blob = await response.blob();

    const file = new File([blob], "default.png", {
      type: "image/png",
    });

    uploadPic(file, {
      onSuccess: (serverUrl) => {
        setSavedFormData((prev) => ({
          ...prev,
          profilePicUrl: serverUrl,
        }));
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !familyRoomid) return;

    uploadPic(file, {
      onSuccess: (serverUrl) => {
        setSavedFormData((prev) => ({
          ...prev,
          profilePicUrl: serverUrl,
        }));
      },
      onError: () => {
        fileInputRef.current && (fileInputRef.current.value = "");
        cameraInputRef.current && (cameraInputRef.current.value = "");
      },
    });
  };

  if (isPending) {
    return (
      <>
        <PublicHeader title="내 프로필" />
        <div className="flex justify-center py-20">
          <LoadingSpinner text="로딩 중..." />
        </div>
      </>
    );
  }

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
              {isCheck === "file" && <Check fillColor="white" />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
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
              {isCheck === "camera" && <Check fillColor="white" />}
            </button>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              ref={cameraInputRef}
              onChange={handleImageUpload}
            />

            <div className="w-[350px] h-0 border-t border-t-[0.60px] border-white"></div>
            <button
              onClick={DefaultSelect}
              className="cursor-pointer flex justify-between text-start px-5 w-full text-white text-lg font-medium  leading-5"
            >
              <div>캐릭터 프로필 적용</div>
              {isCheck === "default" && <Check fillColor="white" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
