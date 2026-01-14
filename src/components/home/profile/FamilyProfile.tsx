import HomeProfileCard from "./HomeProfileCard";

const FamilyProfile = () => {
  return (
    <div className="w-full  px-4 pt-5 pb-3 bg-white rounded-xl outline-1 outline-stone-300 flex flex-col justify-start items-center gap-3  ">
      <p className="self-stretch justify-start text-black text-lg font-medium leading-7">
        우리가족 프로필
      </p>
      <div className="flex self-stretch items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <HomeProfileCard name="내 프로필" />
        <HomeProfileCard name="강아빠" />
        <HomeProfileCard name="강민지" />
      </div>
      <button className="self-stretch px-2.5 py-3 text-white bg-primary-700 rounded-xl justify-center items-center cursor-pointer">
        우리가족 공통 위시리스트
      </button>
    </div>
  );
};

export default FamilyProfile;
