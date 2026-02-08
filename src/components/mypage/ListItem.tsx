import { useNavigate, type To } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { useEffect, useState } from "react";
import chevronRight from "../../assets/icons/chevron-right-gray.svg";
import { useQuery } from "@tanstack/react-query";
import { getAlarm, patchAlarm } from "../../api/member";

interface ListItemProps {
  to?: To;
  isOnOff: boolean;
  title: string;
}

export default function ListItem({ to, isOnOff, title }: ListItemProps) {
  const { data } = useQuery({
    queryKey: ["alarmPolicy"],
    queryFn: getAlarm,
  });

  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (data) {
      setIsOn(data.alarmPolicy === "ALARM_AGREED");
    }
  }, [data]);

  const handleToggle = async () => {
    const next = !isOn;
    setIsOn(next);

    await patchAlarm({
      alarmPolicy: next ? "ALARM_AGREED" : "ALARM_DISAGREED",
    });
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (to) {
      navigate(to);
    }
  };
  return (
    <div>
      {isOnOff ? (
        <div className="w-full h-[42px] px-[20px] py-[16px] rounded-xl flex justify-between items-center bg-gray-100">
          <div className="text-gray-800 text-center text-[16px] font-semibold leading-[24px]">
            {title}
          </div>
          <ToggleButton isOn={isOn} onClick={handleToggle} />
        </div>
      ) : (
        <div className="w-full h-[42px] px-[20px] py-[16px] rounded-xl flex justify-start items-center bg-gray-100 gap-[4px]">
          <button
            onClick={handleNavigate}
            className="cursor-pointer text-gray-800 text-center text-[16px] font-semibold leading-[24px]"
          >
            {title}
          </button>
          <div className="cursor-pointer" onClick={handleNavigate}>
            <img
              className="size-[24px]"
              src={chevronRight}
              alt={`${title} 바로 가기기`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
