import Button from "../../components/common/Button";
import PublicHeader from "../../components/header/PublicHeader";
import TermsAgreementRow from "../../components/terms/TermsAgreementRow";
import CheckBoxEmpty from "../../assets/icons/Check_box_empty.svg";

export default function TermsAgreementPage() {
  return (
    <>
      <PublicHeader title={"약관 및 정책"} />
      <div className="flex flex-col pl-[17px]">
        <div className="w-64 justify-start text-zinc-800 text-2xl font-semibold font-['Wanted_Sans'] leading-9 pt-[24px]">
          서비스 이용을 위해
          <br />
          이용약관 동의가 필요해요
        </div>
        <div className="pt-[56px]">
          <div className="self-stretch px-4 py-3 rounded-lg border border-[1.5px] border-zinc-400 inline-flex justify-start items-center gap-24 ">
            <div className="justify-start text-zinc-800 text-xl font-semibold font-['Wanted_Sans'] tracking-tight">
              모든 약관에 동의합니다.
            </div>
            <div
              data-property-1="Default"
              className="w-6 h-6 relative overflow-hidden"
            >
              <img src={CheckBoxEmpty} alt="빈 체크박스" />
            </div>
          </div>
        </div>
        <div className="pt-[40px] flex flex-col items-center pr-[16px]">
          <TermsAgreementRow />
          <TermsAgreementRow />
          <TermsAgreementRow />
          <TermsAgreementRow />
          <TermsAgreementRow />
        </div>
        <div className="pt-[159px]">
          <Button text={`다음`} type="button" />
        </div>
      </div>
    </>
  );
}
