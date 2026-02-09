import {
  AnimatePresence,
  type PanInfo,
  motion,
  useAnimation,
} from "framer-motion";
import {
  useProfileModalActions,
  useProfileModalInfo,
} from "../../../hooks/use-profile-modal-store";
import { useEffect, useState } from "react";
//import AllergyDataBox from "../../profile/AllergyDataBox";
//import ElementButton from "../../common/ElementButton";
//import EntityItem from "../../common/EntityItem";
//import SmallButton from "../../common/SmallCommonButton";
//import profilePicture from "../../../assets/profile/daughter-profile.svg";
//import alertImage from "../../../assets/images/alert-circle.png";
//import { useNavigate } from "react-router-dom";

const ProfileModal = () => {
  const { isClose } = useProfileModalActions();
  const { open } = useProfileModalInfo(); // selectedData 필요

  //const navigate = useNavigate();

  const controls = useAnimation();
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (open) {
      controls.start("half");
      setIsExpanded(false);
    } else {
      controls.start("hidden");
    }
  }, [open, controls]);

  const onDragEnd = async (_: any, info: PanInfo) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (offset > 250 || velocity > 500) {
      isClose();
    } else if (offset < -100 || (velocity < -500 && !isExpanded)) {
      await controls.start("full");
      setIsExpanded(true);
    } else if (offset > 200 && isExpanded) {
      await controls.start("half");
      setIsExpanded(false);
    } else {
      controls.start(isExpanded ? "full" : "half");
    }
  };

  const variants = {
    hidden: { y: "100%" },
    half: { y: "60%" },
    full: { y: "0%" },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={isClose}
        className="fixed inset-0 z-52"
      />
      <motion.div
        initial="hidden"
        animate={controls}
        exit="hidden"
        variants={variants}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
        className="fixed z-52 left-0 right-0 mx-auto bottom-0 w-[375px] bg-white rounded-t-[20px] max-h-[93dvh] h-full overflow-hidden shadow-[0px_-3px_12px_0px_rgba(0,0,0,0.12)]"
      >
        <div
          className="flex justify-center pt-5 pb-2 cursor-grab active:cursor-grabbing"
          onClick={() => {
            setIsExpanded(!isExpanded);
            controls.start(isExpanded ? "half" : "full");
          }}
        >
          <div className="h-1.5 w-24 rounded-[3px] bg-gray-300" />
        </div>

        <div className="px-4 pb-10 overflow-y-auto overscroll-contain h-full [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {/*<div className="pt-15.5 w-full mx-auto flex flex-col pb-10">
            <div className="flex justify-between  w-full">
              <div className="flex gap-3 items-end">
                <img src={profilePicture} alt="내 프로필 사진" />
                <div className="text-2xl font-semibold leading-9">
                  {selectedData?.nickname}
                </div>
              </div>
            </div>
            <div className="pt-6">
              {(selectedData?.allergies?.length || 0) > 0 ? (
                selectedData?.allergies.map((allergy) => (
                  <div className=" pb-5">
                    <div className="text-[16px] font-semibold leading-6">
                      알레르기
                    </div>
                    <AllergyDataBox
                      name={allergy.name}
                      alternative={allergy.alternativeIngredients}
                    />
                  </div>
                ))
              ) : (
                <div className="pb-5 ">
                  <div className="text-[16px] font-semibold leading-6">
                    알레르기
                  </div>
                  <div className="flex pt-2">
                    <ElementButton name="없음" />
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="text-[16px] font-semibold leading-[24px]">
                선호 음식
              </div>
              <div className="flex gap-2 pt-2">
                {selectedData?.preferences.likedFood.map((food) => (
                  <ElementButton name={food} />
                ))}
              </div>
            </div>
            <div className="pt-[42px]">
              <div className="text-[16px] font-semibold leading-[24px]">
                내 위시리스트
              </div>
              {selectedData?.wishList ? (
                <div className="pt-[17px] flex flex-col gap-0">
                  {selectedData?.wishList.map((item) => (
                    <EntityItem
                      picture={item.FoodImageUrl}
                      name={item.name}
                      category={item.category}
                      tags={item.tags.join(", ")}
                      key={item.id}
                      border="border-b-1 border-b-gray-200"
                    />
                  ))}
                </div>
              ) : (
                <div className="pt-[48px] flex flex-col items-center gap-[11px]">
                  <img
                    src={alertImage}
                    alt="알림 아이콘"
                    className="size-[76px]"
                  />
                  <div className="text-center text-[16px] leading-[24px] text-[#4D4D4D]">
                    추가된 위시리스트가 없어요
                  </div>
                  <div className="pt-[24px]">
                    <SmallButton
                      text={"위시리스트 담기"}
                      type="button"
                      onClick={() => navigate("../")}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>*/}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
