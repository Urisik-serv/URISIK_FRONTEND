import { useState } from "react";
import MyWishList from "../../components/wish-list/MyWishList";
import FamilyWishList from "../../components/wish-list/FamilyWishList";
import PublicHeader from "../../components/header/PublicHeader";

const FamilyWishListPage = () => {
  const [isClicked, setIsClicked] = useState(true);
  const myStyle =
    "h-12 p-2.5 border-b-2 flex justify-center items-center gap-2.5 w-full text-lg font-semibold leading-4 cursor-pointer " +
    (isClicked
      ? "border-primary-700 bg-stone-50 text-primary-700"
      : "border-gray-300 text-gray-300");
  const familyStyle =
    "h-12 p-2.5 border-b-2 flex justify-center items-center gap-2.5 w-full text-lg font-semibold leading-4 cursor-pointer " +
    (isClicked
      ? "border-gray-300 text-gray-300"
      : "border-primary-700 bg-stone-50 text-primary-700");
  return (
    <div>
      <PublicHeader title={"위시리스트"} />
      <div className="p-4">
        <div>
          <div className="flex pb-6">
            <button onClick={() => setIsClicked(false)} className={familyStyle}>
              나의
            </button>
            <button onClick={() => setIsClicked(true)} className={myStyle}>
              가족
            </button>
          </div>

          <div>{isClicked ? <FamilyWishList /> : <MyWishList />}</div>
        </div>
      </div>
    </div>
  );
};
export default FamilyWishListPage;
