import BackButton from "../common/BackButton";

interface PublicHeaderProps {
  title: string | null;
}

const PublicHeader = ({ title }: PublicHeaderProps) => {
  return (
    <div className="w-full px-4 py-2.5 flex justify-between items-center">
      <BackButton />
      <div className="">
        <p className="justify-start text-black text-xl font-semibold font-['Pretendard'] tracking-tight">
          {title}
        </p>
      </div>
      <div className="w-6 h-6"></div> {/*공용 BackButton과 동일한 사이즈 공백*/}
    </div>
  );
};

export default PublicHeader;
