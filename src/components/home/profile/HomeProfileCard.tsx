import DefaultMomImg from "../../../assets/profile/default-mom.svg";
interface HomeProfileCardProps {
  name: string;
  onClick?: () => void;
  // myProfile: boolean;
}

const HomeProfileCard = ({ name, onClick }: HomeProfileCardProps) => {
  const myProfile = name === "내 프로필";
  return (
    <div className="shrink-0">
      <img
        src={DefaultMomImg}
        alt="프로필 이미지"
        onClick={onClick}
        className={`w-14 h-14 rounded-full cursor-pointer ${
          myProfile ? "border-[3px] border-primary-700" : ""
        }`}
      />
      <p className="text-center text-neutral-500 text-sm font-normal leading-5">
        {name}
      </p>
    </div>
  );
};
export default HomeProfileCard;
