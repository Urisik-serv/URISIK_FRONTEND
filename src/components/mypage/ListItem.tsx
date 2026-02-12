import { useNavigate, type To } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { useAlarm } from "../../hooks/queries/use-alarm-query";
import { usePatchAlarm } from "../../hooks/queries/use-patch-alarm";
import Chevron from "../common/icon/Chevron";

interface ListItemProps {
  to?: To;
  isOnOff: boolean;
  title: string;
  onClick?: () => void;
  deleteProfile?: () => void;
}

export default function ListItem({
  to,
  isOnOff,
  title,
  deleteProfile,
}: ListItemProps) {
  const { data } = useAlarm();
  const { mutate: updateAlarm } = usePatchAlarm();

  const isOn = data?.alarmPolicy === "ALARM_AGREED";

  const handleToggle = () => {
    updateAlarm({
      alarmPolicy: isOn ? "ALARM_DISAGREED" : "ALARM_AGREED",
    });
  };

  const navigate = useNavigate();
  const handleButton = () => {
    if (deleteProfile) {
      deleteProfile();
      navigate("/login");
      return;
    }

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
            onClick={handleButton}
            className="cursor-pointer text-gray-800 text-center text-[16px] font-semibold leading-[24px]"
          >
            {title}
          </button>
          <div className="cursor-pointer" onClick={handleButton}>
            <Chevron rotate={-90} color="#71717A" />
          </div>
        </div>
      )}
    </div>
  );
}
