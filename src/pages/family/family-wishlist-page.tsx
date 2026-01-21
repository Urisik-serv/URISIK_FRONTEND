import HomeHeader from "../../components/header/HomeHeader";

const FamilyWishListPage = () => {
  return (
    <div>
      <HomeHeader />
      <div className="p-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-800">
            우리 가족 위시리스트
          </h1>
          <p className="text-neutral-400 text-sm font-medium leading-6">
            우리 가족이 원하는 음식들을 종합해서 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
};
export default FamilyWishListPage;
