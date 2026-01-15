import PageIndicator from "../../common/PageIndicator";
import AllergyCard from "./AllergyCard";

const AllergyCuration = () => {
  return (
    <div>
      <div className="pb-4">
        <h2 className="pt-[31px] text-zinc-800 text-xl font-semibold tracking-tight">
          같은 알레르기 가족에게 인기 메뉴
        </h2>
        <p className="text-neutral-400 text-sm font-medium leading-6">
          같은 알레르기를 소유한 가족원들 사이에서 인기가 많아요.
        </p>
      </div>
      <AllergyCard />
      <div className="flex justify-center pt-2">
        <PageIndicator page={1} total={3} />
      </div>
    </div>
  );
};

export default AllergyCuration;
