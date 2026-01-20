import { ALLERGY_ICON } from "../../constants/allergy-data";
import ProfileDataBox from "./ProfileDataBox";

interface allergyDataProps {
  name: string;
  alternative: string[];
}

export default function AllergyDataBox({
  name,
  alternative,
}: allergyDataProps) {
  const icon = ALLERGY_ICON.find((item) => item.name == name)?.icon;
  return (
    <div>
      <div className="pt-[8px] px-[7px] w-[62px] flex flex-col items-center gap-[6px]">
        <img src={icon} alt={`${name} 아이콘`} />
        <div className="bg-primary-700 rounded-sm w-[48px] flex justify-center items-center">
          <div className="text-white text-sm leading-[22.26px] font-medium">
            {name}
          </div>
        </div>
      </div>
      <div className="pt-[12px]">
        <div className="text-sm text-gray-400 leading-[22.26px]">
          대체식재료
        </div>
        <div className="pt-[4px] flex gap-[8px] flex-wrap">
          {alternative.map((item) => (
            <ProfileDataBox name={item} className="px-[12px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
